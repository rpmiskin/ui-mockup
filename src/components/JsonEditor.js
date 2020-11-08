import React from 'react';
import {ControlledEditor as MonacoEditor} from '@monaco-editor/react';

export default function Editor(props) {
    const {code="", onChange=()=>{}} = props;
    function handleEditorChanges(ev, value) {
        onChange(value);
    }
    return <MonacoEditor language="json" value={code} onChange={handleEditorChanges} />;
}