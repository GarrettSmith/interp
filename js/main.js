define(['lexer', 'parser', 'evaluator'], main);

function main(lexer, parser, evaluator) {

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
    var parsed = _parse(input);
    return 0;
  }

  function _parse(input) {
    var tokens = lexer.tokenize(input);
    console.log(tokens);
    var parsed = parser.parse(tokens);
    return parsed;
  }
}
