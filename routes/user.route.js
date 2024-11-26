const userPrivate = {
    'GET /getUsers': 'UserController.get',
    'POST /createUser': 'UserController.create',
    'POST /updateUser': 'UserController.edit',
    'POST /deleteUser': 'UserController.remove',
  };
  const userPublic = userPrivate;
  module.exports = {
    userPublic,
    userPrivate,
  };