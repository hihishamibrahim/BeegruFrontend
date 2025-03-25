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
        countFunc()
    }, [transactionType,propertyType,price]);

    useEffect(() => {
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
        <Grid style={{marginLeft:'-1rem',marginTop:'0rem'}} container spacing={2}>
            <Grid item xs={12} container>
            <Typography
            variant="subtitle2"
            sx={{
                fontWeight: 700,
                color:'black',
                fontSize: "13px",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
            }}
            >
            Showing {propertiesCount} Properties
            </Typography>
            <Divider sx={{ margin: "8px 0" }} />
            </Grid>
            {properties?.map(v=>(
            <CardWithDetails
                key={v._id}
                id={v._id}
                price={v.price}
                tag={v.type}
                title={v.name}
                onDelete={async() => await fetchData({path:`property/delete/${v._id}`,method:'DELETE', body: {}})}
                subtitle={v.propertyType==='Apartment'? "Builder floor apartment" : "Land"}
            />
            ))}
        </Grid>
    </>
  );
}

export default ListWithPagination;