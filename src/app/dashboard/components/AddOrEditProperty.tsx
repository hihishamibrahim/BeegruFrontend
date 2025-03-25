import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Select from '@/component/Select';
import { fetchData } from '@/utils/auth';

const transactionTypeOptions = [
  { value: 'rent', label: 'Rent' },
  { value: 'sale', label: 'Sale' },
]

const propertyTypeOptions = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'land', label: 'Land' },
]

function AddOrEditProperty({ data, id, onClose }: { data: {name: string; type: string; propertyType: string; price: number}|undefined; id: string|undefined; onClose: () => void }) {
  const [error, setError] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    propertyType: '',
    price: 0,
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || '',
        type: data.type || '',
        propertyType: data.propertyType || '',
        price: data.price || 0,
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'price') {
      if (Number(value) < 100 || Number(value) > 100000) setError(true);
      else setError(false);
    }
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const path = data ? `property/edit/${id}` : 'property/add';
      const method: 'PUT' | 'POST' = data ? 'PUT' : 'POST';
      await fetchData({ path, method, body: formData });
      alert(data ? 'Property updated successfully' : 'Property added successfully');
      onClose();
    }
    catch(e){
      const errorMessage = (e as { reason?: string })?.reason || 'Unknown error';
      (window as { toast?: { error: (message: string) => void } }).toast?.error('Error: ' + errorMessage);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '550px',
        margin: '0 auto',
        padding: 3,
        borderRadius: '16px',
        boxShadow: 3,
        '@media (max-width:600px)': {
          width: '20rem',
        }
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, textAlign: 'left' }}>
        {data ? 'Edit Property' : 'Create a new property'}
      </Typography>
      <TextField
        style={{borderRadius: '8px'}}
        sx={{
        borderRadius: "8px",
        }}
        label="Property name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
      />
      <Select label="Transaction type"   height='54px' name="type" value={formData.type} onChange={(e)=>setFormData({ ...formData, type: e as string })}  options={transactionTypeOptions}/>
      <Select label="Property type"  name="propertyType" height='54px' value={formData.propertyType} onChange={(e)=>setFormData({ ...formData, propertyType: e as string })} options={propertyTypeOptions}/>
      <TextField
        label="Price"
        name="price"
        type="number"
        value={formData.price}
        error={error}
        helperText={error?'Number should be between 100-100000':null}
        onChange={handleChange}
        fullWidth
        required
      />
      <Button
        type="submit"
        disabled={error}
        variant="contained"
        sx={{
          backgroundColor: '#7b5cf9',
          color: 'white',
          textTransform: 'none',
          fontWeight: 600,
          '&:hover': { backgroundColor: '#6848e0' },
        }}
      >
        {data ? 'Update' : 'Create'}
      </Button>
    </Box>
  );
}

export default AddOrEditProperty;
