import { useQuery } from '@tanstack/react-query';

export function useUser() {
  const user = useQuery({
    queryKey: ['user'],
    queryFn: () => fetch('/api/user').then(r => r.json()),
  });

  return user;
}
