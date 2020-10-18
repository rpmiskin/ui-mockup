import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import DaySlider from './DaySlider';

const useStyles = makeStyles({
    root: {
    //   width: 600
    },
    slider: {
      marginTop: 40
    }
  });
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

function onDayChange(day, schedule, onChange) {
    return (v) =>{
        const newValue = {...schedule};
        newValue[day] = v;
        onChange(newValue);
    }
}
export const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export default function ScheduleComponent(props) {
    const classes=useStyles();
    const {schedule={}, onChange=()=>{}} = props;
    
    return (<Grid container spacing={3}>{
            days.map((day)=>{return (
                    <Grid item xs={12}>
                    <DaySlider  
                        className={classes.slider}
                        label={day}
                        onChange={onDayChange(day, schedule, onChange)}
                        schedule={schedule[day]}
                    />
                    </Grid>
            )})
            }</Grid>);
}