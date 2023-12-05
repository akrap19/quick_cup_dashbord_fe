import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { CaseJourneyHeader } from '@/components/custom/layouts/CaseJourneyHeader'
import { Actions } from '@/components/custom/layouts/manage-journey/Actions'
import { AudioIcon } from '@/components/icons/audio-icon'
import { Checkbox } from '@/components/inputs/checkbox'
import { FormControl } from '@/components/inputs/form-control'
import { Select } from '@/components/inputs/select'
import { Box } from '@/components/layout/box'
import { Divider } from '@/components/layout/divider'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useJourneyContentStore } from '@/store/journey-content'

const formSchema = z.object({
	caseId: z.string().min(1, { message: 'This field is required' })
})

type Schema = z.infer<typeof formSchema>

export const SelectRoomsContent = () => {
	const { setCurrentStep } = useJourneyContentStore()
	const t = useTranslations()

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: { caseId: '' }
	})

	const onSubmit = async () => {
		setCurrentStep(2)
	}

	return (
		<FormProvider {...form}>
			<form style={{ width: '100%' }} onSubmit={form.handleSubmit(onSubmit)}>
				<CaseJourneyHeader>
					{['AL-1129403', 'CaseJourney.selectRoomsContentTitle', 'CaseJourney.selectRoomsContentDescription']}
				</CaseJourneyHeader>
				<Box padding={6} borderTop="thin" borderColor="neutral.300">
					<Stack gap={4}>
						<Box style={{ maxWidth: '19rem' }}>
							<Select sizes="large" options={[]} />
						</Box>
						<Box backgroundColor="neutral.100">
							<Inline justifyContent="space-between">
								<Inline gap={4}>
									<Text fontWeight="semibold" lineHeight="xlarge" color="neutral.900" textTransform="uppercase">
										{t('General.audio')}
									</Text>
									<AudioIcon color="neutral.800" />
								</Inline>
								<FormControl name="audio">
									<Checkbox />
								</FormControl>
							</Inline>
						</Box>
						<Box paddingBottom={8}>
							<Stack gap={6}>
								<Box backgroundColor="neutral.100">
									<Stack gap={4}>
										<Inline justifyContent="space-between">
											<Text fontWeight="semibold" lineHeight="xlarge" color="neutral.900" textTransform="uppercase">
												{t('General.generalIntroduction')}
											</Text>
											<FormControl name="generalIntroduction">
												<Checkbox />
											</FormControl>
										</Inline>
										<Box paddingRight={20}>
											<Text fontSize="small" color="neutral.800">
												{t('General.placeholder')}
											</Text>
										</Box>
									</Stack>
								</Box>
								<Box backgroundColor="neutral.100">
									<Stack gap={4}>
										<Inline justifyContent="space-between">
											<Text fontWeight="semibold" lineHeight="xlarge" color="neutral.900" textTransform="uppercase">
												{t('General.photos')}
											</Text>
											<FormControl name="generalIntroduction">
												<Checkbox />
											</FormControl>
										</Inline>
										<Image
											src="https://via.placeholder.com/436x212"
											width={436}
											height={212}
											alt="https://via.placeholder.com/436x212"
										/>
									</Stack>
								</Box>
								<Box backgroundColor="neutral.100">
									<Stack gap={4}>
										<Inline justifyContent="space-between">
											<Text fontWeight="semibold" lineHeight="xlarge" color="neutral.900" textTransform="uppercase">
												{t('General.staff')}
											</Text>
											<FormControl name="generalIntroduction">
												<Checkbox />
											</FormControl>
										</Inline>
										<Box style={{ maxWidth: '26rem' }}>
											<Select sizes="large" options={[]} />
										</Box>
										<Image
											src="https://via.placeholder.com/212x212"
											width={212}
											height={212}
											alt="https://via.placeholder.com/212x212"
										/>
										<Text fontSize="small" color="neutral.800">
											Lidia Smith, Practitioner
										</Text>
									</Stack>
								</Box>
							</Stack>
						</Box>
					</Stack>
					<Divider />
				</Box>
				<Actions />
			</form>
		</FormProvider>
	)
}
