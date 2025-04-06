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
        //checks for auth token and decides if user is logged in or not
        const accessToken = getAccessToken();
        if (!accessToken) {
          router.push('/auth/login');
          setIsLoading(false)
          return;
        }
        //checks if auth token is valid and gets the user info
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
  
  //logout function clears the localstorage data and redirects to login page
  //and also calls the logout api which clears the refresh token from the server
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
    <Paper elevation={0} style={{background:'white', height:'6rem',width:'100%',display:'flex',padding:'16px',borderRadius:'8px',justifyContent:'space-between',alignItems:'center'}}>
      <Grid container justifyContent="space-between" alignItems="center" >
        <Grid item style={{width:'9.15rem',height:'3.6rem',gap:'0.3rem', alignContent:'space-evenly'}}>
          <Typography variant="body1" sx={{  color:'black', height:'1.8rem', fontSize:'1.2rem'}}>
            Welcome {!isSignUp?'back':''}
          </Typography>
          <Typography variant="body2" sx={{ color: 'gray',fontSize:'1.05rem' }}>
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
              border:'1px solid #7060FF7A',
              borderRadius: "12px", 
              textTransform: "none",
              paddingX: 2,
              paddingY: 1,
              fontWeight: 500,
              borderColor: "#7060FF",
              height:'2.7rem',
              weight:'8.25rem',
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
