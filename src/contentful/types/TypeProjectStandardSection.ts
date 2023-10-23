import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'

export interface TypeProjectStandardSectionFields {
	project: EntryFieldTypes.Symbol
	title: EntryFieldTypes.Symbol
	text: EntryFieldTypes.RichText
	imageDesktop: EntryFieldTypes.AssetLink
	imageMobile: EntryFieldTypes.AssetLink
	imageBackgroundColor?: EntryFieldTypes.Symbol
}

export type TypeProjectStandardSectionSkeleton = EntrySkeletonType<
	TypeProjectStandardSectionFields,
	'projectStandardSection'
>
export type TypeProjectStandardSection<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<
	TypeProjectStandardSectionSkeleton,
	Modifiers,
	Locales
>
