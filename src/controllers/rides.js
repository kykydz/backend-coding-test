'use strict';

module.exports.health = (req, res) => {
    res.send(req.headers);
};
