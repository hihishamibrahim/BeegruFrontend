import React,{useEffect,useState} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CardWithDetails from './CardWithDetails';
import Filters from './filter';
import { fetchData } from '@/utils/auth';

function ListWithPagination() {
const [properties, setProperties] = useState<{ _id: string; price: number; type: string; name: string; propertyType: string }[]>([])
const [propertiesCount,setPropertiesCount] = useState(0)
const [transactionType, setTransactionType] = useState<string>('');
const [propertyType, setPropertyType] = useState<string>('');
const [price, setPrice] = useState({min:0,max:100000});

//gets the count of the properties on page load and get the list of properties
    useEffect(() => {
        const countFunc = async ()=>{
            try {
                const data = await fetchData({path:'property/count',method:'GET',body:{type:transactionType,propertyType,minPrice:price.min,maxPrice:price.max}})
                setPropertiesCount(data.count)
            }
            catch(e){
                const errorMessage = (e as { reason?: string })?.reason || 'Unknown error';
                (window as { toast?: { error: (message: string) => void } }).toast?.error('Error: ' + errorMessage);
            }
        }
        const listFunc=async()=>{
            
            try {
            const data=  await fetchData({path:'property/list',method:'GET',body:{type:transactionType,propertyType,minPrice:price.min,maxPrice:price.max}})
            setProperties(data?.properties);
        }
        catch(e){
            const errorMessage = (e as { reason?: string })?.reason || 'Unknown error';
            (window as { toast?: { error: (message: string) => void } }).toast?.error('Error: ' + errorMessage);
        }
    }
    countFunc()
    listFunc()
    }, [transactionType,propertyType,price]);

  return (
    <>
        <Filters 
        transactionType={transactionType}
        setTransactionType={setTransactionType}
        propertyType={propertyType}
        setPropertyType={setPropertyType}
        price={price}
        setPrice={setPrice}
        />
        <Grid style={{marginLeft:'0rem',marginTop:'1rem',gap:'1rem'}} container spacing={1}>
        <Grid item xs={12} container alignItems="center">
            <Typography
                variant="subtitle2"
                sx={{
                fontWeight: 500,
                color: 'black',
                fontSize: '1.05rem',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                marginRight: 1,
                }}
            >
                Showing {propertiesCount} Properties
            </Typography>
            <Divider sx={{ flexGrow: 1 }} />
            </Grid>
            <Grid container style={{gap:'40px 16px'}}>
                {properties?.map(v=>(
                    <CardWithDetails
                        key={v._id} 
                        id={v._id}
                        price={v.price}
                        tag={v.type}
                        title={v.name}
                        onDelete={async() => await fetchData({path:`property/delete/${v._id}`,method:'DELETE', body: {}})}
                        subtitle={v.propertyType==='apartment'? "Builder floor apartment" : "Land"}
                    />
                ))}
            </Grid>
        </Grid>
    </>
  );
}

export default ListWithPagination;