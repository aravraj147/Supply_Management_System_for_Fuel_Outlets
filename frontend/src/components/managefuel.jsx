import React from 'react';
import FuelTransactions from './Transactions.js';
import ManageFuelStocks from './Managestocks.js'; 

const ManageFuel = () => {
    return (
        <div>
            <ManageFuelStocks /> {}
            <FuelTransactions /> {}
        </div>
    );
};

export default ManageFuel;
