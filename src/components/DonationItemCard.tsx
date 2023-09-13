import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { useAppContext } from "./AppContext";

interface DonationItemCardProps {
  title: string;
  quantity: number;
}

export default function DonationItemCard({ title, quantity }: DonationItemCardProps) {
  const { setDonationItems } = useAppContext();

  const removeItem = (title: string) => {
    setDonationItems((prevItems) => prevItems.filter((item) => item.title !== title));
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <div style={{ marginTop: '10px', width: '100%' }}>
        <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          <Card sx={{ width: '100%', backgroundColor: '#D3D3D3' }}>
            <CardContent style={{ display: 'flex', alignItems: 'center' }}>
              <Button variant="contained" color="error" onClick={() => removeItem(title)} style={{ marginRight: '10px' }}>
                X
              </Button>
              <div style={{ display: 'flex', alignItems: 'left', justifyContent: 'space-between', width: '100%' }}>
                <Typography gutterBottom variant="h5" component="div" style={{ marginRight: '10px' }}>
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantity: {quantity}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </div>
    </Grid>
  );
}
