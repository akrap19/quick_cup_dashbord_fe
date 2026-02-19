'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

import { FormControl } from '@/components/inputs/form-control'
import { SearchDropdown } from '@/components/custom/search-dropdown/SearchDropdown'
import { RequiredLabel } from '@/components/inputs/required-label'
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
	customerId: requiredString.shape.scheme,
	serviceLocationId: z.string().optional()
})

type Step1Schema = z.infer<typeof step1Schema>

interface Props {
	customers: Base[]
	acquisitionType: AcquisitionTypeEnum
	serviceLocations?: Base[]
}

export const Step1ClientSelection = ({ customers, acquisitionType, serviceLocations = [] }: Props) => {
	const t = useTranslations()
	const router = useRouter()
	const searchParams = useSearchParams()
	const { getCustomerId, setCustomerId, getServiceLocationId, setServiceLocationId } = useOrderWizardStore()
	const customerId = getCustomerId(acquisitionType)
	const serviceLocationId = getServiceLocationId(acquisitionType)
	const { data: session } = useSession()
	const isAdmin = useHasRoleAccess([UserRoleEnum.ADMIN, UserRoleEnum.MASTER_ADMIN])
	const currentUserId = session?.user?.userId
	const isDisabled = !isAdmin

	const form = useForm<Step1Schema>({
		mode: 'onChange',
		resolver: zodResolver(step1Schema),
		defaultValues: {
			customerId: customerId || (currentUserId && !isAdmin ? currentUserId : undefined),
			serviceLocationId: serviceLocationId || undefined
		}
	})

	useEffect(() => {
		if (!isAdmin && currentUserId && !customerId) {
			form.setValue('customerId', currentUserId)
			setCustomerId(currentUserId, acquisitionType)
			// Update URL with customerId for server component access
			const params = new URLSearchParams(searchParams.toString())
			params.set('customerId', currentUserId)
			router.replace(`?${params.toString()}`, { scroll: false })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAdmin, currentUserId, acquisitionType, router, searchParams])

	// Sync form with store values (for edit mode)
	useEffect(() => {
		const currentServiceLocationId = getServiceLocationId(acquisitionType)
		const formValue = form.getValues('serviceLocationId')

		if (currentServiceLocationId !== formValue && (currentServiceLocationId || formValue)) {
			form.setValue('serviceLocationId', currentServiceLocationId || undefined, { shouldValidate: false })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [serviceLocationId, acquisitionType])

	useEffect(() => {
		const subscription = form.watch(data => {
			setCustomerId(data.customerId as any, acquisitionType)
			setServiceLocationId(data.serviceLocationId || null, acquisitionType)

			// Update URL with customerId for server component access
			if (data.customerId) {
				const params = new URLSearchParams(searchParams.toString())
				params.set('customerId', data.customerId)
				router.replace(`?${params.toString()}`, { scroll: false })
			}
		})

		return () => subscription.unsubscribe()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.watch, acquisitionType, router, searchParams])

	return (
		<FormProvider {...form}>
			<Box display="flex" justifyContent="center" alignItems="center">
				<Box
					width="100%"
					display="flex"
					justifyContent="center"
					alignItems="center"
					style={{ height: 'calc(100vh - 400px)' }}>
					<Stack gap={4} alignItems="center" style={{ width: '100%', maxWidth: '420px' }}>
						<Box style={{ width: '100%', maxWidth: '320px' }}>
							<Heading variant="h3" color="neutral.900" textAlign="center">
								{t('Orders.step0Title')}
							</Heading>
						</Box>
						<Stack gap={2} style={{ width: '100%', maxWidth: '420px' }}>
							<FormControl name="customerId">
								<FormControl.Label>
									<RequiredLabel>{t('General.client')}</RequiredLabel>
								</FormControl.Label>
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
						<Stack gap={2} style={{ width: '100%', maxWidth: '420px' }}>
							<FormControl name="serviceLocationId">
								<FormControl.Label>
									<RequiredLabel>{t('Orders.dedicatedServiceLocation')}</RequiredLabel>
								</FormControl.Label>
								<SearchDropdown
									name="serviceLocationId"
									options={serviceLocations}
									placeholder={t('Orders.dedicatedServiceLocation')}
									alwaysShowSearch={true}
								/>
								<FormControl.Message />
							</FormControl>
						</Stack>
					</Stack>
				</Box>
			</Box>
		</FormProvider>
	)
}
