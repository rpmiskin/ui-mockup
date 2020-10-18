import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
    //   width: 600
    },
    slider: {
    //   marginTop: 40
    },
    label: {
        textTransform: 'capitalize'
    }
  });
  function formatHour(v) {
    const mark = marks.find((m)=>m.value === v);
    return mark?mark.valueLabel:"???";
  }
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
  const defaultSchedule = [{schedule:[9, 17]}];
// FIXME Need to handle the structure:
//  [{frequency: "15min", schedule:[0,2]},
//   {frequency: "15min", schedule:[9,17]}]
//

function detectOverlaps(schedule) {
    const justHours = schedule.filter(s=>s && s.schedule && Array.isArray(s.schedule)).map(s=>s.schedule);
    justHours.sort((a,b)=>{
        if (a[0]===b[0]) {return 0;}
        if (a[0]<b[0]) {return -1;}
        return 1;
    });
    console.log(JSON.stringify(justHours));
}


function createSliders(props) {
  
    const {schedules, classes, onChange} = props;
    const disabled = false;
    if (!schedules || schedules.length === 0) {
        return (undefined)
    } else {
        detectOverlaps(schedules);
        return (schedules.map((s, i)=>{return (
            <Grid container alignItems="top">
                <Grid item xs={2}>
                    {Array.isArray(s.schedule)?s.schedule.map(h=>formatHour(h)).join(":"):<pre>{JSON.stringify(schedules)}</pre>}
                </Grid>
                <Grid item xs={8}>
                    <Slider 
                        className={classes.slider}
                        value={s.schedule}
                        onChange={(o, v)=>{
                            const newS = {...s}
                            newS.schedule = v;
                            const newSchedule = [...schedules];
                            newSchedule[i] = newS;
                            onChange(newSchedule);
                        }}
                        aria-labelledby="range-slider"
                        valueLabelDisplay={"off"}
                        marks={marks}
                        set={1}
                        step={null}
                        min={0}
                        max={23}
                        disabled={disabled}
                    />
                </Grid>
                <Grid item xs={1}>
                    <Button disabled={disabled} onClick={()=>{
                        const newSchedule = [...schedules];
                        newSchedule.splice(i, 1);
                        onChange(newSchedule);
                    }}>
                      Remove
                    </Button>
                </Grid>         
            </Grid>
        );}
    ))
}};

function DisabledSlider(props) {
    const {onAdd} = props;
    const classes=useStyles();
    return (
    <Grid container alignItems="center">
        <Grid item xs={2}>

        </Grid>
        <Grid item xs={8}>
        <Slider 
            className={classes.slider}
            aria-labelledby="range-slider"
            value={[9,17]}
            marks={marks}
            set={1}
            step={null}
            min={0}
            max={23}
            disabled={true}
        />
    </Grid>
    <Grid item xs={2}>
        <Button onClick={onAdd}>
          Add
        </Button>
    </Grid>         
</Grid>);
}

export default function DaySlider(props) {
    const classes=useStyles();
    const {label= "defaultText", onChange= ()=>{}, schedule=[], disabled=false, setDisabled=()=>{}} = props;
    
    const sliders = createSliders({schedules:schedule, onChange, classes} );
      return (
      <Grid container alignItems="top" spacing={2} className={classes.root}>
        <Grid item xs={2}>
        <Typography variant="body" className={classes.label} >
            {label}
          </Typography>

        </Grid>
        <Grid item xs={10}>
            {sliders}
            <DisabledSlider onAdd={()=>{
                const newSchedule = [...schedule];
                newSchedule.push({schedule:[9,17]});
                onChange(newSchedule);
            }
            }/>
        </Grid>
    </Grid>
  
  )}