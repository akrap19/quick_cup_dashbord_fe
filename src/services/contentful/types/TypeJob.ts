import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'

export interface TypeJobFields {
	title: EntryFieldTypes.Symbol
	slug: EntryFieldTypes.Symbol
	talentlyftJobId: EntryFieldTypes.Integer
	department: EntryFieldTypes.Symbol<
		'Design' | 'Development' | 'Operations' | 'Project Management' | 'Quality Assurance'
	>
	position: EntryFieldTypes.Symbol<
		| 'Android Developer'
		| 'Backend Go'
		| 'Backend Node'
		| 'Backend PHP'
		| 'Designer'
		| 'Flutter Developer'
		| 'Frontend Angular'
		| 'Frontend React'
		| 'Quality Assurance'
		| 'iOS Developer'
	>
	location: EntryFieldTypes.Symbol
	description: EntryFieldTypes.Symbol
	whatWeExpect: EntryFieldTypes.RichText
	whatYouWillDo: EntryFieldTypes.RichText
	whatWeOffer: EntryFieldTypes.RichText
}

export type TypeJobSkeleton = EntrySkeletonType<TypeJobFields, 'job'>
export type TypeJob<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<
	TypeJobSkeleton,
	Modifiers,
	Locales
>
