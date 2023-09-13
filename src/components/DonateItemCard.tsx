import { CameraAlt } from '@mui/icons-material';
import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useAppContext } from './AppContext';

function DonateItemCard() {
  const [name, setName] = useState('');
  const [dimensions, setDimensions] = useState({ length: '', width: '', height: '' });
  const [quantity, setQuantity] = useState<number>(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const { donationItems, setDonationItems } = useAppContext();


  const onToggleExpansion = () => {
    setIsExpanded(prev => !prev);
  }

  const handleCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDonateItem = () => {
    const newItem = {
      title: name,
      quantity,
      id: Date.now(), // You might want to replace this with a better unique identifier
      dimensions,
      imageSrc
    };

    setDonationItems(prevItems => [...prevItems, newItem]);
  };

  return (
    <Grid container spacing={2} style={{ 
        border: '1px solid #ccc', 
        backgroundColor: '#F7F7FF', 
        padding: '10px',
        width: '300px', 
        margin: '10px',
        paddingRight: '25px',
        paddingBottom: '25px',
      }}>
      
        <Grid item xs={12} style={{ display: 'flex', alignItems: 'center'}}>
            <Button variant="contained" onClick={onToggleExpansion}>
                {isExpanded ? 'Minimize' : 'Expand'}
            </Button>
            <span style={{ marginLeft: '10px' }}>{name}</span>
        </Grid>

        {isExpanded && (
          <>
            <Grid item xs={12}>
                <TextField 
                    fullWidth 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Description"
                />
            </Grid>
            
            {/* Breaking dimensions inputs into a sub grid */}
            <Grid item xs={12} container spacing={1}>
                <Grid item xs={4}>
                    <TextField 
                        fullWidth
                        type="text" 
                        value={dimensions.length} 
                        onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
                        placeholder="Length"
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField 
                        fullWidth
                        type="text" 
                        value={dimensions.width} 
                        onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                        placeholder="Width"
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField 
                        fullWidth
                        type="text" 
                        value={dimensions.height} 
                        onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                        placeholder="Height"
                    />
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <TextField 
                    fullWidth
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Number(e.target.value))} 
                    placeholder="Quantity"
                />
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <label style={{ display: 'block',  cursor: 'pointer' }}>
                <span style={{ color: 'black', textDecoration: 'none' }}>Add Photo</span>
                <CameraAlt style={{ color: 'black', verticalAlign: 'middle', marginLeft: '10px' }} />
                <input 
                  type="file" 
                  accept="image/*" 
                  capture="environment" 
                  onChange={handleCapture} 
                  style={{ display: 'none' }} // Hide the original input button
                />
              </label>
            <Button variant="contained" size="small" onClick={handleDonateItem}>Donate Item</Button>
          </Grid>
          <Grid item xs={12}>
            {imageSrc && <img src={imageSrc} alt="Captured" style={{ width: '100%', height: 'auto' }} />}
          </Grid>
    </>
    )}
    </Grid>
  );
}

export default DonateItemCard;
