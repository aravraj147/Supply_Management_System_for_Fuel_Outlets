import { Schema, model } from 'mongoose';

const branchSchema = new Schema({
    branch_id: {
        type: String,
        required: true,
        unique: true,
    },
    branch_name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    stock_levels: {
        petrol: {
            type: Number,
            required: true,
            default: 0
        },
        diesel: {
            type: Number,
            required: true,
            default: 0
        },
        cng: {
            type: Number,
            required: true,
            default: 0
        }
    }
});

const Branch = model('Branch', branchSchema);

export default Branch;
