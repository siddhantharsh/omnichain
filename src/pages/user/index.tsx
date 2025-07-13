import React, { useState } from 'react';
import OrderForm from '../../components/OrderForm';

// Mock products for demo (replace with real data from API in future)
const mockProducts = [
  { productId: 'p1', name: 'Milk', stock: 20 },
  { productId: 'p2', name: 'Eggs', stock: 35 },
  { productId: 'p3', name: 'Bread', stock: 15 },
];

const UserOrderPage: React.FC = () => {
  const [success, setSuccess] = useState(false);

  const handleOrderSubmit = (items: { productId: string; qty: number }[], paidWithSNAP: boolean) => {
    // TODO: Call createOrder API
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-wmt-gray-100 p-8">
      <header className="bg-wmt-blue text-white rounded-2xl p-6 mb-8">
        <h1 className="text-2xl font-semibold">Order Groceries</h1>
      </header>
      <main className="max-w-xl mx-auto">
        {success && (
          <div className="mb-4 p-4 bg-wmt-accent-green text-white rounded-lg shadow">
            Order placed successfully!
          </div>
        )}
        <OrderForm products={mockProducts} onSubmit={handleOrderSubmit} />
      </main>
    </div>
  );
};

export default UserOrderPage;
