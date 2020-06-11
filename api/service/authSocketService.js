const admin = require("firebase-admin");
require('dotenv').config();

module.exports = async (socket, next) => {
    let { token } = socket.handshake.query;

    if (!token) {
        return next(new Error("Authorization required"));
    }

    try {
        if (token !== process.env.INTERNAL_BEARER) {
            socket.user = await admin.auth().verifyIdToken(token);
        }

        return next();
    } catch (e) {
        return next(new Error("Authorization failed"));
    }
};
