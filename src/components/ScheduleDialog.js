import React, {useState} from 'react';
import ScheduleComponent, {days} from './ScheduleComponent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function ScheduleDialog(props) {
    const { schedule, open=false, onOk=()=>{}, onCancel=()=>{}} = props;
    // Store the prop as state so we can modify it.
    const [localSchedule, setSchedule] = useState({...schedule});
    return (
        <Dialog open={open} onClose={onCancel} fullWidth>
            <DialogTitle>
                Complex Schedule
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Configure the schedule for you task here. You may choose to run the task on different days, and for different time periods on each day.
                </DialogContentText>
                <ScheduleComponent schedule={localSchedule} onChange={setSchedule}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>onOk(localSchedule)}>
                    OK
                </Button>
                <Button onClick={onCancel}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}