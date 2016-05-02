GETURIRequest.decode = function() {
// retrieves GET request from URI and returns parameters as Javascript object
// each property of the object is a field passed through the URI
// each property contains an array of the values passed
// returns false if no parameters assigned
  var URIsearch = location.search,
    requestParameters = {},
    requests = [],
    i = 0,
    keyValPair = [];

  if (URIsearch.length > 1) {
    URIsearch = URIsearch.substr(1);
    URIsearch = URIsearch.split('&');

    for (i = 0; i < URIsearch.length; i++) {
      keyValPair = [];
      keyValPair = URIsearch[i].split('=');
      keyValPair[0] = decodeURIComponent(keyValPair[0]);
      keyValPair[1] = decodeURIComponent(keyValPair[1].replace(/\+/g,' '));

      if (typeof requestParameters[keyValPair[0]] == 'undefined') {
        requestParameters[keyValPair[0]] = [];
      }

      requestParameters[keyValPair[0]].push(decodeURI(keyValPair[1]));
    }

    return requestParameters;
  } else {
    return false;
  }
};

GETURIRequest.encode = function(parametersJSON, baseURL) {
// accepts object in the same format as the output of GETURIRequest.decode
// returns string that can be appended to URI
  var URIsearch = '',
    key = '',
    i = 0,
    isFirst = true;

  for (var keyArray in parametersJSON) {
    if (parametersJSON.hasOwnProperty(keyArray)) {
      key = encodeURIComponent(keyArray);

      for (i = 0; i < parametersJSON[keyArray].length; i++) {
        if (isFirst) {
          URIsearch += '?';
          isFirst = false;
        } else {
          URIsearch += '&';
        }
        URIsearch += key.replace(/ /g, '+');
        URIsearch += '=';
        URIsearch += encodeURIComponent(parametersJSON[keyArray][i]).replace(/ /g, '+');
      }
    }
  }

  return URIsearch;
};

