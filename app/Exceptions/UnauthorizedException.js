"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");
const sentry = use("Sentry");

class UnauthorizedException extends LogicalException {
  constructor(errorMessage) {
    super(errorMessage, 401);
  }

  handle(error, { response }) {
    sentry.captureException(error);
    response.status(401).send({
      success: false,
      code: this.code,
      message: error.message,
    });
  }
}

module.exports = UnauthorizedException;
