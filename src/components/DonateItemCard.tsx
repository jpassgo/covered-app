import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';

function DonateItemCard() {
  const [name, setName] = useState('');
  const [dimensions, setDimensions] = useState({ length: '', width: '', height: '' });
  const [quantity, setQuantity] = useState();
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

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

  return (
    <div style={{ 
        border: '1px solid #ccc', // This sets the border color
        backgroundColor: '#B7B7A4', // This sets the background color
        padding: '20px', 
        width: '300px', 
        margin: '10px 0' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button variant="contained" onClick={onToggleExpansion}>
                {isExpanded ? 'Minimize' : 'Expand'}
            </Button>
            <span style={{ marginLeft: '10px' }}>{name}</span>
        </div>
        {isExpanded && (
        <>
            <TextField 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Name"
            />
            <TextField 
                type="text" 
                value={dimensions.length} 
                onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
                placeholder="Length"
            />
            <TextField 
                type="text" 
                value={dimensions.width} 
                onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                placeholder="Breadth"
            />
            <TextField 
                type="text" 
                value={dimensions.height} 
                onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                placeholder="Height"
            />
            <TextField 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(Number(e.target.value))} 
                placeholder="Quantity"
            />
            <label style={{ display: 'block', margin: '20px 0', cursor: 'pointer' }}>
                <span style={{ color: 'blue', textDecoration: 'underline' }}>Open Camera</span>
                <input 
                type="file" 
                accept="image/*" 
                capture="environment" 
                onChange={handleCapture} 
                style={{ display: 'none' }} // Hide the original input button
                />
            </label>
        {imageSrc && <img src={imageSrc} alt="Captured" style={{ width: '100%', height: 'auto' }} />}
    </>
    )}
    </div>
  );
}

export default DonateItemCard;
