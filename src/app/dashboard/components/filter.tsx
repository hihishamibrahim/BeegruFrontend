import React,{useState} from 'react';
import Select from '../../../component/Select';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import AddOrEditProperty from './AddOrEditProperty';
import Price from '@/component/Price';

interface FilterProps {
  transactionType: string;
  setTransactionType: (value: string) => void;
  propertyType: string;
  setPropertyType: (value: string) => void;
  price: { min: number; max: number };
  setPrice: (value: { min: number; max: number }) => void;
}
const transactionOptions = [
  {value: 'sale', label: 'Sale'},
  {value: 'rent', label: 'Rent'},
]

const propertyOptions = [
  {value: 'apartment', label: 'Apartment'},
  {value: 'land', label: 'Land'},
]

function Filter({transactionType, setTransactionType, propertyType, setPropertyType, price, setPrice}: FilterProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);

  return (
    <Grid container  direction='row' style={{marginTop:'2rem',height:'3rem'}} justifyContent='space-between' spacing={0}>
      <Grid item xs={12} style={{ overflowY: 'hidden', flexWrap: 'nowrap', scrollbarWidth: 'none',gap:'1.2rem'}} md={6} container>
        <Select
          label='Transaction Type'
          value={transactionType}
          onChange={(value) => setTransactionType(value as string)}
          options={transactionOptions}
          style={{width:'12.37rem',height:'2.6rem'}}
        />
        <Select
          label='Property type'
          value={propertyType}
          onChange={(value) => setPropertyType(value as string)}
          options={propertyOptions}
          style={{width:'9.9rem',height:'2.6rem'}}
        />
        <Select
          label='Price'
          value={`${price.min}-${price.max}`}
          onChange={(value) => {
            const [min, max] = (value as string).split('-').map(Number);
            setPrice({ min, max });
          }}
          options={[
            { value: '0-1000', label: '$0 - $1000' },
            { value: '1000-5000', label: '$1000 - $5000' },
            { value: '5000-10000', label: '$5000 - $10000' },
          ]}
          open={false}
          defaultOpen={false}
          onClose={() => setOpenPrice(true)}
          onOpen={() => setOpenPrice(true)}
          style={{width:'5.3rem',height:'2.6rem'}}
        />
      </Grid>
      <Grid item   sx={{
         '@media (max-width:600px)': {
          //stles for small screens
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            textAlign: "center",
            borderRadius: '8px',
            bgcolor: "background.paper",
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            p: 2,
            zIndex: 10, // Optional: ensure it's above other content
          },
          
        }}
        >
        <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{
          textTransform: 'none',
          backgroundColor: "#7060FF", 
          color: "#fff",
          width: '19.5rem',
          height: '2.8rem',
          gap: '0.6rem',
          padding: '8px 22px',
          borderRadius: '8px',
          '@media (max-width:600px)': {
            width: '90%',
          }
        }}
        onClick={()=>setOpenDialog(true)}
      >
        Create a new property
      </Button>
      </Grid>
      <Dialog open={openPrice} onClose={()=>setOpenPrice(false)}>
        <Price setPrice={setPrice} price={price} onClose={()=>setOpenPrice(false)}/>
      </Dialog>
      <Dialog open={openDialog} onClose={()=>setOpenDialog(false)}>
        <AddOrEditProperty 
          data={undefined} 
          id={undefined} 
          onClose={() => setOpenDialog(false)} 
        />
      </Dialog>
    </Grid>
  );
}
export default Filter;