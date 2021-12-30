const Sauce = require('../models/sauces');
const fs = require('fs');
const sauces = require('../models/sauces');

exports.getAllSauce = (req, res, next) => {
 
    Sauce.find().then(
        (sauces) => {
            res.status(200).json(sauces);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.dislikes = 0;
    sauce.likes = 0;
    sauce.usersLiked = [];
    sauce.usersDisliked = [];
    sauce.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
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
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
      {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
      console.log(sauceObject)
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };

exports.modifySauceLikes = (req, res, next) => {
    console.log(req.body)
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => { console.log(sauce);
        if (!sauce.usersLiked.includes(req.body.userId) && !sauce.usersDisliked.includes(req.body.userId)) {
            if (req.body.like == 1) {
                sauce.likes ++;
                sauce.usersLiked.push(req.body.userId);
            } else {
                sauce.dislikes ++;
                sauce.usersDisliked.push(req.body.userId);
            } ;
            console.log(sauce);
        } else if (sauce.usersLiked.includes(req.body.userId)) {
            for (var i = sauce.usersLiked.length - 1; i >= 0; i--) {
                if (sauce.usersLiked[i] === req.body.userId) {
                    sauce.usersLiked.splice(i, 1);
                }
               }
            sauce.likes --;
        } else {
            for (var i = sauce.usersDisliked.length - 1; i >= 0; i--) {
                if (sauce.usersDisliked[i] === req.body.userId) {
                    sauce.usersDisliked.splice(i, 1);
                }
               }
            sauce.dislikes --;
        }; 
        console.log(sauce);
        Sauce.updateOne({ _id: req.params.id }, { usersDisliked : sauce.usersDisliked, usersLiked : sauce.usersLiked, dislikes : sauce.dislikes, likes : sauce.likes, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet modifié !'}))
            .catch(error => res.status(400).json({ error }));

      })
      .catch(error => res.status(400).json({ error }));
  }; 