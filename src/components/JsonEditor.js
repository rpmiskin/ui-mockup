import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import ReactCodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/edit/matchbrackets';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

function defaultOnChange(){};


/*
 * TODO list...
 * - JSON lint support
 * - clear functionality
 * 
 */

export default function Editor(props) {
    const {code, onChange=defaultOnChange} = props;
    const [instance, setInstance] = useState(undefined);

    return (<Grid container>
                <Grid item xs={12}>
                    <ButtonGroup>
                        <Button disabled={!instance} onClick={()=>{
                            try {
                                const rawText=instance.editor.getValue();
                                const jsonObj = JSON.parse(rawText);
                                const formatted = JSON.stringify(jsonObj, null, 2);
                                instance.editor.setValue(formatted);
                            } catch (error) {
                                // TODO Snackbar on error?
                                console.log(error.message, error.stack);
                            }
                        }}>Format</Button>
                        <Button disabled onClick={()=>{
                            // TODO Implement Clear functionality
                        }}>Clear</Button>
                    </ButtonGroup>
                </Grid>
                <Grid item xs={12}>
                    <ReactCodeMirror
                        style={{height:"100%"}}
                        ref={setInstance}
                        value={code}
                        options={{
                        keyMap: 'sublime',
                        mode: 'json',
                        lint: true,
                        foldGutter: true,
                        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
                        }}
                        onChange={(instance)=>{onChange(instance.getValue())}}
                    />
                </Grid>
            </Grid>);

}
    