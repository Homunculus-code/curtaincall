import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import {useEffect} from 'react';
import './App.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import AOS from "aos";
import "aos/dist/aos.css";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import Slide from '@mui/material/Slide';  
import ModalImage from 'react-modal-image';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Internship({imageurl, title}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Card onClick = {handleClickOpen} data-aos="zoom-in" data-aos-duration = "10000ms" color = "gray" sx = {{maxWidth: "350px", '@media screen and (max-width: 600px)': {
      width: '300px',
    }, ':hover': {
          boxShadow: 20, // theme.shadows[20]
        }}}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="300"
            image={imageurl}
            alt="green iguana"
            sx={{ objectFit: "cover" }}
          />
          <CardContent style = {{backgroundColor: '#080808'}}>
            <Typography style = {{textAlign: 'center', color: 'white', fontFamily: 'monospace'}} gutterBottom variant="h5" component="div">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{ //You can copy the code below in your theme
          background: 'black',
          '& .MuiPaper-root': {
            background: 'black'
          },
          '& .MuiBackdrop-root': {
            backgroundColor: 'transparent' // Try to remove this to see the result
          }}}
      >
        <AppBar sx={{ position: 'relative' , backgroundColor: 'black'}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              The Internship
            </Typography>
          </Toolbar>
          <div style = {{textAlign: 'left', margin: '50px'}}>
            <h2>After months of sending out applications and getting rejected, you begin digging through your Spam folder in a moment of desperation. To your surprise, you find the following grim-looking acceptance letter from the email ‘death@yahoo.com’. </h2>
            <br />
            <ModalImage small="/static/images/internship.png"  large="/static/images/internship.png"  style = {{display: "block", marginLeft: "auto", marginRight: "auto", maxWidth:"70%", maxHeight: "70%"}} alt="You've got mail!"/>
            <br />
            <h2>As you can tell from the use of Yahoo mail, Death is ancient, and difficult to understand.</h2>
            <h1>WRITE A SCRIPT/STORY ON YOUR FIRST DAY OF WORK WITH DEATH. NO WORD LIMIT.</h1>
            <a href = "https://forms.gle/6t8SjMSKU1KPEQAT6">Submission form</a>
          </div>
        </AppBar>
      </Dialog>
    </React.Fragment>
  );
}
