import React, {useState, Fragment} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import Typography from '@material-ui/core/Typography';
import Form from '@rjsf/material-ui';
import Grid from '@material-ui/core/Grid';
import {ErrorBoundary} from 'react-error-boundary'
import { DialogContent } from '@material-ui/core';

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
          <pre>{error.message}</pre>
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
 * If the parsed input contains a field called 'schema' this (and option uiSchema field) will be passed to the Form as the schema and uiSchema props.
 * If the input does not include a field called 'schema' the entire object is passed to as the schema prop.
 * 
 * @param {*} props 
 */
export default function Preview(props) {
    const {code} = props;
    const [formData, setFormData] = useState({});
    const [showDialog, setShowDialog] = useState(false)

    let parsed;
    try {
      parsed = JSON.parse(code);
    } catch (error) {
         return <ParseFailedCard/>;
    }

    // Little hack here to support entering just a schema
    // or an object that contains a schema+uiSchema
    let schema, uiSchema;
    if (parsed.schema) {
      schema = parsed.schema;
      uiSchema = parsed.uiSchema;
    } else {
      schema = parsed;
    }

    return (
      <div style={{height:"100%"}}>
        <Dialog open={showDialog} onClose={()=>setShowDialog(false)}>
          <DialogTitle>
            Form Data
          </DialogTitle>
          <DialogContent>
            <pre>{JSON.stringify(formData, null, 3)}</pre>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>setShowDialog(false)}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <Grid container direction="column" justify="space-between">
          <Grid item>
            <ButtonGroup>
                <Button  onClick={()=>setShowDialog(true)}>
                  Show Data
                </Button>
                <Button onClick={()=>{setFormData({});}}>Reset Data</Button>
            </ButtonGroup>
          </Grid>
          <Grid item>
            <ErrorBoundary FallbackComponent={ErrorFallback} onReset={()=>console.log('reset!!!')}>
              <Form 
                schema={schema}
                uiSchema={uiSchema}
                formData={formData}
                liveValidate
                onChange={e=>setFormData(e.formData)}
              >
                <Fragment/> {/* disables the submit button */}
              </Form>
            </ErrorBoundary>
          </Grid>
        </Grid>
      </div>
    );

}
    