import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {days} from './ScheduleComponent';

const isEqual = require('lodash.isequal');
const sameTimeEveryDay = "Your task is scheduled to run at the same time every day.";
const differentTimesEveryDay = "Your task is scheduled to run everyday but at different times.";
const sameTimeSomeDays = (numDays)=> `Your task is scheduled to at the same time on ${numDays} days.`;
const oneDay = (day)=>`Your task is scheduled to only run on ${day[0]}.`;
const twoDays = (day)=>`Your task is scheduled to on ${day[0]} and ${day[1]}.`;
const threeDays = (day)=>`Your task is scheduled to only run on ${day[0]}, ${day[1]} and ${day[2]}.`;
const mixture = "Your task is scheduled to run at various times on various days.";
const none = "Your task is not scheduled to run.";

// const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }



function checkRunningDays (schedule) {
    let x = [];
    days.forEach((d) => {
        if (schedule[d]) {
            if (Array.isArray(schedule[d]) && schedule[d].length!=0) {
                x.push(d);
            }
        }
    })
    return x;
}

function sameTime(schedule) {
    const days = checkRunningDays(schedule);
    if (days.length === 1) {
        return true;
    }
    // Compare every schedule to the first, if any differ then they're not
    // all the same.
    for (let i = 1 ; i < days.length; i++){
        if (!isEqual(schedule[days[0]], schedule[days[i]])){
            return false;
        }
    }
    return true;
}


export default function ScheduleSummary(props) {
    const {schedule} = props;
    let text = mixture;

    const runningDays = checkRunningDays(schedule);

    switch (runningDays.length) {
        case 7:
            if (sameTime(schedule)) {
                text = sameTimeEveryDay;
            } else {
                text = differentTimesEveryDay;
            }
            break;
        case 0:
            text = none;
            break;
        case 1:
            text = oneDay(runningDays);
            break
        case 2:
            text = twoDays(runningDays);
            break
        case 3:
            text = threeDays(runningDays);
            break
        default:
            if (sameTime(schedule)){
                text = sameTimeSomeDays(runningDays.length);
            } else {
                text = mixture;
            }
   
    }

    return (<Typography>{text}</Typography>)
}