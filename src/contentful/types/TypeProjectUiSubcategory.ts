import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'

export interface TypeProjectUiSubcategoryFields {
	project: EntryFieldTypes.Symbol
	title: EntryFieldTypes.Symbol
	text: EntryFieldTypes.RichText
	imageDesktop?: EntryFieldTypes.AssetLink
	imageMobile?: EntryFieldTypes.AssetLink
	imageBackgroundColor?: EntryFieldTypes.Symbol
}

export type TypeProjectUiSubcategorySkeleton = EntrySkeletonType<TypeProjectUiSubcategoryFields, 'projectUiSubcategory'>
export type TypeProjectUiSubcategory<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<
	TypeProjectUiSubcategorySkeleton,
	Modifiers,
	Locales
>
