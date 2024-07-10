import { getServerSession } from 'next-auth/next'

import { authOptions } from 'app/api/auth/[...nextauth]/auth'

import { CaseFilesAdd } from './CaseFilesAdd'

const CaseFilesAddPage = async () => {
	const session = await getServerSession(authOptions)

	return <CaseFilesAdd barnahus={session?.user.barnahusRoles[0]} />
}

export default CaseFilesAddPage
