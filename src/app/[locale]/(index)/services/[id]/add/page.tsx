import ServiceLocationAdd from './ServiceLocationAdd'

interface Props {
	params: {
		id: string
	}
}

const ServiceLocationAddPage = ({ params }: Props) => {
	return <ServiceLocationAdd serviceId={params.id} />
}

export default ServiceLocationAddPage
