var _ = require('underscore')
  , fs = require('fs')
  , schools = require('./data/Universities.js')
  , instructors = require('./data/Instructors.js')
  , Hashids = require('hashids')
  , hashids = new Hashids('m4cm1ll4n');

var states = {};
var len = instructors.length;
for (var i = 0; i < len; i++) {
  // var index = _.findIndex(schools, { onyx_id: instructors[i].school_id });
  var index = -1;
  for (var c = 0; c < schools.length; c++) {
    if (schools[c][0] === instructors[i][3]) {
      index = c;
      break;
    }
  }
  if (index !== -1) {
    var instructorID = instructors[i][0];
    var instructorName = instructors[i][1];
    var schoolName = instructors[i][2];
    var state = schools[index][3];
    if (typeof states[state] === 'undefined') {
      states[state] = [];
    }
    states[state].push({"i": hashids.encode(parseInt(instructorID, 10)), "n": instructorName, "s": hashids.encode(parseInt(instructors[i][3], 10))});
  }
}

var allStates = _.keys(states);
console.log('There are ' + allStates.length + ' states.');
var allStatesLen = allStates.length;;
for (var c = 0; c < allStatesLen; c++ ) {
  var stream = fs.createWriteStream('./data/instructors224/'+ allStates[c].trim() +'.js');
  var data = states[allStates[c]];
  stream.write(JSON.stringify(data));
  stream.end();
}
// console.log(schools.length);
// console.log(instructors.length);