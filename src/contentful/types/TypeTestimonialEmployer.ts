import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'

export interface TypeTestimonialEmployerFields {
	title: EntryFieldTypes.Symbol
	text: EntryFieldTypes.Text
	author: EntryFieldTypes.Symbol
	jobTitle: EntryFieldTypes.Symbol
	authorProfile: EntryFieldTypes.AssetLink
}

export type TypeTestimonialEmployerSkeleton = EntrySkeletonType<TypeTestimonialEmployerFields, 'testimonialEmployer'>
export type TypeTestimonialEmployer<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<
	TypeTestimonialEmployerSkeleton,
	Modifiers,
	Locales
>
