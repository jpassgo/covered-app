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
  const [, setDonationBrands] = useState<any[]>([]);
  const [, setDonationQuantities] = useState<any[]>([]);
  const [, setDonationConditions] = useState<any[]>([]);
  const [, setDonationValues] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
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

  const handleDonationEditInternal = (
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

  const handleDonationEdit =
    (
      item: any,
      index: number,
      selectedItemsListState: React.Dispatch<React.SetStateAction<any[]>>,
    ) =>
    () => {
      // Rest of your logic
      handleDonationEditInternal(item, index, selectedItemsListState);
    };

  const handleCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;

    if (fileInput.files && fileInput.files[0]) {
      const selectedImage = URL.createObjectURL(fileInput.files[0]);
      setSelectedImage(selectedImage);
    }
  };

  const handleDonationSubmit = () => {
    // TODO: [KAN-21] Submit donation to backend
    console.log();
  };

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
            <Card sx={{ minWidth: 275, margin: '16px 0' }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {item.label}
                </Typography>
                <div>
                  <TextField
                    id="standard-basic"
                    label="Brand/Description"
                    variant="standard"
                    onChange={handleDonationEdit(
                      item,
                      index,
                      setDonationBrands,
                    )}
                  />
                  <TextField
                    id="standard-basic"
                    label="Quantity"
                    variant="standard"
                    onChange={handleDonationEdit(
                      item,
                      index,
                      setDonationQuantities,
                    )}
                  />
                  <TextField
                    id="standard-basic"
                    label="Condition"
                    variant="standard"
                    onChange={handleDonationEdit(
                      item,
                      index,
                      setDonationConditions,
                    )}
                  />
                  <TextField
                    id="standard-basic"
                    label="Value"
                    variant="standard"
                    onChange={handleDonationEdit(
                      item,
                      index,
                      setDonationValues,
                    )}
                  />
                </div>
                <div>
                  <img
                    src={selectedImage}
                    style={{ maxWidth: '100%', maxHeight: '200px' }}
                  />
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    id="cameraInput"
                    onChange={handleCapture}
                    style={{ display: 'none' }}
                  />
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      const cameraInput =
                        document.getElementById('cameraInput');
                      if (cameraInput) {
                        cameraInput.click();
                      }
                    }}
                  >
                    Upload Photo
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          <Grid item xs={12}>
            <CardActions>
              <Button
                disabled={selectedDonatableItems.length < 1}
                size="small"
                variant="outlined"
                onClick={handleDonationSubmit}
              >
                Donate Items
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SubmitDonationPage;
