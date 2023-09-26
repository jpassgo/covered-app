/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, Box  } from '@mui/material';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppContext } from './AppContext';
import ReliefMissionCard from './ReliefMissionCard';
import { useState } from 'react';



const reliefMissionsOptions = [
  { label: 'Volcano Relief' },
  { label: 'Tornado Relief' },
  { label: 'Wildfire Relief'}
];
const donatableItemsOptions = [
  { label: 'Tent' },
  { label: 'Shoes' },
  { label: 'Gloves' },
  { label: 'Water' },
  { label: 'Food' },
  { label: 'Clothing' },
  { label: 'Shovel' },
];

const DonatePage = () => {
  const context = useAppContext();

  const {
    reliefMissions,
    donatableItems,
  } = context;

  const [selectedReliefMissions, setSelectedReliefMissions] = useState(reliefMissions);
  const [selectedDonatableItems, setSelectedDonatableItems] = useState(donatableItems);
  
  const handleSelectionChange =
    (
      setSelection: React.Dispatch<React.SetStateAction<any[]>>,
    ) =>
    (newValue: any) => {
      let newItem: { label: any } = { label: '' };
      if (typeof newValue === 'string') {
        // String input, which means custom input
        newItem = { label: newValue };
        setSelection((prev) => [...prev, newItem]);
      } else if (newValue && 'inputValue' in newValue) {
        // Create a new value from the user input
        newItem = { label: newValue.inputValue };
        setSelection((prev) => [...prev, newItem]);
      } else if (newValue && 'label' in newValue) {
        // Value from the options, add it to the list
        newItem = newValue;
        setSelection((prev) => [...prev, newItem]);
      }
    };

    const handleDeleteItem = (
      item: any,
      selectedItemsListState: React.Dispatch<React.SetStateAction<any[]>>
    ) => () => {
      selectedItemsListState((prev) =>
        prev.filter((selectedItem) => selectedItem.label !== item.label)
      );
    };
  
    const filteredMissions = reliefMissions.filter((mission: any) => {
      const missionItems = mission.neededItems;
  
      // Check if the mission contains all selected donatable items
      return selectedDonatableItems.every((item: string) => missionItems.includes(item));
    }).filter((mission: any) => {
      return selectedReliefMissions.some((item: any) => mission.title === item.label);
    });

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        <Autocomplete
            options={reliefMissionsOptions}
            getOptionLabel={option =>
              typeof option === 'string' ? option : option.label
            }
            value={selectedReliefMissions}
            onChange={handleSelectionChange(setSelectedReliefMissions)}
            renderInput={params => (
              <TextField
                {...params}
                label="Relief Missions"
                variant="outlined"
                fullWidth
              />
            )}
            isOptionEqualToValue={(option, value) =>
              option.label === value.label
            }
          />
          {selectedReliefMissions.map((item, index) => (
           <Chip
           key={index}
           label={item.label}
           onDelete={handleDeleteItem(item, setSelectedReliefMissions)}
           variant="outlined"
           icon={<DeleteIcon />}
           style={{ margin: '0 5px 5px 0' }}
         />
          ))}
        </Grid>
        <Grid item xs={12}>
        <Autocomplete
            options={donatableItemsOptions}
            getOptionLabel={option => option.label}
            value={selectedDonatableItems}
            onChange={handleSelectionChange(setSelectedDonatableItems)}
            renderInput={params => (
              <TextField
                {...params}
                label="Donatable Items"
                variant="outlined"
                fullWidth
              />
            )}
          />
          {selectedDonatableItems.map((item, index) => (
            <Chip
            key={index}
            label={item.label}
            onDelete={handleDeleteItem(item, setSelectedDonatableItems)}
            variant="outlined"
            icon={<DeleteIcon />}
            style={{ margin: '0 5px 5px 0' }}
          />
          ))}
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ p: 2, paddingLeft: '30px' }}>
            <Grid item xs={12}>
              {filteredMissions.map((mission: any) => (
                <ReliefMissionCard
                  title={mission.title}
                  description={mission.description}
                  image={mission.image}
                />
              ))}
            </Grid>
          </Box>
        </Grid>
        {/* <Grid item xs={12}>
          <Button variant="contained" onClick={addPendingDonation}>
            Add Donation
          </Button>
          {pendingDonations.map((item, index: number) => (
            <DonateItemCard
              donation={item}
              index={index}
              onRemove={handleRemove}
            />
          ))}
        </Grid>
        <Grid item xs={12}>
          <DonationItemList />
        </Grid> */}
      </Grid>
    </Container>
  );
};

export default DonatePage;
