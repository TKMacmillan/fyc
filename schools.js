var _ = require('underscore')
  , pg = require('pg')
  , Promise = require('bluebird')
  , fs = require('fs')
  , schools = require('./data/obgSchools.js')
  , instructors = require('./data/objInstructors.js');

var states = {};
var len = schools.length;
for (var i = 0; i < len; i++) {
  var name = schools[i].school_name;
  var city = schools[i].city;
  var state = schools[i].state_province.trim();
  var country = schools[i].country;
  var schoolID = schools[i].onyx_id;
  if (typeof states[state] === 'undefined') {
    states[state] = [];
  }
  states[state].push([schoolID, name, city, state]);
}

var allStates = _.keys(states);
console.log('There are ' + allStates.length + ' states.');
var allStatesLen = allStates.length;;
for (var c = 0; c < allStatesLen; c++ ) {
  var stream = fs.createWriteStream('./data/schools/'+ allStates[c].trim() +'.js');
  var data = states[allStates[c]];
  stream.write(JSON.stringify(data));
  stream.end();
}

// console.log(schools.length);
// console.log(instructors.length);