const mongoose = require('mongoose')

const appartmentSchema = mongoose.Schema({
 
    name: {
        type: String,
        required: [ true, 'Appartment title is required']
    },
    rooms: {
        type: Array,
    },
    description: {
        type: String,
        required: [ true, 'Appartment description is required']
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Property'
    },
    tenant: {
        type: Array,
        required: false
    }
},
{
    timestamps: true
}
) 
module.exports = mongoose.model('Appartment', appartmentSchema)