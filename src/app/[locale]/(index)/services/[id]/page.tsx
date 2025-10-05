import { getService } from 'api/services/services'
import { Service } from 'api/models/services/service'

import { ServiceDetails } from './ServiceDetails'

interface Props {
	params: {
		id: string
	}
}

const ServiceDetailsPage = async ({ params }: Props) => {
	const { data: serviceData } = await getService(params.id)
	const service = serviceData.service as Service

	return <ServiceDetails service={service} />
}

export default ServiceDetailsPage
