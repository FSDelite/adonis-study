"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/home", () => {
  return { greeting: "Hello world in JSON" };
});
Route.post("/register", "AuthController.register");
Route.post("/register/admin", "AuthController.registerAdmin")
Route.post("/authenticate", "AuthController.authenticate");

Route.group(() => {
  Route.resource("tasks", "TaskController").apiOnly();
}).middleware("auth");
Route.group(() => {
  Route.resource("users", "UserController").apiOnly();
}).middleware("auth");
Route.group(() => {
  Route.resource("refunds", "UserController").apiOnly();
}).middleware("auth");