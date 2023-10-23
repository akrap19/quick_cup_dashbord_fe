import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'

import type { TypeProjectCardSkeleton } from './TypeProjectCard'

export interface TypeTestimonialFields {
	title: EntryFieldTypes.Symbol
	text: EntryFieldTypes.Text
	author: EntryFieldTypes.Symbol
	jobTitle: EntryFieldTypes.Symbol
	authorProfile: EntryFieldTypes.AssetLink
	companyLogo?: EntryFieldTypes.AssetLink
	project?: EntryFieldTypes.EntryLink<TypeProjectCardSkeleton>
}

export type TypeTestimonialSkeleton = EntrySkeletonType<TypeTestimonialFields, 'testimonial'>
export type TypeTestimonial<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<
	TypeTestimonialSkeleton,
	Modifiers,
	Locales
>
