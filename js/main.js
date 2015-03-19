var requirejs = require('requirejs');

requirejs.config({
  nodeRequire: require
});

requirejs(['tokenizer', 'parser', 'evaluator'], main);

function main(tokenizer, parser, evaluator) {
  console.log('main');
}
