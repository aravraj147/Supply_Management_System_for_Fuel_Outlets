import express from 'express';
import RestockRequest from '../models/restock.js';
import Branch from '../models/branch.js';
import { getIO } from '../socket.js';
import emitter from '../events/emitter.js';

const restock = express.Router();

emitter.on('lowStockAlert', async (data) => {
  console.log("Low Stock Alert Entered", data);
  const { branch_id, fuelType, requested_quantity } = data;

  try {
    const branch = await Branch.findOne({ branch_id });
    if (!branch) {
      console.error('Branch not found for ID:', branch_id);
      return;
    }

    const newRequest = new RestockRequest({
      branch_id,
      fuelType,
      requested_quantity,
      status: "pending",
    });

    await newRequest.save();

    emitter.emit('processRestockRequest', newRequest);

    const io = getIO();
    io.emit('newRestockRequest', newRequest);
    console.log('New restock request created and emitted:', newRequest);
  } catch (error) {
    console.error('Error creating restock request from low stock alert:', error);
  }
});

restock.post('/', async (req, res) => {
  const { branch_id, fuelType, requested_quantity } = req.body;

  if (!branch_id || !fuelType || !requested_quantity) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {

    const branch = await Branch.findOne({ branch_id });
    if (!branch) {
      return res.status(404).json({ message: 'Branch not found.' });
    }

    const newRequest = new RestockRequest({
      branch_id,
      fuelType,
      requested_quantity,
      status: "pending",
    });

    await newRequest.save();

    emitter.emit('processRestockRequest', newRequest);

    const io = getIO();
    io.emit('newRestockRequest', newRequest);

    res.status(201).json(newRequest);
  } catch (error) {
    console.error('Error creating restock request:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

restock.get('/', async (req, res) => {
  try {
    const requests = await RestockRequest.find();
    res.json(requests);
  } catch (error) {
    console.error('Error fetching restock requests:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

export default restock;
