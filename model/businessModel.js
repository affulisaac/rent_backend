const mongoose = require('mongoose')

const businessSchema = mongoose.Schema({


    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
    }, 
    owner: {
        type: String,
        required: true,
    },
    client_id: {
        type: String,
        required: true,
    },
},
{
    timestamps: true
}
) 
module.exports = mongoose.model('Business', businessSchema)