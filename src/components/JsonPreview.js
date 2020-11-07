import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

function ParseFailedCard() {
        return (
        <Card style={{height:"100%"}}>
          <Typography>
            Unable to format the supplied input as JSON.
            Please correct any errors and try again.
          </Typography>
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


    return (
      <Card style={{height:"100%"}}>
        <pre>
          {formatted}
        </pre>
      </Card>
    );

}
    