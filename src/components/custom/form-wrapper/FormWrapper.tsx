import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import { Columns } from '@/components/layout/columns'
import { Divider } from '@/components/layout/divider'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { Text } from '@/components/typography/text'
import { ReactNode } from 'react'

interface FormWrapperProps {
	children: ReactNode
	formSchema: z.ZodObject<any>
	defaultValues?: any
	onSubmit: (data: any) => Promise<void>
}

export const FormWrapper = ({ children, formSchema, defaultValues, onSubmit }: FormWrapperProps) => {
	const t = useTranslations()

	const form = useForm<any>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues
	})

	return (
		<Box padding={10} width="100%">
			<Box
				padding={6}
				style={{ maxWidth: '50rem' }}
				backgroundColor="neutral.50"
				border="thin"
				borderColor="neutral.300">
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<Stack gap={6}>
							<Text fontSize="small" color="destructive.500">
								{t('General.requiredFieldWarning')}
							</Text>
							<Columns gap={6}>{children}</Columns>
							<Divider />
							<Inline gap={4}>
								<Button variant="secondary">{t('General.cancel')}</Button>
								<Button type="submit">{t('General.save&Add')}</Button>
							</Inline>
						</Stack>
					</form>
				</FormProvider>
			</Box>
		</Box>
	)
}
