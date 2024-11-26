const { userPrivate } = require("./user.route.js");

const publicRoutes = {
    ...userPrivate,
}

console.log('Read routes pub', userPrivate)

module.exports = publicRoutes;