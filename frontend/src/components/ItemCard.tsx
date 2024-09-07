import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function RecipeReviewCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="194"
        src="https://m.media-amazon.com/images/I/71kLVJNTsVL._AC_UF894,1000_QL80_.jpg"
        alt="PSample desk"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Sample Desk
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          1500.00$
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          A simple yet functional office desk to to carry on with any type of
          work.
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Current stock: 10
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: 'right' }}>
        <IconButton aria-label="add to favorites">
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ModeEditIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
