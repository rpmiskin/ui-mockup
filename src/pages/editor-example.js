import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Link from '../components/Link';

import JsonEditor from '../components/JsonEditor'

import JsonPreview from '../components/JsonPreview'

const initialCode = {
  some:{
    object:{
      with:
        "nesting!"
      
    }
  }
}

const defaultSchedule = [9, 17];
export default function Index() {
  const [code, setCode] = useState(JSON.stringify(initialCode, null, 3));
  return (
    <Container maxWidth="lg">
      <Box my={8}>
      <Link to="/">Go to the main page</Link>
        <Grid container>
          <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            Editor Example
          </Typography>
          <Typography  gutterBottom>
            An example JSON editor with a live updating preview beside it.
          </Typography>
          </Grid>
          <Grid item xs={12}>
          <Card >
          <Grid container style={{padding:"10px", height:"400px"}}>
            <Grid item xs={6}>
              <JsonEditor
                code={code}
                onChange={(value)=>setCode(value)}
              />    
            </Grid>
            <Grid item xs={6}>
            <JsonPreview code={code}/>
            </Grid>
          </Grid>
          </Card>
          </Grid>
          
        </Grid>
        </Box>
    </Container>
  );
}
