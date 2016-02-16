'use strict';

var ____Class0=React.Component;for(var ____Class0____Key in ____Class0){if(____Class0.hasOwnProperty(____Class0____Key)){FindYourCourse[____Class0____Key]=____Class0[____Class0____Key];}}var ____SuperProtoOf____Class0=____Class0===null?null:____Class0.prototype;FindYourCourse.prototype=Object.create(____SuperProtoOf____Class0);FindYourCourse.prototype.constructor=FindYourCourse;FindYourCourse.__superConstructor__=____Class0;
  function FindYourCourse(props) {
    this.state = {
      abbr: '',
      selectedInstitutionID: null,
      selectedCity: '',
      filteredCities: [],
      institutions: [],
      filteredInstitutions: [],
      instructors: [],
      filteredInstructors: [],
      instructor: '',
      institution: ''
    }
    // this.handleCityInput = this.handleCityInput.bind(this);
    this.handleStateInput = this.handleStateInput.bind(this);
    this.handleInstitutionInput = this.handleInstitutionInput.bind(this);
    this.handleInstructorInput = this.handleInstructorInput.bind(this);
    // this.handleCitySelect = this.handleCitySelect.bind(this);
    this.handleInstitutionSelect = this.handleInstitutionSelect.bind(this);
    this.handleInstructorSelect = this.handleInstructorSelect.bind(this);
  }
  Object.defineProperty(FindYourCourse.prototype,"handleInstructorSelect",{writable:true,configurable:true,value:function(e) {
    this.refs.Instructor.value = e.currentTarget.value;
  }});
  Object.defineProperty(FindYourCourse.prototype,"handleInstitutionSelect",{writable:true,configurable:true,value:function(e) {
    this.refs.Institution.value = e.currentTarget.value;
    this.refs.Teacher.className = 'instructor invisible';
    this.refs.SchoolLoader.className = 'spinner';
    this.setState({
      selectedInstitutionID: e.currentTarget.id.substring(1)
    });
    this.refs.InstitutionList.className = 'hidden';
    var fycComp = this;
    var request = new XMLHttpRequest();
    request.open('GET', 'http://d8b3y5yr7qfjx.cloudfront.net/instructors216/'+this.state.abbr+'.js', true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        fycComp.setState({
          instructors: data,
          filteredInstructors: []
        });
        fycComp.refs.SchoolLoader.className = 'spinner hidden';
        fycComp.refs.Teacher.className = 'instructor';
        fycComp.refs.Instructor.focus();
      }
      else {
        fycComp.refs.SchoolLoader.className = 'spinner hidden';
        alert('Houston, we have a problem.');
      }
    };
    request.onerror = function() {
      fycComp.refs.SchoolLoader.className = 'spinner hidden';
      alert('Houston, we have a problem.');
    };
    request.send();
  }});
  /*
  handleCitySelect(e) {
    this.refs.City.value = e.currentTarget.value;
    this.setState({
      selectedCity: e.currentTarget.value,
    });
    this.refs.CityList.className = 'hidden';
    this.refs.School.className = 'school';
    this.refs.Institution.focus();
  }
  */
  Object.defineProperty(FindYourCourse.prototype,"handleStateInput",{writable:true,configurable:true,value:function(e) {
    this.refs.StateLabel.className = (this.refs.State.value !== '')? 'stuck': '';
    var locale = e.nativeEvent.target[e.nativeEvent.target.selectedIndex].value;
    if (locale !== this.state.abbr) {
      // this.refs.City.value = '';
      this.refs.Institution.value = '';
      this.refs.InstitutionList.className = 'hidden';
      this.refs.Instructor.value = '';
      this.refs.InstructorList.className = 'hidden';
      // this.refs.CityField.className = 'field city invisible';
      this.refs.School.className = 'school invisible';
      this.refs.Teacher.className = 'instructor invisible';
      this.refs.StateLoader.className = 'spinner';
      this.setState({
        abbr: locale
      });
      var fycComp = this;
      var request = new XMLHttpRequest();
      request.open('GET', 'http://d8b3y5yr7qfjx.cloudfront.net/schools216/' + locale + '.js', true);
      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          var data = JSON.parse(request.responseText);
          fycComp.setState({
            institutions: data,
            filteredCities: [],
            filteredInstitutions: [],
            filteredInstructors: []
          });
          fycComp.refs.StateLoader.className = 'spinner hidden';
          // fycComp.refs.CityField.className = 'field city';
          // fycComp.refs.City.focus();
          fycComp.refs.School.className = 'school';
          fycComp.refs.Institution.focus();
        }
        else {
          fycComp.refs.StateLoader.className = 'spinner hidden';
          alert('Houston, we have a problem.');
        }
      };
      request.onerror = function() {
        fycComp.refs.StateLoader.className = 'spinner hidden';
        alert('Houston, we have a problem.');
      };
      request.send();
    }
  }});
  /*
  handleCityInput(e) {
    var cName = (this.refs.City.value !== '')? 'stuck': '';
    this.refs.CityLabel.className = cName;
    var schoolArray = [];
    var cityArray = [];
    if (cName === 'stuck' && this.refs.City.value.length > 2) {
      this.refs.CityList.className = '';
      this.refs.Institution.value = '';
      this.refs.Instructor.value = '';
      var ri = new RegExp(e.nativeEvent.target.value, 'i');
      for (var i = 0; i < this.state.institutions.length; i++) {
        if (ri.test(this.state.institutions[i][2])) {
          schoolArray.push(this.state.institutions[i]);
          if (cityArray.indexOf(this.state.institutions[i][2].trim().toLowerCase()) === -1) {
            cityArray.push(this.state.institutions[i][2].trim().toLowerCase());
          }
        }
      }
    }
    else {
      this.refs.CityList.className = 'invisible';
      this.refs.School.className = 'invisible';
      this.refs.Teacher.className = 'invisible';
    }
    this.setState({
      filteredCities: cityArray,
      filteredInstitutions: schoolArray
    });
    this.refs.InstitutionList.className = 'invisible';
  }
  */
  Object.defineProperty(FindYourCourse.prototype,"handleInstitutionInput",{writable:true,configurable:true,value:function(e) {
    var cName = (this.refs.Institution.value !== '')? 'stuck': '';
    this.refs.InstitutionLabel.className = cName;
    var newArray = [];
    if (cName === 'stuck' && this.refs.Institution.value.length > 2) {
    // if (cName === 'stuck' && this.refs.Institution.value.length > 0) {
      this.refs.InstitutionList.className = '';
      this.refs.Instructor.value = '';
      this.refs.InstructorList.className = 'hidden';
      var data = (this.state.filteredInstitutions.length > 0 && e.nativeEvent.target.value.indexOf(this.state.institution) === 0)? this.state.filteredInstitutions: this.state.institutions;
      var ri = new RegExp(e.nativeEvent.target.value, 'i');
      for (var i = 0; i < data.length; i++) {
        if (ri.test(data[i][1])) {
          newArray.push(data[i]);
        }
      }
    }
    else {
      this.refs.InstitutionList.className = 'hidden';
    }
    this.setState({
      filteredInstitutions: newArray,
      institution: e.nativeEvent.target.value
    });
    this.refs.Teacher.className = 'invisible';
  }});
  Object.defineProperty(FindYourCourse.prototype,"handleInstructorInput",{writable:true,configurable:true,value:function(e) {
    var cName = (this.refs.Instructor.value !== '')? 'stuck': '';
    this.refs.InstructorLabel.className = cName;
    var newArray = [];
    var data = (this.state.filteredInstructors.length > 0 && e.nativeEvent.target.value.indexOf(this.state.instructor) === 0)? this.state.filteredInstructors: this.state.instructors;
    if (cName === 'stuck' && this.refs.Instructor.value.length > 2) {
    // if (cName === 'stuck' && this.refs.Instructor.value.length > 0) {
      var ri = new RegExp(e.nativeEvent.target.value, 'i');
      this.refs.InstructorList.className = '';
      for (var i = 0; i < data.length; i++) {
        if(this.state.selectedInstitutionID === data[i][2] && ri.test(data[i][1])) {
          newArray.push(data[i]);
        }
      }
    }
    else {
      this.refs.InstructorList.className = 'hidden';
    }
    this.setState({
      filteredInstructors: newArray,
      instructor: e.nativeEvent.target.value
    });
  }});
  Object.defineProperty(FindYourCourse.prototype,"componentDidMount",{writable:true,configurable:true,value:function() {
    this.refs.State.focus();
  }});
  Object.defineProperty(FindYourCourse.prototype,"render",{writable:true,configurable:true,value:function() {
    var states = 'AB AR BC CT FL HI IL KY MB MI MS NC NH NM NV OK PA QC SD TX VI WI YT AK AS CA DC GA IA IN LA MD MN MT ND NJ NS NY ON PE RI SK UT VT WV AL AZ CO DE GU ID KS MA ME MO NB NE NL NT OH OR PR SC TN VA WA WY'.split(' ').sort();
    // var states = 'AB AL AS CA DC GA IA IN LA MD MN MS NC NH NM NU OH OR PR SC TN VA WA WY AE AP AZ CO DE GU ID KS MA ME MO MT ND NJ NS NV OK PA QC SD TX VI WI YT AK AR BC CT FL HI IL KY MB MI MP NB NE NL NT NY ON PE RI SK UT VT WV'.split(' ').sort();
    var stateOptions = [];
    var noInstitutions = (this.state.filteredInstitutions.length > 0)? null: React.createElement("li", {className: "none"}, "There are no results to display");
    var noInstructors = (this.state.filteredInstructors.length > 0)? null: React.createElement("li", {className: "none"}, "There are no results to display");
    for (var i=0; i<states.length; i++) {
      stateOptions.push(React.createElement("option", {value: states[i]}, states[i]));
    }
    return (
      React.createElement("form", {id: "FindCourse"}, 
        React.createElement("h1", null, "Find Your Course"), 
        React.createElement("div", {className: "location", ref: "Location"}, 
          React.createElement("div", {className: "field state"}, 
            React.createElement("div", {id: "StateLoader", ref: "StateLoader", className: "spinner hidden", "aria-hidden": "true"}), 
            React.createElement("label", {for: "States", ref: "StateLabel"}, "State"), 
            React.createElement("select", {id: "States", ref: "State", onChange: this.handleStateInput}, 
              React.createElement("option", {disabled: true, selected: true}), 
               stateOptions 
            )
          )
          /*
          <div className="field city invisible" ref="CityField">
            <label for="City" ref="CityLabel">City (3 letter min.)</label>
            <input type="text" id="City" ref="City" onChange={this.handleCityInput} />
          </div>
          <ul className="invisible" ref="CityList" id="CityList">
            {
              this.state.filteredCities.map(function(city, index) {
                // var id = 'C' + city[0];
                var id = 'C' + index;
                return (
                  <li className="">
                    <input type="radio" id={id} name="city" value={city} onChange={this.handleCitySelect} />
                    <label for={id}>{city}</label>
                  </li>
                )
              }, this)
            }
            { noInstitutions }
          </ul>
          */
        ), 
        React.createElement("div", {className: "school invisible", ref: "School"}, 
          React.createElement("div", {className: "field"}, 
            React.createElement("label", {for: "Institution", ref: "InstitutionLabel"}, "Institution (3 letter min.)"), 
            React.createElement("input", {type: "text", id: "Institution", ref: "Institution", onChange: this.handleInstitutionInput}), 
            React.createElement("div", {id: "SchoolLoader", ref: "SchoolLoader", className: "spinner hidden", "aria-hidden": "true"})
          ), 
          React.createElement("ul", {className: "hidden", ref: "InstitutionList"}, 
            
              this.state.filteredInstitutions.map(function(institution, index) {
                var id = 'I' + institution[0];
                return (
                  React.createElement("li", {className: ""}, 
                    React.createElement("input", {type: "radio", id: id, name: "school", value: institution[1], onChange: this.handleInstitutionSelect}), 
                    React.createElement("label", {for: id}, institution[1])
                  )
                )
              }, this), 
            
             noInstitutions 
          )
        ), 
        React.createElement("div", {className: "instructor invisible", ref: "Teacher"}, 
          React.createElement("div", {className: "field"}, 
            React.createElement("label", {for: "Instructor", ref: "InstructorLabel"}, "Instructor (3 letter min.)"), 
            React.createElement("input", {type: "text", id: "Instructor", ref: "Instructor", onChange: this.handleInstructorInput})
          ), 
          React.createElement("ul", {className: "hidden", ref: "InstructorList", id: "InstructorList"}, 
            
              this.state.filteredInstructors.map(function(instructor, index) {
                var id = 'T' + instructor[0];
                return (
                  React.createElement("li", {className: ""}, 
                    React.createElement("input", {type: "radio", id: id, name: "teacher", value: instructor[1], onChange: this.handleInstructorSelect}), 
                    React.createElement("label", {for: id}, instructor[1])
                  )
                )
              }, this), 
            
             noInstructors 
          )
        )
      )
    );
  }});


setTimeout(function() {
  ReactDOM.render(React.createElement(FindYourCourse, null), document.getElementById('FindYourCourse'));
}, 500);