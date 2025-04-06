import React, { useState } from 'react';
import { Paper, Box, Typography, Chip, IconButton, Grid, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import Dialog from '@mui/material/Dialog';
import AddOrEditProperty from './AddOrEditProperty';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

interface CardWithDetailsProps {
  price: number;
  tag: string;
  title: string;
  subtitle: string;
  id: string;
  onDelete?: () => void;
}

const CardWithDetails: React.FC<CardWithDetailsProps> = ({id, price, tag, title, subtitle, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid item style={{gap:'16px'}}>
      <Paper
        elevation={2}
        variant='outlined'
        sx={{
          height: '8.7rem',
          width: { xs: "348px", md: "20.16rem" },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRadius: '12px',
          padding: '12px',
          border: '1px solid #e0e0e0',
          background: 'white',
          overflowX: 'auto'
        }}
      >
        <Grid container alignContent={'space-between'} sx={{ height: '100%' }}>
        <Grid item container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <Typography variant="h6" sx={{ color: 'black',fontSize: '1.2rem', fontWeight: 400, lineHeight:'150%', lineSpacing:'0.15px'}}>
              <CurrencyRupeeIcon sx={{ fontSize: 20,marginBottom:'-0.2rem' }}/> {new Intl.NumberFormat('en-IN').format(price)}
            </Typography>
          </Box>
          <Box>
            <Chip  style={{color:tag==='rent'?'#000000B2':'#1E4620', backgroundColor:tag==='rent'?'#FFC6AC':'#B7EFC5'}} label={tag==='rent'?'Rent':'Sale'} sx={{ marginRight:'0.8rem',backgroundColor: tag === 'Sale' ? '#B7EFC5' : '#ffe0cc', width:'4.2rem',height:'1.8rem', fontSize:'0.92rem',borderRadius:'7.06px', color: tag === 'Sale' ? '#1E4620' : '#ff5722'}} />
            <IconButton size="small" onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  boxShadow: 3,
                  borderRadius: 2,
                  padding: 1,
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  setOpenDialog(true);
                }}
                sx={{
                  color: '#3D28FF',
                  fontWeight: 400,
                  backgroundColor: '#7060FF29',
                  borderRadius: 1,
                  marginBottom: 1,
                }}
              >
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  if (onDelete) {
                    onDelete();
                  }
                }}
                sx={{
                  color: '#F44336',
                  fontWeight: 400,
                  borderRadius: 1,
                }}
              >
                Delete
              </MenuItem>
            </Menu>
          </Box>
        </Grid>
        <Grid item>
          <Typography variant="body1" sx={{ fontSize: '1.2rem', ontWeight: 400, color: '#212121' }}>
            {'Zahara by Bren Corporation'}
          </Typography>
        </Grid>
          <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
            <MapsHomeWorkOutlinedIcon sx={{ fontSize: 20, color: '#B05911' }} />
            <Typography variant="body2" sx={{ fontSize: '1rem', fontWeight: 400, color:'#212121' }}>
              {subtitle}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
       <Dialog open={openDialog} onClose={()=>setOpenDialog(false)}>
            <AddOrEditProperty data={{price: price, type:tag, name:title, propertyType:subtitle}} id={id} onClose={()=>setOpenDialog(false)}/>
        </Dialog>
    </Grid>
  );
};

export default CardWithDetails;