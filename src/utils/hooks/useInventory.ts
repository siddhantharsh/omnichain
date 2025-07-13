import { useQuery } from 'react-query';
import { fetchInventory } from '../api';

export const useInventory = () => useQuery('inventory', fetchInventory);
