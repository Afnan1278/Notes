// src/utils/logger.js
class Logger {
    constructor() {
      this.logs = [];
    }
  
    log(message) {
      this.logs.push(message);
      console.log(message);
    }
  
    getLogs() {
      return this.logs;
    }
  }
  
  module.exports = new Logger();
  