const mongoose = require('mongoose')

const GrocerySchema = new mongoose.Schema({
    itemName:{
        type: String,
        required: true,
    },

    itemLastPurschase: {
        type: Number,
        required: true,

    },
});

const Grocery = mongoose.model("Grocery", GrocerySchema)
module.exports = Grocery;