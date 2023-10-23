import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'

export interface TypeProjectTypographyColorsFields {
	project: EntryFieldTypes.Symbol
	typographyImageDesktop: EntryFieldTypes.AssetLink
	typographyImageMobile: EntryFieldTypes.AssetLink
	colorsImageDesktop: EntryFieldTypes.AssetLink
	colorsImageMobile: EntryFieldTypes.AssetLink
}

export type TypeProjectTypographyColorsSkeleton = EntrySkeletonType<
	TypeProjectTypographyColorsFields,
	'projectTypographyColors'
>
export type TypeProjectTypographyColors<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<
	TypeProjectTypographyColorsSkeleton,
	Modifiers,
	Locales
>
