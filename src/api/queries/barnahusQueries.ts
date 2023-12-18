import { Barnahus } from 'api/models/barnahuses/barnahus'
import { BarnahusesQueryKeys } from 'api/queryKeys/barnahusQueryKeys'
import { getBarnahuses } from 'api/services/barnahuses'
import { useQuery, UseQueryResult } from 'react-query'

export const useBarnahuses = () => {
	const { data }: UseQueryResult<Barnahus[]> = useQuery(BarnahusesQueryKeys.GetBarnahuses, () => getBarnahuses())

	return { barnahuses: data ?? [] }
}
