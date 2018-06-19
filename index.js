const formatToken = /YYYY|MM|dd|HH?|mm?|ss?|./g;

const formatTokenFunctions = {
  YYYY: date => date.getFullYear(),
  MM: date => padded(date.getMonth() + 1),
  dd: date => padded(date.getDate()),
  HH: date => padded(date.getHours()),
  mm: date => padded(date.getMinutes()),
  ss: date => padded(date.getSeconds())
};

function isDate(input) {
  return (
    input instanceof Date ||
    Object.prototype.toString.call(input) === '[object Date]'
  );
}

function isFunction(input) {
  return (
    input instanceof Function ||
    Object.prototype.toString.call(input) === '[object Function]'
  );
}

function padded(input) {
  return ('' + input).padStart(2, '0');
}

function makeFormatFunction(format) {
  const formatTokens = format.match(formatToken);
  for (let i = 0; i < formatTokens.length; i++) {
    if (formatTokenFunctions[formatTokens[i]]) {
      formatTokens[i] = formatTokenFunctions[formatTokens[i]];
    }
  }

  return function(date) {
    let output = '';
    for (let fun of formatTokens) {
      output += isFunction(fun) ? fun(date) : fun;
    }
    return output;
  };
}

function dateFormat(date, format) {
  if (!isDate(date)) throw new Error(`'date' must be a instance of Date`);
  return makeFormatFunction(format)(date);
}

const formatted = dateFormat(new Date(), 'YYYY-MM-dd HH:mm:ss');
console.log(formatted);
