var _ = require('underscore')
  , pg = require('pg')
  , Promise = require('bluebird')
  , fs = require('fs')
  , schools = require('./data/obgSchools.js')
  , instructors = require('./data/objInstructors.js');

var states = {};
var len = instructors.length;
for (var i = 0; i < len; i++) {
  console.log(i);
  var index = _.findIndex(schools, { onyx_id: instructors[i].school_id });
  if (index !== -1) {
    var instructorID = instructors[i].id;
    var instructorName = instructors[i].name;
    var schoolName = instructors[i].school_name;
    var state = schools[index].state_province;
    if (typeof states[state] === 'undefined') {
      states[state] = [];
    }
    states[state].push([instructorID, instructorName, schoolName, instructors[i].school_id]);
  }
}

var allStates = _.keys(states);
console.log('There are ' + allStates.length + ' states.');
var allStatesLen = allStates.length;;
for (var c = 0; c < allStatesLen; c++ ) {
  var stream = fs.createWriteStream('./data/instructors/'+ allStates[c].trim() +'.js');
  var data = states[allStates[c]];
  stream.write(JSON.stringify(data));
  stream.end();
}
// console.log(schools.length);
// console.log(instructors.length);