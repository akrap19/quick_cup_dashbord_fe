'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import qs from 'query-string'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Actions } from '@/components/custom/layouts/manage-journey/Actions'
import { ManageJourneyIntroWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyIntroWrapper'
import { SearchDropdown } from '@/components/custom/search-dropdown'
import { FormControl } from '@/components/inputs/form-control'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useStepsStore } from '@/store/steps'
import { requiredString } from 'schemas'
import { Templates } from 'api/models/template/templates'
import { TextInput } from '@/components/inputs/text-input'

interface Props {
	templates: Templates[]
}

const formSchema = z.object({
	template: requiredString.shape.scheme
})

type Schema = z.infer<typeof formSchema>

export const SelectTemplate = ({ templates }: Props) => {
	const { currentStep, setCurrentStep } = useStepsStore()
	const t = useTranslations()
	const { replace } = useRouter()
	const searchParams = useSearchParams()
	const currentSearchParamas = qs.parse(searchParams.toString())
	const transformedTemplateSearchData = templates?.map((template: Templates) => {
		return {
			id: template.templateId,
			name: template?.isGeneral ? template.name + ` (${t('Templates.generalTemplate')})` : template.name
		}
	})

	const handleTemplate = (value: string) => {
		const query = { ...currentSearchParamas, templateId: value }
		const url = qs.stringifyUrl(
			{
				url: window.location.href,
				query
			},
			{ skipEmptyString: true }
		)

		replace(url)
	}

	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: { template: '' }
	})

	const data = form.getValues()
	const currentTemplate = templates?.find(template => template?.templateId === data?.template)

	const onSubmit = async () => {
		handleTemplate(data.template)

		if (currentStep) {
			setTimeout(() => {
				setCurrentStep(currentStep + 1)
			}, 650)
		}
	}

	return (
		<FormProvider {...form}>
			<form style={{ width: '100%' }} onSubmit={form.handleSubmit(onSubmit)}>
				<ManageJourneyIntroWrapper>
					<Stack gap={6} alignItems="center">
						<Text fontSize="xbig" fontWeight="semibold" color="neutral.800">
							{t('CaseJourney.selectTemplate')}
						</Text>
						<Text fontSize="small" color="neutral.800" textAlign="center">
							{t('CaseJourney.selectTemplateDescription')}
						</Text>
						<Box width="100%" display="flex" flexDirection="column" gap={2}>
							<FormControl name="template">
								<SearchDropdown
									placeholder="General.template"
									options={transformedTemplateSearchData}
									alwaysShowSearch
									isFilter
								/>
							</FormControl>
							{currentTemplate?.isGeneral && (
								<FormControl name="password">
									<TextInput disabled={true} defaultValue={currentTemplate?.password} />
								</FormControl>
							)}
						</Box>
					</Stack>
				</ManageJourneyIntroWrapper>
				<Actions />
			</form>
		</FormProvider>
	)
}
