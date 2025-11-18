import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export function useAlbums() {
  return useQuery({
    queryKey: ['albums'],
    queryFn: async () => {
      const res = await axios.get('/api/albums');
      return res.data;
    },
  });
}
