"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");

class NotFoundException extends LogicalException {
  constructor(errorMessage) {
    super(errorMessage, 404);
  }

  handle(error, { response }) {
    response.status(404).send({
      success: false,
      code: this.code,
      message: error.message
    });
  }
}

module.exports = NotFoundException;
