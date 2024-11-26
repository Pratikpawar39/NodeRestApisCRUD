const { userPrivate } = require("./user.route.js");

const privateRoutes = {
    ...userPrivate,
}

module.exports = privateRoutes;