import { useState } from 'react';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';

const CaptureFromCamera = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [selectedItems1, setSelectedItems1] = useState<string[]>([]);
  const [selectedItems2, setSelectedItems2] = useState<string[]>([]);

  const reliefMissions = [
    { label: 'Hurricane Katrina' },
    { label: 'Hawaii Fires' },
  ];

  const donatableItems = [
    { label: 'Tent' },
    { label: 'Shoes' },
    { label: 'Gloves' },
  ]; 

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

  const handleSelectionChange = (selectionList: string[], setSelectionList: React.Dispatch<React.SetStateAction<string[]>>) => 
  (event: any, newValue: any) => {
    if (typeof newValue === 'string') {
      // String input, which means custom input
      setSelectionList([...selectionList, newValue]);
    } else if (newValue && 'inputValue' in newValue) {
      // Create a new value from the user input
      setSelectionList([...selectionList, newValue.inputValue]);
    } else if (newValue && 'label' in newValue) {
      // Value from the options
      setSelectionList([...selectionList, newValue.label]);
    }
};

  const handleDeleteItem = (selectionList: string[], setSelectionList: React.Dispatch<React.SetStateAction<string[]>>) => 
  (item: string) => 
    () => {
      setSelectionList(selectionList.filter(selectedItem => selectedItem !== item));
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        <Autocomplete
          freeSolo
          options={reliefMissions}
          getOptionLabel={(option) => (typeof option === 'string' ? option : option.label)}
          onChange={handleSelectionChange(selectedItems1, setSelectedItems1)}
          renderInput={(params) => <TextField {...params} label="Relief Missions" variant="outlined" fullWidth />}
          isOptionEqualToValue={(option, value) => option.label === value.label}
        />
          {selectedItems1.map((item, index) => (
            <Chip
              key={index}
              label={item}
              onDelete={handleDeleteItem(selectedItems1, setSelectedItems1)(item)}
              variant="outlined"
              icon={<DeleteIcon />}
              style={{ margin: '0 5px 5px 0' }}
            />
          ))}
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            options={donatableItems}
            getOptionLabel={(option) => option.label}
            onChange={handleSelectionChange(selectedItems2, setSelectedItems2)}
            renderInput={(params) => <TextField {...params} label="Donatable Items" variant="outlined" fullWidth />}
          />
          {selectedItems2.map((item, index) => (
            <Chip
              key={index}
              label={item}
              onDelete={handleDeleteItem(selectedItems2, setSelectedItems2)(item)}
              variant="outlined"
              icon={<DeleteIcon />}
              style={{ margin: '0 5px 5px 0' }}
            />
          ))}
        </Grid>
        <Grid item xs={12}>
          <label style={{ display: 'block', margin: '20px 0', cursor: 'pointer' }}>
            <span style={{ color: 'blue', textDecoration: 'underline' }}>Select an Image</span>
            <input 
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleCapture}
              style={{ display: 'none' }} // Hide the original input button
            />
          </label>
          {imageSrc && <img src={imageSrc} alt="Captured" style={{ width: '100%', height: 'auto' }} />}
      </Grid>
      </Grid>
    </Container>
  );
};

export default CaptureFromCamera;
