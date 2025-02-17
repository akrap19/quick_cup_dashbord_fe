'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey/Actions'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useManageContentSelection } from '@/store/manage-content-selection'
import { useStepsStore } from '@/store/steps'
import { About } from 'api/models/content/about'

import { SelectContentItem } from './SelectContentItem'
import { AboutTemplate } from 'api/models/template/aboutTemplate'
import { Heading } from '@/components/typography/heading'

interface Props {
	defaultAbouts?: About[]
}

const formSchema = z.object({
	items: z.array(
		z.object({
			aboutId: z.string(),
			includeAudio: z.boolean(),
			includeDescription: z.boolean(),
			includeImage: z.boolean(),
			includeImages: z.boolean()
		})
	)
})

type Schema = z.infer<typeof formSchema>

export const SelectBarnahusContent = ({ defaultAbouts }: Props) => {
	const { abouts, setAbouts } = useManageContentSelection()
	const { currentStep, setCurrentStep } = useStepsStore()
	const t = useTranslations()
	const defaultValues = {
		items: abouts
			? abouts?.map((aboutTemplate: AboutTemplate) => ({
					aboutId: aboutTemplate?.aboutId,
					includeAudio: aboutTemplate?.includeAudio,
					includeDescription: aboutTemplate?.includeDescription,
					includeImage: aboutTemplate?.includeImage,
					includeImages: aboutTemplate?.includeImages
				}))
			: defaultAbouts?.map((about: About) => ({
					aboutId: about.aboutId,
					includeAudio: false,
					includeDescription: false,
					includeImage: false,
					includeImages: false
				}))
	}

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues
	})

	const formData = form?.getValues()

	const onSubmit = async () => {
		setAbouts(formData?.items)
		if (currentStep) {
			setCurrentStep(currentStep + 1)
		}
	}

	const handleBack = async () => {
		setAbouts(formData?.items)
		if (currentStep) {
			setCurrentStep(currentStep - 1)
		}
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
						{defaultAbouts && defaultAbouts?.length > 0 ? (
							defaultAbouts?.map((about: About, i: number) => (
								<SelectContentItem data={about} form={form} index={i} hideDivider={defaultAbouts?.length === i + 1} />
							))
						) : (
							<Box width="100%" display="flex" justify="center" style={{ height: '400px' }}>
								<Stack gap={4} justifyContent="center" alignItems="center">
									<Heading color="neutral.800" variant="h2" lineHeight="medium">
										{t('CaseJourney.noContentTitle')}
									</Heading>
									<Text color="neutral.800" lineHeight="xlarge" textAlign="center">
										{t('CaseJourney.noContentDescription')}
									</Text>
								</Stack>
							</Box>
						)}
					</Stack>
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
				</Box>
				<Actions customHandleBack={handleBack} />
			</form>
		</FormProvider>
	)
}
