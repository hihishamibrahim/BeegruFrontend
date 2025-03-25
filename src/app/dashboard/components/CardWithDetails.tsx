import React, { useState } from 'react';
import { Card, Box, Typography, Chip, IconButton, Grid, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import Dialog from '@mui/material/Dialog';
import AddOrEditProperty from './AddOrEditProperty';

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
    <Grid item md={3} xs={12}>
      <Card
        raised={false}
        sx={{
          width: '100%',
          height: 116,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRadius: '12px',
          padding: '12px',
          border: '1px solid #e0e0e0',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          background: 'white',
          overflowX: 'auto'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black' }}>
              ₹ {price}
            </Typography>
          </Box>
          <Box>
            <Chip label={tag} sx={{ backgroundColor: tag === 'Sale' ? '#B7EFC5' : '#ffe0cc', color: tag === 'Sale' ? '#1E4620' : '#ff5722', fontWeight: 'bold' }} />
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
                  color: '#7b5cf9',
                  fontWeight: 600,
                  backgroundColor: '#f3f0ff',
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
                  color: 'red',
                  fontWeight: 600,
                  borderRadius: 1,
                }}
              >
                Delete
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '14px', color: 'black' }}>
            {title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
            <HomeIcon sx={{ fontSize: 16, color: '#ff9800' }} />
            <Typography variant="body2" sx={{ color: 'black', fontSize: '12px' }}>
              {subtitle}
            </Typography>
          </Box>
        </Box>
      </Card>
       <Dialog open={openDialog} onClose={()=>setOpenDialog(false)}>
            <AddOrEditProperty data={{price: price, type:tag, name:title, propertyType:subtitle}} id={id} onClose={()=>setOpenDialog(false)}/>
        </Dialog>
    </Grid>
  );
};

export default CardWithDetails;