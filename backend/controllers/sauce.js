const sauce = require("../models/sauce");
const sauceModel = require("../models/sauce");
const fs = require('fs');


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
            usersDisliked: [],
            userId: req.body.sauce.userId
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
 exports.displayOne = (req, res, next) => {
    //Finding specified obejct in the database
    sauceModel.findOne({
        _id: req.params.id
    //sending 'sauce' object data as response
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

/**
 * Updating sauce like info
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.changeLikeState = (req, res, next) => {  
    
    //getting current data
    sauceModel.findOne({_id: req.params.id}).then(
        (sauce) => {

            //If user unlikes or undislike (neutral state)
            if (req.body.like == 0){ 
                let newUsersLiked = [];
                let newUsersDisliked = [];

                //Updating fields to be replaced
                for (let i = 0; i < sauce.usersLiked.length; i++) {
                    if (sauce.usersLiked[i] == req.body.userId) {

                    } else {
                        newUsersLiked.push(sauce.usersLiked[i]);
                    }
                }

                //Updating fields to be replaced
                for (let i = 0; i < sauce.usersDisliked.length; i++) {
                    if (sauce.usersDisliked[i] == req.body.userId) {

                    } else {
                        newUsersDisliked.push(sauce.usersDisliked[i]);
                    }
                }

                let newLikes =  newUsersLiked.length;
                let newDislikes = newUsersDisliked.length;
                
                //Replacing fields in database
                sauceModel.findOneAndUpdate(
                    {_id: req.params.id}, 
                    {$set: {"likes": newLikes, "dislikes": newDislikes, "usersLiked": newUsersLiked, "usersDisliked": newUsersDisliked}},
                
                    //sending response back to client
                ).then(res.status(201).json({message: 'Sauce updated'}))
                .catch((error) => {res.status(404).json({error: error})})
            }

            //If user likes the sauce
            if (req.body.like == 1){
                let newUsersLiked = sauce.usersLiked;
                newUsersLiked.push(req.body.userId);
                let newLikes = newUsersLiked.length;

                //Updating database
                sauceModel.findOneAndUpdate(
                    {_id: req.params.id}, 
                    {$set: {"likes": newLikes, "usersLiked": newUsersLiked}}
                ).then(res.status(201).json({message: 'Sauce updated'}))
                .catch((error) => {res.status(404).json({error: error})})
            }

            //If user dislikes the sauce
            if (req.body.like == -1){
                let newUsersDisliked = sauce.usersDisliked;
                newUsersDisliked.push(req.body.userId);
                let newDislikes = newUsersDisliked.length;

                //Updating database
                sauceModel.findOneAndUpdate(
                    {_id: req.params.id}, 
                    {$set: {"dislikes": newDislikes, "usersDisliked": newUsersDisliked}}
                ).then(res.status(201).json({message: 'Sauce updated'}))
                .catch((error) => {res.status(404).json({error: error})})
            }
        }

    ).catch(
        (error) => {
            res.status(404).json({
            error: error
            });
        }
    )
}

/**
 * Modifies the data for specified sauce
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.modifySauce = (req, res, next) => {
    let newSauce = sauceModel({_id: req.params.id});

    //Checking if user is uploading a new image and selecting appropiate update format
    if (req.file) {

            //deleting current image from images folder
            sauceModel.findOne({_id: req.params.id})
            .then(
                (sauce) =>{
                    if (!sauce) {
                        return res.status(400).json({error: new Error('Object not found')});
                    }

                    //Checking that user is the owner/creator of the sauce to be deleted
                    if (sauce.userId !== req.auth.userId) {
                        return res.status(401).json({error: new Error('Request not Authorized')});
                    }

                    //Deleting image from images folder
                    const filename = sauce.imageUrl.split('/images/')[1];
                    fs.unlink('images/' + filename, () => {
                        
                    });
                }
            ).catch(
                (error) => {
                    res.status(400).json({error: error});
                }
            )

        //creating a new object URL
        const url = req.protocol + '://' + req.get('host');
        //parsing request data
        req.body.sauce = JSON.parse(req.body.sauce);
        //Creating data to be saved from request data
        newSauce = ({
            _id: req.params.id,
            name: req.body.sauce.name,
            manufacturer: req.body.sauce.manufacturer,
            description: req.body.sauce.description,
            heat: req.body.sauce.heat,
            imageUrl: url + '/images/' + req.file.filename,
            mainPepper: req.body.sauce.mainPepper,
            userId: req.body.sauce.userId
        });
    } else {
        newSauce = ({
            _id: req.params.id,
            description: req.body.description,
            heat: req.body.heat,
            mainPepper: req.body.mainPepper,
            manufacturer: req.body.manufacturer,
            name: req.body.name,
            userId: req.body.userId
        });
    }

    //Updating sauce data using data created above
    sauceModel.updateOne({_id: req.params.id}, newSauce)
    
    .then(
        () => {
            res.status(201).json({message: 'Thing updated successfully!'});
        }
    )
    
    .catch(
        (error) => {
            res.status(400).json({error: error});
        }
    );
}

/**
 * Deletes sauce from database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteSauce = (req, res, next) => {
    
    //Checking that there is such sauce in the databese
    sauceModel.findOne({_id: req.params.id})
    .then(
        (sauce) => {
            if (!sauce) {
                return res.status(400).json({error: new Error('Object not found')});
            }

            //Checking that user is the owner/creator of the sauce to be deleted
            if (sauce.userId !== req.auth.userId) {
                return res.status(401).json({error: new Error('Request not Authorized')});
            }

            //Deleting image from images folder
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink('images/' + filename, () => {
                //deleting sauce from database
                sauceModel.deleteOne({_id: req.params.id})
                .then(
                    () => {
                        res.status(200).json({message: 'Sauce deleted!'})
                    }
                )

                .catch(
                    (error) => {
                        res.status(400).json({error: error})
                    }
                );  
            });
        }
    )

    .catch(
        (error) => {
            res.status(400).json({error: error})
        }
    );  
}