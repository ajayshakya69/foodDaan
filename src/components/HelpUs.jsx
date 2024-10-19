import React, { useState } from 'react';

function App() {
    const [upiId, setUpiId] = useState('');
    const [netBankingAccount, setNetBankingAccount] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleUPIPayment = async () => {
        const response = await fetch('http://localhost:5000/upi-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ upiId, amount }),
        });
        const data = await response.json();
        setMessage(data.message);
    };

    const handleNetBankingPayment = async () => {
        const response = await fetch('http://localhost:5000/net-banking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ accountNumber: netBankingAccount, amount }),
        });
        const data = await response.json();
        setMessage(data.message);
    };

    return (
        <div className="App flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Payment Gateway</h1>

                <div className="payment-form mb-6">
                    <h2 className="text-xl font-semibold mb-3">UPI Payment</h2>
                    <input
                        type="text"
                        placeholder="Enter UPI ID"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                    />
                    <input
                        type="number"
                        placeholder="Enter Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                    />
                    <button
                        onClick={handleUPIPayment}
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Pay with UPI
                    </button>
                </div>

                <div className="payment-form mb-6">
                    <h2 className="text-xl font-semibold mb-3">Net Banking Payment</h2>
                    <input
                        type="text"
                        placeholder="Enter Account Number"
                        value={netBankingAccount}
                        onChange={(e) => setNetBankingAccount(e.target.value)}
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                    />
                    <input
                        type="number"
                        placeholder="Enter Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                    />
                    <button
                        onClick={handleNetBankingPayment}
                        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
                    >
                        Pay with Net Banking
                    </button>
                </div>

                <p className="text-center text-red-500">{message}</p>
            </div>
        </div>
    );
}

export default App;
