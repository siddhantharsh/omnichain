import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@shadcn/ui';
import { HubInventory } from '../utils/api';

interface RerouteModalProps {
  open: boolean;
  item: HubInventory | null;
  destinations: { id: string; name: string; type: 'hub' | 'foodbank' }[];
  onSubmit: (qty: number, destination: string) => void;
  onClose: () => void;
}

const RerouteModal: React.FC<RerouteModalProps> = ({ open, item, destinations, onSubmit, onClose }) => {
  const [qty, setQty] = useState(1);
  const [destination, setDestination] = useState('');
  const [destinationType, setDestinationType] = useState<'hub' | 'foodbank'>('hub');

  const filteredDestinations = destinations.filter(d => d.type === destinationType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (qty > 0 && destination) {
      onSubmit(qty, destination);
    }
  };

  React.useEffect(() => {
    setQty(1);
    setDestination('');
    setDestinationType('hub');
  }, [open, item]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Reroute Inventory</DialogTitle>
        </DialogHeader>
        {item && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-wmt-dark font-medium mb-1">Product</label>
              <div className="bg-wmt-light rounded px-3 py-2">{item.name}</div>
            </div>
            <div>
              <label className="block text-wmt-dark font-medium mb-1">Quantity</label>
              <input
                type="number"
                min={1}
                max={item.stock}
                value={qty}
                onChange={e => setQty(Number(e.target.value))}
                className="w-full border border-wmt-gray-100 rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-wmt-dark font-medium mb-1">Destination Type</label>
              <select
                value={destinationType}
                onChange={e => setDestinationType(e.target.value as 'hub' | 'foodbank')}
                className="w-full border border-wmt-gray-100 rounded px-3 py-2"
              >
                <option value="hub">Hub</option>
                <option value="foodbank">Food Bank</option>
              </select>
            </div>
            <div>
              <label className="block text-wmt-dark font-medium mb-1">Destination</label>
              <select
                value={destination}
                onChange={e => setDestination(e.target.value)}
                className="w-full border border-wmt-gray-100 rounded px-3 py-2"
                required
              >
                <option value="" disabled>Select destination</option>
                {filteredDestinations.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
            <DialogFooter>
              <button
                type="submit"
                className="bg-wmt-blue hover:bg-wmt-dark text-white px-4 py-2 rounded-lg font-semibold"
              >
                Reroute
              </button>
              <button
                type="button"
                className="ml-2 bg-wmt-gray-100 text-wmt-dark px-4 py-2 rounded-lg"
                onClick={onClose}
              >
                Cancel
              </button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RerouteModal;
