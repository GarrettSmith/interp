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
  var file = args[0];
  var input = '';
  require('readline').createInterface({
    input: fs.createReadStream(file),
    terminal: false
  }).on('error', function(err) {
    console.error('Failed to read \'%s\'', program.file);
    throw err;
    process.exit(1);
  }).on('line', function(line) {
    input += line + '\n';
  }).on('close', function() {
    var command = program['parse-only'] ? main.parse : main.interpret;
    var result = command(input);
    process.exit(result);
  });
});
