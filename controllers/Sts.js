var path = require('path')
  , Promise = require('bluebird')
  , aws = require('aws-sdk')
  , fs = Promise.promisifyAll(require("fs"))
  , sts = null;

class Sts {
  constructor() {
    aws.config.update({
      accessKeyId: '',
      secretAccessKey: ''
    });
    sts = Promise.promisifyAll(new aws.STS());
  }

  /*
   *  This function calls STS and returns back a token for unauthenticated users.
  */
  *getBasicToken(ctx) {
    let token = yield *sts.assumeRoleAsync();
    return token;
  }


  /*
   *  This function calls STS and returns back a token for authenticated users.
  */
  // *getAdvancedToken(ctx) {
  // }

}

module.exports = Sts;