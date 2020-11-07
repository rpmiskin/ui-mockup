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
import FormPreview from '../components/JsonSchemaFormPreview'

const initialCode = {
  title: "Todo",
  type: "object",
  required: ["title"],
  properties: {
    title: {type: "string", title: "Title", default: "A new task"},
    done: {type: "boolean", title: "Done?", default: false}
  }
};

const schema = {
  "schema": {
    "title": "Todo",
    "type": "object",
    "required": [
      "title"
    ],
    "properties": {
      "title": {
        "type": "string",
        "title": "Title",
        "default": "A new task"
      },
      "done": {
        "type": "boolean",
        "title": "Done?",
        "default": false
      },
      "nested": {
        "type": "object",
        "properties": {
          "integerRange": {
            "title": "Slider",
            "type": "integer",
            "minimum": 42,
            "maximum": 100
          },
          "bar": {
            "type": "number"
          },
          "nestedDeeper": {
            "type": "object",
            "properties": {
              "foo": {
                "type": "number"
              },
              "bar": {
                "type": "number"
              }
            }
          }
        }
      }
    }
  },
  "uiSchema": {
    "nested": {
      "integerRange":{
        "ui:widget": "range"
      },
      "foo": {
        "ui:widget": "updown"
      }
    }
  }
};

const defaultSchedule = [9, 17];
export default function Index() {
  const [code, setCode] = useState(JSON.stringify(schema, null, 3));
  return (
    <Container maxWidth="lg">
      <Box my={8}>
      <Link to="/">Go to the main page</Link>
        <Grid container>
          <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            Editor Example
          </Typography>
          <Typography paragraph>
            An example JSON editor with a live updating react-jsonschema-form preview beside it.
          </Typography>
          <Typography paragraph>
            Clicking the 'SHOW DATA' button provides a preview of the data that the form would submit
            while clicking 'RESET DATA' will return to the default values.
          </Typography>
          </Grid>
          <Grid item xs={12}>

          <Grid container alignItems="stretch" justify="space-between" spacing={5} style={{ height:"600px"}}>
            <Grid item xs={6}>
              <JsonEditor
                code={code}
                onChange={(value)=>setCode(value)}
              />    
            </Grid>
            <Grid item xs={6}>
              <FormPreview code={code}/>
            </Grid>
          </Grid>

          </Grid>
          
        </Grid>
        </Box>
    </Container>
  );
}
