import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'

export interface TypeProjectWireframeFields {
	project: EntryFieldTypes.Symbol
	title: EntryFieldTypes.Symbol
	text: EntryFieldTypes.RichText
	imageDesktop: EntryFieldTypes.AssetLink
	imageMobile: EntryFieldTypes.AssetLink
	imageBackgroundColor?: EntryFieldTypes.Symbol
}

export type TypeProjectWireframeSkeleton = EntrySkeletonType<TypeProjectWireframeFields, 'projectWireframe'>
export type TypeProjectWireframe<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<
	TypeProjectWireframeSkeleton,
	Modifiers,
	Locales
>
