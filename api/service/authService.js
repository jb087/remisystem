const admin = require("firebase-admin");

module.exports = async (request, response, next) => {
    let idToken = request.headers.authorization;

    if (!idToken) {
        return response.status(401).send("Authorization required");
    }

    try {
        idToken = idToken.replace("Bearer ", "");

        request.user = await admin.auth().verifyIdToken(idToken);
        return next();
    } catch (e) {
        return response.status(401).send("Authorization failed");
    }
};
