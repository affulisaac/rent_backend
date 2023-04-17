const mongoose = require('mongoose')

const tenantSchema = mongoose.Schema({
 
    name: {
        type: String,
        required: [ true, 'Name is required']
    },
    nationality: {
        type: String,
        required: [ true, 'Nationality is required']
    },
    contact_number: {
        type: String,
        required: [ true, 'Phone number is required']
    },
    email: {
        type: String,
        required: [ true, 'Email description is required']
    }, 
    national_id: {
        type: String,
        required: [true, 'National ID is required' ]
    }, 
    occupation: {
        type: String,
        required: [true, 'Occupation is required' ]
    }, 
    emergency_contact: {
        type: String,
        required: [ true, 'Emergency number is required']
    }, 
    emergency_contact_name: {
        type: String,
        required: [true, 'Emergency contact name is required']
    },
    rent_start_date: {
        type: String,
        required: [true, 'Rent start date required']
    },

    rent_end_date: {
        type: String,
        required: [true, 'Rent end date required']
    },
    amount_per_month: {
        type: String,
        required: [true, 'Amount per month is required']
    },
    total_amount: {
        type: String,
        required: false
    },

    appartment_number: {
        type: String,
        required: true,
    },

    // property: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: false,
    //     ref: 'Property'
    // },

},
{
    timestamps: true
}
) 
module.exports = mongoose.model('Tenant', tenantSchema)