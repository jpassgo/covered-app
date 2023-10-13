import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Divider, Grid } from '@mui/material';

interface ReliefMissionCardProps {
  title: string;
  description: string;
  image: string;
  id: number;
}

export default function ReliefMissionCard({
  title,
  description,
  image,
  id,
}: ReliefMissionCardProps) {
  return (
    <Grid container spacing={2} alignItems="center">
      <div style={{ marginTop: '10px' }}>
        <Grid
          item
          xs={12}
          style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}
        >
          <Card sx={{ maxWidth: 345, backgroundColor: '#D3D3D3' }}>
            <CardMedia sx={{ height: 140 }} image={image} title={title} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Divider />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ marginTop: '5px' }}
              >
                {description}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={`/mission/${id}`} className="no-underline">
                <Button
                  size="small"
                  style={{
                    backgroundColor: '#F0EFEB',
                    color: '#000000',
                    marginLeft: '5px',
                  }}
                >
                  Donate
                </Button>
              </Link>
              <Link to={'/home'} className="no-underline">
                <Button
                  size="small"
                  style={{ backgroundColor: '#F0EFEB', color: '#000000' }}
                >
                  Share
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      </div>
    </Grid>
  );
}
