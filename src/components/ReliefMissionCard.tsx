import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


interface ReliefMissionCardProps {
    title: string;
    description: string;
    image: string;
    style?: React.CSSProperties; 
}

export default function ReliefMissionCard({title, description, image, style}: ReliefMissionCardProps) {
  return (
    <div style={style}>
      <Card sx={{ maxWidth: 345 }}>
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
          <Button size="small">Donate</Button>
          <Button size="small">Share</Button>
        </CardActions>
      </Card>
    </div>
  );
}