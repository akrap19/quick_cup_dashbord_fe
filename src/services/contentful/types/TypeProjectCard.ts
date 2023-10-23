import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'

export interface TypeProjectCardFields {
	position?: EntryFieldTypes.Integer
	title: EntryFieldTypes.Symbol
	slug: EntryFieldTypes.Symbol
	description: EntryFieldTypes.Text
	image: EntryFieldTypes.AssetLink
	imageBackgroundColor?: EntryFieldTypes.Symbol
	topics: EntryFieldTypes.Array<EntryFieldTypes.Symbol>
	showOnHomepage?: EntryFieldTypes.Boolean
	technology?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>
}

export type TypeProjectCardSkeleton = EntrySkeletonType<TypeProjectCardFields, 'projectCard'>
export type TypeProjectCard<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<
	TypeProjectCardSkeleton,
	Modifiers,
	Locales
>
