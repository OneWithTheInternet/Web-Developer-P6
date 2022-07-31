const sauceModel = require("../models/sauce");

/* Responds by sending back all the sauce type items in the database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.sendAll = (req, res, next) => {
    res.status(200).json({message: 'test successful'});
}