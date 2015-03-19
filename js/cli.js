var requirejs = require('requirejs');
var program = require('commander');
var fs = require('fs');

requirejs.config({
  nodeRequire: require
});

program
  .version('0.0.1')
  .usage('[options] <file>')
  .option('-P, --parse-only', 'Only prase the given file');

// fall through to repl
var args = process.argv.slice(2);
if (!args.length) {
  console.error('REPL unimplemented!');
  program.outputHelp();
  process.exit(1);
}

program.parse(process.argv);

requirejs(['main'], function(main) {
  var input;
  try {
    var file = args[0];
    input = readInputFile(file);
  } catch(err) {
    console.error('Failed to read \'%s\'', program.file);
    process.exit(1);
  }
  var command = program['parse-only'] ? main.parse : main.interpret;
  var result = command(input);
  process.exit(result);
});

// TODO parse chunks of a file at a time
function readInputFile(file) {
  var str = '';
  fs.readFile(file, 'utf8', function(err, data) {
    if (err) throw err;
    str += data;
  });
  return str;
}
