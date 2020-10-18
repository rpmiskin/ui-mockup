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

const marks = [
  {value:0, valueLabel:"00:00" },
  {value:1, valueLabel:"01:00" },
  {value:2, valueLabel:"02:00" },
  {value:3, valueLabel:"03:00" },
  {value:4, valueLabel:"04:00" },
  {value:5, valueLabel:"05:00" },
  {value:6, valueLabel:"06:00" },
  {value:7, valueLabel:"07:00" },
  {value:8, valueLabel:"08:00" },
  {value:9, valueLabel:"09:00" },
  {value:10, valueLabel:"10:00" },
  {value:11, valueLabel:"11:00" },
  {value:12, valueLabel:"12:00" },
  {value:13, valueLabel:"13:00" },
  {value:14, valueLabel:"14:00" },
  {value:15, valueLabel:"15:00" },
  {value:16, valueLabel:"16:00" },
  {value:17, valueLabel:"17:00" },
  {value:18, valueLabel:"18:00" },
  {value:19, valueLabel:"19:00" },
  {value:20, valueLabel:"20:00" },
  {value:21, valueLabel:"21:00" },
  {value:22, valueLabel:"22:00" },
  {value:23, valueLabel:"23:00" }
]
const defaultSchedule = [9, 17];

function formatHour(v) {
  const mark = marks.find((m)=>m.value === v);
  return mark?mark.valueLabel:"???";
}

function DaySlider(props) {
  const classes=useStyles();
  const {label= "defaultText", onChange= ()=>{}, schedule=defaultSchedule, disabled=false, setDisabled=()=>{}} = props;
  
    return (
    <Grid container alignItems="center" spacing={2} className={classes.root}>
      <Grid item xs={2}>
      <Typography >
          {label}<br></br>
          {schedule.map(s=>formatHour(s)).join(':')}
        </Typography>
        <Button onClick={()=>{
        
        setDisabled(!disabled);
      }}>
        {!disabled?"Disable":"Enable"}
      </Button>
      </Grid>
      <Grid item xs={6}>
        <Slider className={classes.slider}
          value={schedule}
          onChange={(o, v)=>{
            onChange(v);
          }}
          aria-labelledby="range-slider"
          getAriaValueText={()=>"foo"}
          valueLabelDisplay={!disabled&&"on"}
          valueLabelFormat={formatHour}
          marks={marks}
          set={1}
          step={null}
          min={0}
          max={23}
          disabled={disabled}
        />
    </Grid>
    <Grid item xs={4}>
 
      <Button disabled={disabled}>
        Add Schedule
      </Button>
      <Button disabled={disabled}>
        Remove Schedule
      </Button>
    </Grid>
  </Grid>

)}

function disableAndSet(disable, set) {
  return (b)=>{
    if (b) {
      set([]);
    } else {
      set(defaultSchedule);
    }
    disable(b);
  }
}
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
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Schedule Picker
        </Typography>
        <ScheduleComponent schedule={schedule} onChange={setSchedule}/>
      </Box>
      <Box>
        <pre>{JSON.stringify(schedule, null, 4)}</pre>
      </Box>
      
    </Container>
  );
}
