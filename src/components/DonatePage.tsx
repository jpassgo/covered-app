import { useState } from 'react';
import { Autocomplete, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppContext } from './AppContext';
import DonateItemCard from './DonateItemCard';

const DonatePage = () => {
  const [cards, setCards] = useState([{}]);

  const addNewCard = () => {
    setCards(prev => [...prev, {}]);
  };

  const context = useAppContext();

  if (!context) {
    throw new Error('CaptureFromCamera must be used within an AppProvider');
  }

  const { 
    reliefMissions, 
    setReliefMissions, 
    donatableItems, 
    setDonatableItems 
  } = context;

  const reliefMissionsOptions = [
    { label: 'Hurricane Katrina' },
    { label: 'Hawaii Fires' },
  ];
  const donatableItemsOptions = [
    { label: 'Tent' },
    { label: 'Shoes' },
    { label: 'Gloves' },
  ];

  const handleSelectionChange = (setContextList: React.Dispatch<React.SetStateAction<any[]>>) => 
  (newValue: any) => {
    let newItem: { label: any; } = { label: '' };
    if (typeof newValue === 'string') {
      // String input, which means custom input
      newItem = { label: newValue };
      setContextList(prev => [...prev, newItem]);
    } else if (newValue && 'inputValue' in newValue) {
      // Create a new value from the user input
      newItem = { label: newValue.inputValue };
      setContextList(prev => [...prev, newItem]);
    } else if (newValue && 'label' in newValue) {
      // Value from the options, add it to the list
      newItem = newValue;
      setContextList(prev => [...prev, newItem]);
    }

    if (newItem.label) {
      setCards(prev => [...prev, { description: newItem.label }]);
    }
  };

  const handleDeleteItem = (contextList: any[], setContextList: React.Dispatch<React.SetStateAction<any[]>>) => 
  (item: any) => 
    () => {
      setContextList(contextList.filter(selectedItem => selectedItem.label !== item.label));
  };

  return (
    <Container>
      <Grid container spacing={3}>
      <Grid item xs={12}>
          <Autocomplete
            freeSolo
            options={reliefMissionsOptions}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.label)}
            onChange={handleSelectionChange(setReliefMissions)}
            renderInput={(params) => <TextField {...params} label="Relief Missions" variant="outlined" fullWidth />}
            isOptionEqualToValue={(option, value) => option.label === value.label}
          />
          {reliefMissions.map((item, index) => (
            <Chip
              key={index}
              label={item.label}
              onDelete={handleDeleteItem(reliefMissions, setReliefMissions)(item)}
              variant="outlined"
              icon={<DeleteIcon />}
              style={{ margin: '0 5px 5px 0' }}
            />
          ))}
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            options={donatableItemsOptions}
            getOptionLabel={(option) => option.label}
            onChange={handleSelectionChange(setDonatableItems)}
            renderInput={(params) => <TextField {...params} label="Donatable Items" variant="outlined" fullWidth />}
          />
          {donatableItems.map((item, index) => (
            <Chip
              key={index}
              label={item.label}
              onDelete={handleDeleteItem(donatableItems, setDonatableItems)(item)}
              variant="outlined"
              icon={<DeleteIcon />}
              style={{ margin: '0 5px 5px 0' }}
            />
          ))}
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={addNewCard}>Add Donation</Button>
          {cards.map(() => (
            <DonateItemCard />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default DonatePage;
