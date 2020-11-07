import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ProTip from '../components/ProTip';
import Link from '../components/Link';
import Copyright from '../components/Copyright';
import ScheduleComponent from '../components/ScheduleComponent';
const useStyles = makeStyles({
  root: {
    width: 600
  },
  slider: {
    marginTop: 40
  }
});

const defaultSchedule = [9, 17];

/*
Top level state

{
  monday: [{frequency: "15min", schedule:[0,2]}],
  tuesday: [{frequency: "15min", schedule:[0,2]},
            {frequency: "15min", schedule:[9,17]}],
  wednesday: undefined, 

}

For any undefined fields show a single disabled slider.
For each schedule show a slider.
Do not allow the last slider to be removed.


So overall onChange sends out the whole thing
A day's onChange sends out the array of frequency+schedule.
A slider's onChange sends out the specific schedule tuple.

*/


export default function Index() {
  
  const [schedule, setSchedule] = useState({
    monday: [{schedule: defaultSchedule}, {schedule:[3,4]}, {schedule:[3,4]}],
    tuesday: [{schedule: defaultSchedule}],
    wednesday: [{schedule: defaultSchedule}],
    thursday: [{schedule: defaultSchedule}],
    friday: [{schedule: defaultSchedule}],
    saturday: [{schedule: defaultSchedule}],
    sunday: [{schedule: defaultSchedule}],
  })

  const classes=useStyles();
  return (
    <Container maxWidth="md">
      <Box my={8}>
        <Typography variant="h4" component="h1" gutterBottom>
          UI Mockups
        </Typography>
        <ul>
          <li>
            <Link to="/schedule-example">Schedule Example</Link> - Example that allows setting of a complex schedule for a job.
          </li>
          <li>
            <Link to="/editor-example">Editor Example</Link> - Example that an embedded code editor.
          </li>
        </ul>
      </Box>
    </Container>
  );
}
