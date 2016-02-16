var _ = require('underscore')
  , fs = require('fs')
  , schools = require('./data/Universities.js')
  , Hashids = require('hashids')
  , hashids = new Hashids('m4cm1ll4n');

var states = {};
var len = schools.length;
for (var i = 0; i < len; i++) {
  var name = schools[i][1];
  var city = schools[i][2];
  var state = schools[i][3].trim();
  var schoolID = schools[i][0];
  if (typeof states[state] === 'undefined') {
    states[state] = [];
    console.log(state);
  }
  states[state].push([hashids.encode(parseInt(schoolID, 10)), name, city, state]);
}

var allStates = _.keys(states);
console.log('There are ' + allStates.length + ' states.');
var allStatesLen = allStates.length;;
for (var c = 0; c < allStatesLen; c++ ) {
  var stream = fs.createWriteStream('./data/schools216/'+ allStates[c].trim() +'.js');
  var data = states[allStates[c]];
  stream.write(JSON.stringify(data));
  stream.end();
}

// console.log(schools.length);