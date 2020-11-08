import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '../components/Link';

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
