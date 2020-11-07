import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Form from '@rjsf/material-ui';
import {ErrorBoundary} from 'react-error-boundary'

function ParseFailedCard() {
        return (
        <Card style={{height:"100%"}}>
          <Typography>
            Unable to format the supplied input as JSON.
            Please correct any errors and try again.
          </Typography>
        </Card>);
}

const schema = {
  title: "Todo",
  type: "object",
  required: ["title"],
  properties: {
    title: {type: "string", title: "Title", default: "A new task"},
    done: {type: "boolean", title: "Done?", default: false}
  }
};

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

    let parseFailed = false;
    let parsed;
    let formatted;
    try {
      parsed = JSON.parse(code);
      formatted = JSON.stringify(parsed, null, 3)
    } catch (error) {
         return <ParseFailedCard/>;
    }

    console.log(code);


    return (
      <Card style={{height:"100%"}}>
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={()=>console.log('reset!!!')}>
          <Form schema={parsed}/>
        </ErrorBoundary>
      </Card>
    );

}
    