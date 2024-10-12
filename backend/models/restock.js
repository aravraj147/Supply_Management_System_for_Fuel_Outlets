import mongoose from 'mongoose';

const restockRequestSchema = new mongoose.Schema({
  branch_id: {
    type: String,
    required: true,
  },
  fuelType: {
    type: String,
    enum: ['petrol', 'diesel', 'cng'],
    required: true,
  },
  requested_quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'fulfilled'],
    default: 'pending',
  },
  expected_refill_date: {
    type: Date,
    default: null,
  },
  requested_at: {
    type: Date,
    default: Date.now,
  },
  confirmed_at: {
    type: Date,
    default: null,
  },
});

const RestockRequest = mongoose.model('RestockRequest', restockRequestSchema);

export default RestockRequest;
