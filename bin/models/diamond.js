const mongoose = require('mongoose');

const diamondSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    styleNumber: {
        type: String,
        uppercase: true
    },
    images: {
        main: {
            type: String,
        },
        white: {
            type: String,
        },
        yellow: {
            type: String,
        },
        rose: {
            type: String,
        }
    },
    diamondWeight: {
        type: Number
    },
    diamondCount: {
        type: Number
    },
    goldWeight: {
        type: Number
    },
    designDetails: {
        new: {
            type: Boolean
        },
        featured: {
            type: Boolean
        },
        highestSelling: {
            type: Boolean
        },
        fancyDiamond: {
            type: Boolean
        }
    },
    company: {
        type: String,
        uppercase: true
    },
    favouriteCount: {
        type: Number,
        default: 0
    }

});


module.exports = mongoose.model('Diamond',diamondSchema);