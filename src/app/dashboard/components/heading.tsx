'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '@/utils/auth';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import LogoutIcon from '@mui/icons-material/Logout';
import { fetchData } from '@/utils/auth';
import CircularProgress from '@mui/material/CircularProgress';


interface HeadingProps {
  isSignUp: boolean;
}

const Heading = ({ isSignUp }: HeadingProps) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const accessToken = getAccessToken();
        if (!accessToken) {
          router.push('/auth/login');
          setIsLoading(false)
          return;
        }

        const data = await fetchData({path:'auth/user-info',method:'GET',body:undefined})
        setUsername(data.username);
      } catch (err) {
        (window as { toast?: { error: (message: string, error?: unknown) => void } }).toast?.error('Failed to get user info', err);
      }
      setIsLoading(false)
    };
    setIsLoading(true)
    fetchUsername();
  }, [router])
  
  const hLogout = async () => {
    setIsProcessing(true);
    try {
      await fetchData({path:'auth/logout',method:'DELETE',body:{}})
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      (window as { toast?: { success: (message: string) => void } }).toast?.success('Logged out');
      setIsProcessing(false);
      router.push('/auth/login');
    } catch (err) {
      setIsProcessing(false);
      if (err instanceof Error && 'status' in err && (err as { status: number }).status === 401) {
        router.push('/auth/login');
      }
      (window as { toast?: { error: (message: string) => void } }).toast?.error('Error:'+ err);
    }
  };

  if(isLoading) return <CircularProgress/>

  return (
    <Paper elevation={0} style={{background:'white', height:'80px',width:'100%',display:'flex',padding:'16px',borderRadius:'8px',justifyContent:'space-between',alignItems:'center'}}>
        <Grid container justifyContent="space-between" alignItems="center" >
    <Grid item>
      <Typography variant="body1" sx={{  color:'black'}}>
        Welcome {!isSignUp?'back':''}
      </Typography>
      <Typography variant="body2" sx={{ color: 'gray' }}>
        {username || '[username]'}
      </Typography>
    </Grid>
    <Grid item>
    <Button
      variant="outlined"
      disabled={isProcessing}
      loading={isProcessing}
      color="primary"
      startIcon={<LogoutIcon />}
      onClick={hLogout}
      sx={{
        borderRadius: "12px", 
        textTransform: "none",
        paddingX: 2,
        paddingY: 1,
        fontWeight: 500,
        borderColor: "#7060FF",
        height:'36px',
        weight:'110px',
        color: "#7060FF", 
        "&:hover": {
          borderColor: "#5b21b6",
          backgroundColor: "rgba(124, 58, 237, 0.05)",
        },
      }}
    >
      Logout
    </Button>
    </Grid>
  </Grid>
    </Paper>
);
};

export default Heading;
