import express from 'express';
import Branch from '../models/branch.js';
import emitter from '../events/emitter.js';
import { getIO } from '../socket.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const branches = await Branch.find();
    // If no branches found
    if (!branches.length) {
      return res.status(404).json({ message: 'No branches found' });
    }
    res.json(branches);
  } catch (error) {
    console.error('Error fetching branches:', error.message);
    res.status(500).json({ error: 'Failed to fetch branches' });
  }
});

const updateStock = async (transaction) => {
  try {

    const branch = await Branch.findOne({ branch_id: transaction.branch_id });
    if (!branch) {
      throw new Error('Branch not found');
    }

    if (transaction.fuelType === 'petrol') {
      branch.stock_levels.petrol -= transaction.quantity;
    } else if (transaction.fuelType === 'diesel') {
      branch.stock_levels.diesel -= transaction.quantity;
    } else if (transaction.fuelType === 'cng') {
      branch.stock_levels.cng -= transaction.quantity;
    }

    await branch.save();

    const io = getIO();
    io.emit('UpdatedStock', {
      branch_id: branch.branch_id,
      fuel_type: transaction.fuelType,
      stock_levels: branch.stock_levels,
    });

    const Stock_threshold = 100;

    const currentStock = branch.stock_levels[transaction.fuelType];
    if (currentStock < Stock_threshold) {
      emitter.emit('lowStockAlert', {
        branch_id: branch.branch_id,
        fuelType: transaction.fuelType,
        requested_quantity: Stock_threshold * 10,
      });
    }
  } catch (error) {
    console.error('Error updating stock:', error);
  }
};

emitter.on('newTransactionCreated', updateStock);

export default router;
