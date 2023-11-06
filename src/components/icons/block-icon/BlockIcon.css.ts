import { styleVariants } from '@vanilla-extract/css'

export const sizes = styleVariants({
	small: { width: '1rem', height: '1rem' },
	medium: { width: '1.25rem', height: '1.25rem' },
	large: { width: '1.5rem', height: '1.5rem' },
	xlarge: { width: '2rem', height: '2rem' }
})
