import { Container, Grid, Box } from '@mui/material';
import ReliefMission from '../models/ReliefMission';
import ReliefMissionCard from './ReliefMissionCard';
import volcano from '../assets/volcano.jpeg';
import town from '../assets/town.jpeg';
import trees from '../assets/trees.jpeg';

interface HomePageProps {
  reliefMissions?: ReliefMission[];
}

const defaultReliefMissions = [
  {
    title: 'Volcano Relief',
    description:
      'Help the people of St. Vincent and the Grenadines recover from the La Soufrière volcanic eruption.',
    image: volcano,
    neededItems: [ 'Water', 'Food', 'Shovel' ],
  },
  {
    title: 'Tornado Relief',
    description:
      'Help the people of Nashville, Tennessee recover from the March 2020 tornado.',
    image: town,
    neededItems: [ 'Water', 'Food', 'Tent' ],
  },
  {
    title: 'Wildfire Relief',
    description:
      'Help the people of California recover from the 2020 wildfires.',
    image: trees,
    neededItems: [ 'Water', 'Food', 'Clothing', 'Tent', 'Shovel', 'Gloves' ],
  },
];

export default function HomePage({
  reliefMissions = defaultReliefMissions,
}: HomePageProps) {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2, paddingLeft: '30px' }}>
            <div>
              {reliefMissions.map(reliefMission => {
                return (
                  <ReliefMissionCard
                    title={reliefMission.title}
                    description={reliefMission.description}
                    image={reliefMission.image}
                  />
                );
              })}
            </div>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
