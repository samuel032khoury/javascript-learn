'use strict';

const samuel =  {
  firstName : 'Samuel',
  yearOfBirth : 2002,
  self : this,
  calAge : function() {
    console.log(this.firstName)
    const self = this
    const calAgeHelp = function(i) {
      console.log(i + self.yearOfBirth)
    }
    calAgeHelp(this.yearOfBirth)
  }
}

samuel.calAge()