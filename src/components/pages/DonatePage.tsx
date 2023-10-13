/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppContext } from '../AppContext';
import ReliefMissionCard from '../ReliefMissionCard';
import { useEffect, useState } from 'react';

const reliefMissionsOptions = [
  { label: 'Volcano Relief' },
  { label: 'Tornado Relief' },
  { label: 'Wildfire Relief' },
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
    // donatableItems,
  } = context;

  const [selectedReliefMissions, setSelectedReliefMissions] = useState<
    Array<{ label: string }>
  >([]);
  const [selectedDonatableItems, setSelectedDonatableItems] = useState<
    Array<{ label: string }>
  >([]);
  const [filteredMissions, setFilteredMissions] = useState<
    Array<{ label: string }>
  >([]);

  const handleSelectionChange =
    (setSelection: any) => (_: any, newValue: any) => {
      if (newValue) {
        // Check if newValue is defined
        const newItem = { label: newValue.label };
        setSelection((prev: any) => [...prev, newItem]);
      }
    };

  const handleDeleteItem =
    (
      item: any,
      selectedItemsListState: React.Dispatch<React.SetStateAction<any[]>>,
    ) =>
    () => {
      selectedItemsListState(prev =>
        prev.filter(selectedItem => selectedItem.label !== item.label),
      );
    };

  useEffect(() => {
    const newFilteredMissions = reliefMissions
      .filter((mission: any) => {
        if (selectedDonatableItems.length === 0) return true;
        return selectedDonatableItems.some((item: any) =>
          mission.neededItems.includes(item.label),
        );
      })
      .filter((mission: any) => {
        if (selectedReliefMissions.length === 0) return true;
        return selectedReliefMissions.some(
          (item: any) => mission.title === item.label,
        );
      });
    setFilteredMissions(newFilteredMissions);
  }, [selectedDonatableItems, selectedReliefMissions]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Autocomplete
            options={reliefMissionsOptions}
            getOptionLabel={option => option.label}
            onChange={handleSelectionChange(setSelectedReliefMissions)}
            renderInput={params => (
              <TextField
                {...params}
                label="Relief Missions"
                variant="outlined"
                fullWidth
              />
            )}
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
                  id={mission.id}
                />
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DonatePage;
