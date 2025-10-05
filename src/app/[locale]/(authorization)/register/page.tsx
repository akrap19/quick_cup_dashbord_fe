import { getEmail } from 'api/services/auth'

import Register from './Register'

interface Props {
	searchParams: {
		uid: string
	}
}

const RegisterPage = async ({ searchParams }: Props) => {
	const uid = searchParams.uid?.split('/')[0]
	const response = await getEmail(uid)

	return <Register uid={searchParams.uid} status={response.code} email={response.data} />
}

export default RegisterPage
