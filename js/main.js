define(['tokenizer', 'parser', 'evaluator'], main);

function main(tokenizer, parser, evaluator) {

  return {
    interpret: interpret,
    parse: parse
  };

  function interpret(input) {
    var parsed = _parse(input);
    var result = evaluator.evaluate(parsed);
    return result;
  }

  function parse(input) {
    return 0;
  }

  function _parse(input) {
    var tokens = tokenizer.tokenize(input);
    var parsed = parser.parse(tokens);
    return parsed;
  }
}
