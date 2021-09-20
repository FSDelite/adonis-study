"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");

class ServerErrorException extends LogicalException {
  constructor(errorMessage) {
    super(errorMessage, 500);
  }

  handle(error, { response }) {
    response.status(500).send({
      success: false,
      code: this.code,
      message: error.message
    });
  }
}

module.exports = ServerErrorException;
