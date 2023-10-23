import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'

export interface TypeProjectWhatWeLearnedFields {
	project: EntryFieldTypes.Symbol
	title: EntryFieldTypes.Symbol
	text: EntryFieldTypes.RichText
	urlWebsite?: EntryFieldTypes.Symbol
	urlGooglePlay?: EntryFieldTypes.Symbol
	urlAppstore?: EntryFieldTypes.Symbol
}

export type TypeProjectWhatWeLearnedSkeleton = EntrySkeletonType<TypeProjectWhatWeLearnedFields, 'projectWhatWeLearned'>
export type TypeProjectWhatWeLearned<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<
	TypeProjectWhatWeLearnedSkeleton,
	Modifiers,
	Locales
>
