//new spawn codemirror
let editor = CodeMirror.fromTextArea(document.getElementById("scriptbox"), {
    lineNumbers: true,
    mode: "mapl",
    theme: "one-dark"
});
editor.setSize("100%", "100%");

//run script function
function runScript() {
    document.getElementById('error').style.display = "none"
    document.getElementById('tree').innerHTML = ""
    document.getElementById('tree').innerHTML = JSONTree.create(interpret(editor.getValue()))
}

function clearTree() {
    document.getElementById('tree').innerHTML = ""
}

function exportMAPL() {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(editor.getValue()));
    element.setAttribute('download', (document.getElementById("filename").value));
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

function importMAPL() {
    var input = document.getElementById("file-input");
    const file = input.files[0];

    const reader = new FileReader();
    reader.onload = function (event) {
        const contents = event.target.result;
        editor.setValue(contents);
        document.getElementById("filename").value = input.value.slice(12);
    };

    reader.readAsText(file);
}

function mobizScriptGUIDebug(error) {
    document.getElementById('error').style.display = "block"
    document.getElementById('error').innerText = (error.message + ". To access functions, branches and leaves try accessing them trough the tree object!")
}