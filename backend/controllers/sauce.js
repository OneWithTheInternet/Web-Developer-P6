const sauceModel = require("../models/sauce");


/**
 * Adds a new sauce in the database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createSauce = (req, res, next) => {
    try {
        const url = req.protocol + '://' + req.get('host');
        //parsing request data
        req.body.sauce = JSON.parse(req.body.sauce);
        //Creating data to be saved from request data
        const newSauce = new sauceModel({
            name: req.body.sauce.name,
            manufacturer: req.body.sauce.manufacturer,
            description: req.body.sauce.description,
            heat: req.body.sauce.heat,
            likes: 0,
            dislikes: 0,
            imageUrl: url + '/images/' + req.file.filename,
            mainPepper: req.body.sauce.mainPepper,
            usersLiked: [],
            usersDisliked: []
        });
        //saving data to database
        newSauce.save().then(
            () => {
                res.status(201).json({message: 'sauce created successfully'});
            }
        ).catch(
            (error) => {res.status(400).json({error: error})}
        );      

    } catch (error) {
        res.status(400).json({error: error});
    }
}

/* Responds by sending back all the sauce type items in the database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.displayAll = (req, res, next) => {
    sauceModel.find().then(
        (sauces) => {
            res.status(200).json(sauces);
        }
        ).catch(
            (error) => {
                res.status(400).json({error: error});
            }
        );
}

/**
 * Returns a single specified item/suace from the database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 exports.displayOne =(req, res, next) => {
    sauceModel.findOne({
        _id: req.params.id
    }).then(
    (sauce) => {
        res.status(200).json(sauce);
    }
    ).catch(
    (error) => {
        res.status(404).json({
        error: error
        });
    }
    );
}