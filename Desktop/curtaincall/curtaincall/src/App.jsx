import * as React from 'react';
import {useEffect, useState} from 'react';
import './App.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import AOS from "aos";
import Internship from './Internship';
import Offer from './Offer';
import Town from './Town'
import "aos/dist/aos.css";
import Loading from './Loading';
import Countdown from 'react-countdown';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      document.documentElement.style = "background-image: url('https://i.pinimg.com/originals/f3/26/cd/f326cd8b7633e8080e59eb81b7854c54.gif'); background-size:20%;background-repeat: repeat;margin:unset;padding:unset;overflow-x:unset;";
      document.body.style = "margin:unset;padding:unset;overflow-x:unset;";
    }, 3000);
  }, []);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  let targetDate = new Date('October 19, 2024 00:00:00 GMT+0530').getTime();
  return (
    <>
    {isLoading ? <Loading /> : (
        <>
        <div style = {{textAlign: 'center'}}><h1 style = {{ display: 'inline-block', backgroundColor: '#090909', fontFamily: 'monospace', color: 'white', letterSpacing: '2px'}}>CHOOSE ANY ONE OF THE FOLLOWING</h1></div>
        <em><h2 style = {{textAlign: 'center'}}><div style = {{color: 'gray', backgroundColor: '#090909', display: 'inline-block'}}>SUBMISSIONS CLOSE IN<Countdown date={targetDate} renderer={props => <div>{props.days} days, {props.hours.toString()} hours, {props.minutes.toString()} minutes</div>}/></div></h2></em>
        <div>
            <div className = "container">
              <div>
                <Internship imageurl = "https://i.ibb.co/7jBpnrV/Whats-App-Image-2024-10-11-at-22-24-40.jpg" title = "THE INTERNSHIP"/>
              </div>
              <div>
                <Offer imageurl = "https://i.ibb.co/DRWW1zj/Whats-App-Image-2024-10-11-at-22-24-41-1.jpg" title = "THE OFFER"/>
              </div>
              <div className = "bottomcard">
                <Town imageurl = "https://i.ibb.co/TkNqDJn/Whats-App-Image-2024-10-11-at-22-24-41.jpg" title = "THE TOWN"/>
              </div>
          </div>
        </div>
        </>
      )}
    </>
  );
}

export default App