import { getServerSession } from 'next-auth/next'

import { authOptions } from 'app/api/auth/[...nextauth]/auth'

import PractitionerAdd from './PractitionerAdd'

const PractitionerAddPage = async () => {
	const session = await getServerSession(authOptions)

	return <PractitionerAdd barnahus={session?.user.barnahusRoles[0]} />
}

export default PractitionerAddPage
