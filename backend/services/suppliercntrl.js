import { handleSupplierLogic } from '../routes/supplier.js'; 
import emitter from '../events/emitter.js';

export const handleRestockRequest = () => {
  emitter.on('processRestockRequest', (newRequest) => {
    console.log('Processing restock request internally:', newRequest);
    handleSupplierLogic(newRequest);
  });
};
