import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import Icon from '@mui/material/Icon';

function Price({setPrice,price, onClose}) {
  const [minPrice, setMinPrice] = useState(price.min||0);
  const [maxPrice, setMaxPrice] = useState(price.max||0);
  const [sliderValue, setSliderValue] = useState([0, 100]);

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);
  };

  const handleMinPriceChange = (e) => {
    const value = Number(e.target.value);
    setMinPrice(value);
    setSliderValue([value, sliderValue[1]]);
  };

  const handleMaxPriceChange = (e) => {
    const value = Number(e.target.value);
    setMaxPrice(value);
    setSliderValue([sliderValue[0], value]);
  };

  const handleSubmit = () => {
    console.log('Min Price:', minPrice, 'Max Price:', maxPrice);
    setPrice({min:minPrice,max:maxPrice})
    onClose();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: 3,
        borderRadius: '16px',
        boxShadow: 3,
        backgroundColor: 'white',
        width: '300px',
        margin: '0 auto',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Icon component={PaymentsOutlinedIcon} color='primary'/>
        <Typography variant="h6" >
          Price
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="Min price"
          type="number"
          value={minPrice}
          onChange={handleMinPriceChange}
          fullWidth
          size="small"
        />
        <TextField
          label="Max price"
          type="number"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          fullWidth
          size="small"
        />
      </Box>
      <Slider
        value={sliderValue}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        min={0}
        max={100}
        sx={{ color: '#7b5cf9' }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: '#7b5cf9',
            color: 'white',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': { backgroundColor: '#6848e0' },
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default Price;