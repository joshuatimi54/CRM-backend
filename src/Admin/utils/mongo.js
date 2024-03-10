const mongoose = require('mongoose');

const mongoDbId = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) throw new Error('There is not found or not valid...!')
};

module.exports = mongoDbId;