import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_BASE_URL,
});

export interface HubInventory {
  hubId: string;
  productId: string;
  name: string;
  stock: number;
  spoilagePct: number; // 0–100
}

export interface Order {
  orderId: string;
  hubId: string;
  items: { productId: string; qty: number; }[];
  paidWithSNAP: boolean;
  status: 'pending'|'in_transit'|'delivered';
}

// Fetch all hubs’ inventory
export const fetchInventory = () => api.get<HubInventory[]>('/inventory');

// Reroute a batch from hub → food bank or other hub
export const rerouteInventory = (hubId: string, productId: string, qty: number, destination: string) =>
  api.post('/inventory/reroute', { hubId, productId, qty, destination });

// Create a new order
export const createOrder = (hubId: string, items: { productId: string; qty: number; }[], paidWithSNAP: boolean) =>
  api.post<Order>('/orders', { hubId, items, paidWithSNAP });

// Fetch delivery status for an order
export const fetchDeliveryStatus = (orderId: string) =>
  api.get<{ progress: number; mode: 'drone'|'ev'|'robot'; co2SavedKg: number }>(`/delivery/${orderId}`);

// Fetch global stats
export const fetchStats = () => api.get<{ reroutePct: number; co2Saved: number; snapUsers: number }>('/stats');
