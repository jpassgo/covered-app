/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  Autocomplete,
  Chip,
  TextField,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import DeleteIcon from '@mui/icons-material/Delete';

const SubmitDonationPage: React.FC = () => {
  const { id } = useParams();
  const { reliefMissions } = useAppContext();

  const mission = reliefMissions.find(mission => mission.id === Number(id));
  const [donationBrands, setDonationBrands] = useState<any[]>([]);
  const [donationQuantities, setDonationQuantities] = useState<any[]>([]);
  const [donationConditions, setDonationConditions] = useState<any[]>([]);
  const [donationValues, setDonationValues] = useState<any[]>([]);
  const [selectedDonatableItems, setSelectedDonatableItems] = useState<
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

  const handleDonationEdit = (
    item: any,
    index: number,
    selectedItemsListState: React.Dispatch<React.SetStateAction<any[]>>,
  ) => {
    selectedItemsListState(prev => {
      const updatedList = [...prev];

      if (index < updatedList.length - 1) {
        // If the item already exists, update it
        updatedList[index] = item;
      } else {
        // If the item doesn't exist, add it at the specified index
        updatedList.push(item);
      }

      return updatedList;
    });
  };

  const handleDonationSubmit = () => {};

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={mission.image}
              alt={mission.title}
            />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">{mission.title}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{mission.description}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            options={mission.neededItems.map((item: any) => ({ label: item }))}
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
          {selectedDonatableItems.map((item, index) => (
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {item.label}
                </Typography>
                <TextField
                  id="standard-basic"
                  label="Brand/Description"
                  variant="standard"
                  onChange={event =>
                    handleDonationEdit(item, index, setDonationBrands)
                  }
                />
                <TextField
                  id="standard-basic"
                  label="Quantity"
                  variant="standard"
                  onChange={event =>
                    handleDonationEdit(item, index, setDonationQuantities)
                  }
                />
                <TextField
                  id="standard-basic"
                  label="Condition"
                  variant="standard"
                  onChange={event =>
                    handleDonationEdit(item, index, setDonationConditions)
                  }
                />
                <TextField
                  id="standard-basic"
                  label="Value"
                  variant="standard"
                  onChange={event =>
                    handleDonationEdit(item, index, setDonationValues)
                  }
                />
              </CardContent>
              <CardActions>
                <Button size="small" onClick={handleDonationSubmit}>
                  Donate Items
                </Button>
              </CardActions>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default SubmitDonationPage;
