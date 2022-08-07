const jwt = require('jsonwebtoken');

/**
 * Authenticates every request made after user is logged in
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = (req, res, next) => {
    try{

        //Extracting token token from request's header
        const token = req.headers.authorization.split(' ')[1];
        //Verifying token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_KEY');
        //Extrating user id from token
        const userId = decodedToken.userId;
        //Passing UserId to the next middleware
        req.auth = {userId: userId};

        //verifying user id
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            //Passing authorization
            next();
        }

    } catch {
        res.status(401).json({error: 'invalid request'});
    }
};