import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey/Actions'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useStepsStore } from '@/store/steps'
import { About } from 'api/models/content/about'
import { SelectBarnahusContentItem } from './SelectBarnahusContentItem'

interface Props {
	abouts: About[]
}

const formSchema = z.object({})

type Schema = z.infer<typeof formSchema>

export const SelectBarnahusContent = ({ abouts }: Props) => {
	const { setCurrentStep } = useStepsStore()
	const t = useTranslations()

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: { caseId: '' }
	})

	const onSubmit = async () => {
		setCurrentStep(4)
	}

	return (
		<FormProvider {...form}>
			<form style={{ width: '100%' }} onSubmit={form.handleSubmit(onSubmit)}>
				<Box paddingX={6} paddingY={8} display="flex" justify="center" width="100%">
					<Stack gap={6}>
						<Text color="neutral.800" fontSize="xbig" fontWeight="semibold" textAlign="center">
							{t('CaseJourney.selectBarnahusContentTitle')}
						</Text>
						<Box
							style={{
								maxWidth: '26rem'
							}}>
							<Text color="neutral.800" fontSize="small" textAlign="center">
								{t('CaseJourney.selectBarnahusContentDescription')}
							</Text>
						</Box>
					</Stack>
				</Box>
				<Box padding={6} borderTop="thin" borderColor="neutral.300">
					<Stack gap={6}>
						{abouts?.map((about: About, i: number) => (
							<SelectBarnahusContentItem about={about} hideDivider={abouts?.length === i + 1} />
						))}
						{/* <Box backgroundColor="neutral.100">
							<Stack gap={4}>
								<Inline justifyContent="space-between">
									<Text fontWeight="semibold" lineHeight="xlarge" color="neutral.900" textTransform="uppercase">
										{t('CaseJourney.contactInforamtion')}
									</Text>
									<FormControl name="audio">
										<Checkbox />
									</FormControl>
								</Inline>
								<ul style={{ paddingInlineStart: '1.5rem' }}>
									<Stack gap={4}>
										<Text color="neutral.800" fontSize="small">
											<li>Phone: +46 342-123-421</li>
										</Text>
										<Text color="neutral.800" fontSize="small">
											<li>email: info@barnahusstockholm.se</li>
										</Text>
										<Text color="neutral.800" fontSize="small">
											<li>website: www.barnahusstockholm.se</li>
										</Text>
										<Text color="neutral.800" fontSize="small">
											<li>address: 123 Child Haven Street, Stockholm, Sweden</li>
										</Text>
									</Stack>
								</ul>
							</Stack>
						</Box> */}
					</Stack>
				</Box>
				<Actions />
			</form>
		</FormProvider>
	)
}
