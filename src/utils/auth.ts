import {jwtDecode} from 'jwt-decode';

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
}

export const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const clearTokens = async () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  await fetchData({path:'auth/logout',method:'DELETE',body:{}})
  return {Message: 'Logged out'}
};

export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  try {
    if (!refreshToken) throw new Error('No refresh token available');

    const response = await fetch(process.env.NEXT_PUBLIC_URL + 'auth/refresh-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    setTokens(data.accessToken, data.refreshToken);
    return data.accessToken;
  } catch (error) {
    clearTokens();
    throw error;
  }
};

export const fetchData = async ({path, method, body}: { path: string; method: 'GET' | 'POST' | 'PUT' | 'DELETE'; body?: Record<string, unknown> }) => {
  let accessToken = getAccessToken();
  if (method === 'GET' && body) {
    const queryParams = new URLSearchParams(
      Object.entries(body || {}).reduce((acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      }, {} as Record<string, string>)
    ).toString();
    path += `?${queryParams}`;
  }
  try {
    if(accessToken && (jwtDecode(accessToken)?.exp ?? 0) < Date.now() / 1000){
      console.log('refreshing token',path)
      accessToken = await refreshAccessToken();
    } ;

    if (!accessToken) {
      throw new Error('No Acess token available');
    }

    const response = await fetch(process.env.NEXT_PUBLIC_URL + path, {
      method: method,
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
       },
      ...method==='POST'? {body: JSON.stringify(body)} : {}
    });
    if (!response.ok) {
      console.log(response.status)
      if(response.status===401)clearTokens();
      throw new Error(`Failed to get data. Path: ${path}, Response: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
