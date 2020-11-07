import React, {useState, Fragment} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import Typography from '@material-ui/core/Typography';
import Form from '@rjsf/material-ui';
import Grid from '@material-ui/core/Grid';
import {ErrorBoundary} from 'react-error-boundary'

function ParseFailedCard() {
        return (
        <Card style={{height:"100%"}}>
          <Typography>
            Unable to format the supplied input as JSON.<br/>            
            Please correct any errors and try again.
          </Typography>
        </Card>);
}

function ErrorFallback(props) {
  const {error, resetErrorBoundary} = props;
  return (
    <Card style={{height:"100%"}}>
      <CardContent>
        <Typography>
          Unable to render the form.
          Please correct any errors and try again.
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={resetErrorBoundary}>RESET</Button>
      </CardActions>
    </Card>);
}

/**
 * Expects props to contain an string 'code' that is parsable JSON. If not an error is displayed.
 * 
 * @param {*} props 
 */
export default function Preview(props) {
    const {code} = props;
    const [formData, setFormData] = useState({});

    let parseFailed = false;
    let parsed;
    let formatted;
    try {
      parsed = JSON.parse(code);
    } catch (error) {
         return <ParseFailedCard/>;
    }

    return (
      <Card style={{height:"100%"}}>
        <Grid container>
          <Grid item xs={12}>
            <ButtonGroup>
                <Button  onClick={()=>{console.log('show data')}}>
                  Show Data
                </Button>
                <Button onClick={()=>{setFormData({});}}>Reset Data</Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12}>
            <ErrorBoundary FallbackComponent={ErrorFallback} onReset={()=>console.log('reset!!!')}>
              <Form schema={parsed} formData={formData} onChange={e=>setFormData(e.formData)} onSubmit={()=>alert('submit!')}>
                <Fragment/> {/* disables the submit button */}
              </Form>
            </ErrorBoundary>
          </Grid>
        </Grid>
      </Card>
    );

}
    