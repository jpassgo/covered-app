import React from 'react';
import { Typography, Container, Grid, Card, CardMedia, Autocomplete, Chip, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../AppContext';

const SubmitDonationPage: React.FC = () => {
  const { id } = useParams();
  const { reliefMissions } = useAppContext();

  const mission = reliefMissions.find((mission) => mission.id === Number(id));

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
        {/* Add donation form or other content related to the "Donate" page */}
      </Grid>
    </Container>
  );
};

export default SubmitDonationPage;
