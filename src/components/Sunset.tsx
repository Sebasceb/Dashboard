import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

import sunset from '../assets/sunset.jpg'


export default function Sunset() {
    return (
        <Card sx={{ padding: 1 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={sunset}
                    alt="Amanecer"
                />
                <CardContent>
                    <Typography gutterBottom component="h2" variant="h6" color="primary">
                        Caída del sol
                    </Typography>
                    <Typography component="p" variant="h4">
                        18:19:08
                    </Typography>
                    <Typography color="text.secondary" sx={{ flex: 1 }}>
                        en 17 Junio, 2024
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}