import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";

import "./sass/app.scss";

class App extends React.Component {
  state = {
    html: "",
    css: "",
    js: ""
  };

  componentDidUpdate() {
    this.runCode();
  }

  runCode = () => {
    const { html, css, js } = this.state;

    const iframe = this.refs.iframe;

    const iframeContent = iframe.contentDocument;

    const buildContents = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
      <style>
        ${css}
      </style>
    </head>
    <body>
      ${html}

      <script type="text/javascript">
        ${js}
      </script>
    </body>
    </html>
    `;

    iframeContent.open();
    iframeContent.write(buildContents);
    iframeContent.close();
  };

  render() {
    const { html, css, js } = this.state;

    const codeMirrorConfig = {
      theme: "material",
      lineNumbers: true,
      scrollbarStyle: null,
      lineWrapping: true
    };

    return (
      <div className="App">
        <section className="playground">
          <div className="code-editor html-code">
            <div className="editor-header">HTML</div>
            <CodeMirror
              value={html}
              options={{
                mode: "htmlmixed",
                ...codeMirrorConfig
              }}
              onBeforeChange={(editor, data, html) => {
                this.setState({ html });
              }}
            />
          </div>
          <div className="code-editor css-code">
            <div className="editor-header">CSS</div>
            <CodeMirror
              value={css}
              options={{
                mode: "css",
                ...codeMirrorConfig
              }}
              onBeforeChange={(editor, data, css) => {
                this.setState({ css });
              }}
            />
          </div>
          <div className="code-editor js-code">
            <div className="editor-header">JS</div>
            <CodeMirror
              value={js}
              options={{
                mode: "javascript",
                ...codeMirrorConfig
              }}
              onBeforeChange={(editor, data, js) => {
                this.setState({ js });
              }}
            />
          </div>
        </section>
        <section className="preview">
          <iframe title="Preview" className="iframe" ref="iframe"></iframe>
        </section>
      </div>
    );
  }
}

export default App;
