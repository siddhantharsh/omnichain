import React from 'react';
import { HubInventory } from '../utils/api';

interface InventoryTableProps {
  inventory: HubInventory[];
  onReroute: (item: HubInventory) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ inventory, onReroute }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-sm rounded-2xl p-4">
      <table className="min-w-full divide-y divide-wmt-gray-100">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-wmt-dark text-base font-semibold">Name</th>
            <th className="px-4 py-2 text-left text-wmt-dark text-base font-semibold">Stock</th>
            <th className="px-4 py-2 text-left text-wmt-dark text-base font-semibold">Spoilage %</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.productId} className="border-b last:border-0">
              <td className="px-4 py-2 text-wmt-dark">{item.name}</td>
              <td className="px-4 py-2 text-wmt-dark">{item.stock}</td>
              <td className="px-4 py-2 text-wmt-dark">{item.spoilagePct}%</td>
              <td className="px-4 py-2">
                <button
                  className="bg-wmt-accent-cyan hover:opacity-90 text-wmt-dark px-3 py-1 rounded-lg font-medium"
                  onClick={() => onReroute(item)}
                >
                  Reroute
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
