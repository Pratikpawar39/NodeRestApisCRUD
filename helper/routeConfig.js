const privateRoutes = require('../routes/privateRoutes');
const publicRoutes = require('../routes/publicRoutes');

console.log('Read routes')
const routeConfig = {
    privateRoutes,
    publicRoutes
  };

module.exports = routeConfig;