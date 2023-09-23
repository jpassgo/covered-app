import { Button } from '@mui/material';
import DonationItemCard from './DonationItemCard';
import { useAppContext } from './AppContext';

export default function DonationItemList() {
  const { donationItems } = useAppContext();

  const submitItems = async () => {
    try {
      await fetch('https://api.yourwebsite.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationItems),
      });
    } catch (error) {
      console.error('Error submitting items:', error);
    }
  };

  return (
    <div>
      {donationItems.map(item => (
        <div key={item.id} style={{ display: 'flex', alignItems: 'center' }}>
          <DonationItemCard title={item.title} quantity={item.quantity} />
        </div>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={submitItems}
        style={{ marginTop: '20px' }}
      >
        Submit All Items
      </Button>
    </div>
  );
}
