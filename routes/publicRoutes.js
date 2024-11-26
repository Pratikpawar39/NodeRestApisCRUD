const { userPrivate } = require("./user.route.js");

const publicRoutes = {
    ...userPrivate,
}

module.exports = publicRoutes;