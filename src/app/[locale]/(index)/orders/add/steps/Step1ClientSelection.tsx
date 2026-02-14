'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'

import { FormControl } from '@/components/inputs/form-control'
import { Text } from '@/components/typography/text'
import { SearchDropdown } from '@/components/custom/search-dropdown/SearchDropdown'
import { Base } from 'api/models/common/base'
import { requiredString } from 'schemas'
import { useOrderWizardStore } from '@/store/order-wizard'
import { Box } from '@/components/layout/box'
import { useHasRoleAccess } from '@/hooks/use-has-role-access'
import { UserRoleEnum } from 'enums/userRoleEnum'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { Heading } from '@/components/typography/heading'
import { Stack } from '@/components/layout/stack'

const step1Schema = z.object({
	customerId: requiredString.shape.scheme
})

type Step1Schema = z.infer<typeof step1Schema>

interface Props {
	customers: Base[]
	acquisitionType: AcquisitionTypeEnum
}

export const Step1ClientSelection = ({ customers, acquisitionType }: Props) => {
	const t = useTranslations()
	const { getCustomerId, setCustomerId } = useOrderWizardStore()
	const customerId = getCustomerId(acquisitionType)
	const { data: session } = useSession()
	const isAdmin = useHasRoleAccess([UserRoleEnum.ADMIN, UserRoleEnum.MASTER_ADMIN])
	const currentUserId = session?.user?.userId
	const isDisabled = !isAdmin

	const form = useForm<Step1Schema>({
		mode: 'onChange',
		resolver: zodResolver(step1Schema),
		defaultValues: {
			customerId: customerId || (currentUserId && !isAdmin ? currentUserId : undefined)
		}
	})

	useEffect(() => {
		if (!isAdmin && currentUserId && !customerId) {
			form.setValue('customerId', currentUserId)
			setCustomerId(currentUserId, acquisitionType)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAdmin, currentUserId, acquisitionType])

	useEffect(() => {
		const subscription = form.watch(data => {
			setCustomerId(data.customerId, acquisitionType)
		})

		return () => subscription.unsubscribe()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.watch, acquisitionType])

	return (
		<FormProvider {...form}>
			<Box display="flex" justifyContent="center" alignItems="center">
				<Box
					width="100%"
					display="flex"
					justifyContent="center"
					alignItems="center"
					style={{ height: 'calc(100vh - 400px)' }}>
					<Stack gap={2} style={{ width: '100%', maxWidth: '420px' }}>
						<Box>
							<Heading variant="h3" color="neutral.900" textAlign="center">
								{t('Orders.step0Title')}
							</Heading>
							<Text lineHeight="xlarge" color="neutral.700" textAlign="center">
								{t('Orders.step0Description')}
							</Text>
						</Box>
						<FormControl name="customerId">
							<SearchDropdown
								name="customerId"
								options={customers}
								placeholder={t('General.client')}
								alwaysShowSearch={true}
								disabled={isDisabled}
							/>
							<FormControl.Message />
						</FormControl>
					</Stack>
				</Box>
			</Box>
		</FormProvider>
	)
}
