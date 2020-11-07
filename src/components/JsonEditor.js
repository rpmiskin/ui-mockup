import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

function defaultOnChange(){};


export default function Editor(props) {
    const {code, onChange=defaultOnChange} = props;
    const [instance, setInstance] = useState(undefined);

    return (<Grid container>
                <Grid item xs={12}>
                    <ButtonGroup>
                        <Button disabled={!instance} onClick={()=>alert('Format')}>Format</Button>
                        <Button disabled>Clear</Button>
                    </ButtonGroup>
                </Grid>
                <Grid item xs={12}>
                    <CodeMirror
                        style={{height:"100%"}}
                        ref={setInstance}
                        value={code}
                        options={{
                        // theme: 'monokai',
                        keyMap: 'sublime',
                        mode: 'json',
                        lint: true,
                        foldGutter: true
                        }}
                        onChange={(instance)=>{onChange(instance.getValue())}}
                    />
                </Grid>
            </Grid>);

}
    