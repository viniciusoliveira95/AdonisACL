'use strict'

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
const Route = use('Route')

Route.post('users', 'UserController.store')

Route.post('sessions', 'SessionController.store')

Route.group(() => {
  Route.put('users/:id', 'UserController.update')

  Route.resource('posts', 'PostController')
    .apiOnly()
    .except(['index', 'show'])
    .middleware(['is:(administrator || moderator)'])

  Route.get('posts', 'PostController.index')
    .middleware(['can:(read_post || read_private_post)'])

  Route.get('posts/:id', 'PostController.show')
    .middleware(['can:(read_post || read_private_post)'])

  Route.resource('permissions', 'PermissionController').apiOnly()

  Route.resource('roles', 'RoleController').apiOnly()
}).middleware(['auth'])
