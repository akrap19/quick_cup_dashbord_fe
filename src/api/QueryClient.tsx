import { QueryClient } from 'react-query'

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			notifyOnChangeProps: 'tracked',
			staleTime: 60000,
			retry: false
		}
	}
})
