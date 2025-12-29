import RentAdd from './RentAdd'
import { getAllServicesPrices } from 'api/services/services'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { getClients } from 'api/services/clients'
import { getServiceLocations } from 'api/services/serviceLocations'
import { Base } from 'api/models/common/base'
import { ServiceLocation } from 'api/models/service-locations/serviceLocation'

const RentAddPage = async () => {
	const servicesPrices = await getAllServicesPrices(AcquisitionTypeEnum.RENT)
	const { data: clientsData } = await getClients({ search: '', page: 1, limit: 300 })

	const users: Base[] =
		clientsData?.users?.map((client: any) => ({
			id: client.userId,
			name: client.name
		})) || []

	// Fetch service locations for all services
	let serviceLocations: Base[] = []
	if (servicesPrices && servicesPrices.length > 0) {
		try {
			const allLocations: Base[] = []
			await Promise.all(
				servicesPrices.map(async (service: any) => {
					try {
						const serviceId = service.serviceId || service.id
						if (serviceId) {
							const response = await getServiceLocations({
								search: '',
								serviceId: serviceId,
								page: 1,
								limit: 100
							})

							if (response?.data?.serviceLocations) {
								const locations: Base[] = response.data.serviceLocations.map((loc: ServiceLocation) => ({
									id: loc.id || '',
									name: `${loc.city} - ${loc.address}`,
									serviceId: serviceId
								}))
								allLocations.push(...locations)
							}
						}
					} catch (error) {
						console.error(`Error fetching service locations for service ${service.serviceId || service.id}:`, error)
					}
				})
			)
			serviceLocations = allLocations
		} catch (error) {
			console.error('Error fetching service locations:', error)
		}
	}

	return <RentAdd servicesPrices={servicesPrices} users={users} serviceLocations={serviceLocations} />
}

export default RentAddPage
