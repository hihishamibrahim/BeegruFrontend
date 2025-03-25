'use client'
import { create } from 'zustand';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

interface AlertState {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  show: boolean;
  duration?: number;
}

interface AlertStore {
  alert: AlertState;
  showAlert: (message: string, type?: AlertState['type'], duration?: number) => void;
  hideAlert: () => void;
}

export const useAlertStore = create<AlertStore>((set) => ({
  alert: {
    message: '',
    type: 'info',
    show: false,
    duration: 5000
  },
  showAlert: (message, type = 'info', duration = 5000) => {
    set({ 
      alert: { 
        message, 
        type, 
        show: true, 
        duration 
      } 
    });

    setTimeout(() => {
      set(state => ({ 
        alert: { 
          ...state.alert, 
          show: false 
        } 
      }));
    }, duration);
  },
  hideAlert: () => {
    set({ 
      alert: { 
        message: '', 
        type: 'info', 
        show: false 
      } 
    });
  }
}));

export const globalAlert = {
  success: (message: string, duration = 5000) => {
    console.log('sucess')
    useAlertStore.getState().showAlert(message, 'success', duration);
  },
  error: (message: string, duration = 5000) => {
    console.log('hehh')
    useAlertStore.getState().showAlert(message, 'error', duration);
  },
  warning: (message: string, duration = 5000) => {
    useAlertStore.getState().showAlert(message, 'warning', duration);
  },
  info: (message: string, duration = 5000) => {
    useAlertStore.getState().showAlert(message, 'info', duration);
  }
};

export const GlobalAlert = () => {
  const { alert, hideAlert } = useAlertStore();

  if (!alert?.show) return null;
console.log(alert)
  return (
    <Collapse in={alert.show} >
        <Alert
        severity={alert.type}
        style={{width:'fit-content',zIndex:9999,position:'fixed',bottom:'1rem',left:'1rem'}}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={hideAlert}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {alert.message}
        </Alert>
      </Collapse>

  );
};

if (typeof window !== 'undefined') {
  ((window as unknown) as { toast: Record<'success' | 'error' | 'warning' | 'info', (message: string, duration?: number) => void> }).toast = {
    success: (message: string, duration = 5000) => {
      useAlertStore.getState().showAlert(message, 'success', duration);
    },
    error: (message: string, duration = 5000) => {
      useAlertStore.getState().showAlert(message, 'error', duration);
    },
    warning: (message: string, duration = 5000) => {
      useAlertStore.getState().showAlert(message, 'warning', duration);
    },
    info: (message: string, duration = 5000) => {
      useAlertStore.getState().showAlert(message, 'info', duration);
    }
  };
}