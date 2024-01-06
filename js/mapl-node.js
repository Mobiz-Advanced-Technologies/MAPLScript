var maplscript = require("./mapl")
var yargs = require('yargs');
var fs = require('fs');
var inspect = false

var argv = yargs
    .usage('Usage: $0 <file>')
    .demandCommand(1, 'Please provide the file path')
    .help()
    .argv;
var filePath = argv._[0];

if (argv.inspect !== undefined) {
    inspect = true
}

if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    if (inspect) {
        console.log(maplscript.interpret(fileContent))
    } else {
        maplscript.interpret(fileContent)
    }
} else {
    console.error(`File does not exist at path: ${filePath}`);
}