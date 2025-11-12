import { getService } from 'api/services/services'

import ServiceEdit from './ServiceEdit'

interface Props {
	params: {
		id: string
	}
}

const ServiceEditPage = async ({ params }: Props) => {
	const { data: serviceData } = await getService(params.id)

	return <ServiceEdit service={serviceData} />
}

export default ServiceEditPage
