import React, { useState } from 'react';
import SNAPToggle from './SNAPToggle';

interface Product {
  productId: string;
  name: string;
  stock: number;
}

interface OrderFormProps {
  products: Product[];
  onSubmit: (items: { productId: string; qty: number }[], paidWithSNAP: boolean) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ products, onSubmit }) => {
  const [quantities, setQuantities] = useState<{ [id: string]: number }>({});
  const [paidWithSNAP, setPaidWithSNAP] = useState(false);

  const handleQtyChange = (productId: string, qty: number) => {
    setQuantities((prev) => ({ ...prev, [productId]: qty }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const items = products
      .filter((p) => quantities[p.productId] > 0)
      .map((p) => ({ productId: p.productId, qty: quantities[p.productId] }));
    if (items.length > 0) {
      onSubmit(items, paidWithSNAP);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-2xl p-6 space-y-6">
      <h2 className="text-xl font-semibold mb-2">Order Products</h2>
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.productId} className="flex items-center justify-between">
            <span className="text-wmt-dark font-medium">{product.name}</span>
            <input
              type="number"
              min={0}
              max={product.stock}
              value={quantities[product.productId] || ''}
              onChange={(e) => handleQtyChange(product.productId, Number(e.target.value))}
              className="w-20 border border-wmt-gray-100 rounded px-2 py-1 text-right"
              placeholder="0"
            />
            <span className="text-wmt-gray-500 text-sm ml-2">in stock: {product.stock}</span>
          </div>
        ))}
      </div>
      <div>
        <SNAPToggle value={paidWithSNAP} onChange={setPaidWithSNAP} />
      </div>
      <button
        type="submit"
        className="bg-wmt-blue hover:bg-wmt-dark text-white px-6 py-2 rounded-lg font-semibold mt-2"
      >
        Place Order
      </button>
    </form>
  );
};

export default OrderForm;
