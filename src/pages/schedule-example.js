import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Link from '../components/Link';
import ScheduleDialog from '../components/ScheduleDialog';
import ScheduleSummary from '../components/ScheduleSummary';
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

const defaultSchedule = [9, 17];
export default function Index() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [schedule, setSchedule] = useState({
    monday: [ {schedule:[3,4]},{schedule: defaultSchedule}, {schedule:[18,22]}],
    tuesday: [{schedule: defaultSchedule}],
    wednesday: [{schedule: defaultSchedule}],
    thursday: [{schedule: defaultSchedule}],
    friday: [{schedule: defaultSchedule}],
    saturday: [{schedule: defaultSchedule}],
    sunday: [{schedule: defaultSchedule}],
  })

  return (
    <Container maxWidth="md">
      <ScheduleDialog 
        schedule={schedule}
        open={dialogIsOpen}
        onCancel={()=>setDialogIsOpen(false)}
        onOk={(newSchedule)=>{setSchedule(newSchedule);setDialogIsOpen(false);}}/>
      <Box my={8}>
      <Link to="/">Go to the main page</Link>
        <Grid container>
          <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            Schedule Example
          </Typography>
          </Grid>
          <Card>
          <Grid container style={{padding:"10px"}}>
            <Grid item xs={9}>
              <ScheduleSummary schedule={schedule}/>
            </Grid>
            <Grid item xs={3}>
            <Button onClick={()=>setDialogIsOpen(true)}>
              Change
            </Button>
            </Grid>
          </Grid>
          </Card>
          
        </Grid>
        </Box>
    </Container>
  );
}
