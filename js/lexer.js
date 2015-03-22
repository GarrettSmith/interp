define(function lexer() {
  return {
    tokenize: tokenize
  };

  function tokenize(input) {
    return lex(input);
  }

  function lex(input) {
    if (input.length === 0) {
      return createToken('end');
    }
    else {
      var c = input[0];
      var cs;
      var token;
      if (isWhiteSpace(c)) {
        cs = input.slice(1);
      }
      else if (isOperator(c)) {
        token = lexOperator(c);
        cs = input.slice(1);
      }
      else if (isDigit(c)) {
        token = lexNumber(input);
        var i = (token.value + "").length;
        cs = input.slice(i);
      }
      else if (isIdentifier(c)) {
        token = lexIdentifier(input);
        cs = input.slice(token.value.length);
      } 
      else {
        throw 'Unrecogined token \'' + c + '\'';
      }
      var a = token ? [token] : [];
      return a.concat(lex(cs));
    }
  }

  function isWhiteSpace(c) { return /\s/.test(c); }
  function isOperator(c) { return /[()=,]/.test(c); }
  function isDigit(c) { return /[0-9]/.test(c); }
  function isIdentifier(c) { return !(isOperator(c) || isWhiteSpace(c)); }

  function lexOperator(input) {
    return createToken('operator', input[0]);
  }

  function lexNumber(input) {
    var str = '';
    var c = input[0];
    var i = 0;
    _lexNumber();
    if (c === '.') {
      _lexNumber();
    }
    var value = parseFloat(str);
    if (!isFinite(value)) {
      throw 'Number is too large or small for 64-bit double.';
    }
    return createToken('number', value);

    function _lexNumber() {
      do {
        str += c;
        i++;
        c = input[i];
      } while (isDigit(c))
    }
  }

  function lexIdentifier(input) {
    var value = '';
    var c = input[0];
    var i = 0;
    do {
      value += c;
      i++;
      c = input[i];
    } while(isIdentifier(c))
    return createToken('identifier', value);
  }

  function createToken(type, value) {
    return {
      type: type,
      value: value
    };
  }

});
