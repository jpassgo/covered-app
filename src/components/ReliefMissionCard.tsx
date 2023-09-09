import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'


interface ReliefMissionCardProps {
    title: string;
    description: string;
    image: string;
}

export default function ReliefMissionCard({title, description, image}: ReliefMissionCardProps) {
  return (
    <div style={{marginTop: '10px'}}>
      <Card sx={{ maxWidth: 345, backgroundColor: '#D4D4D4' }}>
        <CardMedia
          sx={{ height: 140 }}
          image={image}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title} 
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description} 
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={"/donate"} className="no-underline">
              <Button size="small" style={{ backgroundColor: '#F0EFEB', color: '#000000' }}>Donate</Button>        
          </Link>
          <Link to={"/home"} className="no-underline">
              <Button size="small" style={{ backgroundColor: '#F0EFEB', color: '#000000' }}>Share</Button>        
          </Link>        
        </CardActions>
      </Card>
    </div>
  );
}