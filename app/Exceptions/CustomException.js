"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");

class CustomException extends LogicalException {
  constructor(errorMessage, code) {
    super(errorMessage, 400, code);
  }
}

module.exports = CustomException;
