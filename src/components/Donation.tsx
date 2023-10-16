import { Container, Grid, Typography } from '@mui/material';

interface DonationProps {
  title: string;
}

const Donation: React.FC<DonationProps> = ({ title }) => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">{title}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Donation;
