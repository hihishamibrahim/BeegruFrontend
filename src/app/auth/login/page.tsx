'use client'
import { styled } from '@mui/material/styles';
import React,{useState} from 'react';
import { useRouter } from 'next/navigation';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
const PREFIX = 'NotApproved';

const classes = {
  root: `${PREFIX}-root`,
};

const StyledCard = styled(Card)(() => ({
  [`&.${classes.root}`]: {
    width: '90%',
    maxWidth: '550px',
    height: 'auto',
    minHeight: '328px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '16px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 4px 18px 0px rgba(0, 0, 0, 0.05)',
  },
}));

export default function Home() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const router = useRouter();
  
     const handleSubmit = async (event: React.FormEvent) => {
       event.preventDefault();
       setIsProcessing(true);
       
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_URL+'auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          (window as { toast?: { success: (message: string) => void } }).toast?.success('Logged in');
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          setIsProcessing(false)
          router.replace(`/dashboard?isSignUp=${data.isSignUp}`);
        } else {
          (window as { toast?: { error: (message: string) => void } }).toast?.error('Failed to Loggin '+data.message);
        }
        setIsProcessing(false)
      } catch (err) {
        const errorMessage = (err as { reason?: string })?.reason || 'An unknown error occurred';
        (window as { toast?: { error: (message: string) => void } }).toast?.error('Error: ' + errorMessage);
        setIsProcessing(false)
      }
    };  

  return (
    <StyledCard className={classes.root}>
      <Grid
        container
        direction="row"
        spacing={1}
        style={{
          width: '100%',
          height: 'auto',
          gap: '4px',
        }}
      >
        <Grid item xs={12}>
          <Typography 
            variant="h6" 
            component="h1" 
          >
            Log in / Sign up
          </Typography>
        </Grid>
        <Grid item xs={12} style={{
            width: '194px',
            height: '24px'
        }}>
          <Typography variant="body1" style={{ color: '#00000099' }}>
            Enter your details below
          </Typography>
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e)=>setUsername(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          onChange={(e)=>setPassword(e.target.value)}
          margin="normal"
          required
        />
        <Button
          variant="contained"
          fullWidth
          disabled={isProcessing}
          type="submit"
          style={{ backgroundColor: '#7060FF', marginTop: '16px', borderRadius: '8px', textTransform: 'none', fontWeight: 500 }}
        >
          Login / Sign up
        </Button>
      </form>
    </StyledCard>
  );
}