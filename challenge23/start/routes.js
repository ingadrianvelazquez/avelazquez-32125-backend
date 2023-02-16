"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.on("/").render("welcome");

/* products */
Route.group(() => {
  Route.get("/:id?", "ProductController.get");
  Route.post("/", "ProductController.insert");
  Route.put("/:id", "ProductController.update");
  Route.delete("/:id?", "ProductController.delete");
}).prefix("api/products");

/* cart */
Route.group(() => {
  Route.get("/:id?", "CartController.get");
  Route.post("/", "CartController.insert");
  Route.post("/:id/products", "CartController.update");
  Route.delete("/:id?", "CartController.delete");
  Route.delete("/:id/products/:id_prod", "CartController.deleteProduct");
}).prefix("api/cart");

/* users */
Route.group(() => {
  Route.get("/:id?", "UserController.get");
  Route.post("/", "UserController.insert");
  Route.put("/:id", "UserController.update");
  Route.delete("/:id?", "UserController.delete");
}).prefix("api/users");

/* messages */
Route.group(() => {
  Route.get("/:id?", "MessageController.get");
  Route.post("/", "MessageController.insert");
  Route.put("/:id", "MessageController.update");
  Route.delete("/:id?", "MessageController.delete");
}).prefix("api/messages");
