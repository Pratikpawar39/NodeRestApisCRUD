const userPrivate = {
    'GET /getUsers': 'UserController.list',
    'POST /createUser': 'UserController.create',
    'POST /updateUser': 'UserController.edit',
    'POST /deleteUser': 'UserController.remove',
  };
  const userPublic = userPrivate;
  module.exports = {
    userPublic,
    userPrivate,
  };