import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'

import type { TypeIntroPhotoSkeleton } from './TypeIntroPhoto'
import type { TypeProjectCardSkeleton } from './TypeProjectCard'
import type { TypeProjectScopeOfWorkSkeleton } from './TypeProjectScopeOfWork'
import type { TypeProjectStandardSectionSkeleton } from './TypeProjectStandardSection'
import type { TypeProjectTypographyColorsSkeleton } from './TypeProjectTypographyColors'
import type { TypeProjectUiSubcategorySkeleton } from './TypeProjectUiSubcategory'
import type { TypeProjectWhatWeLearnedSkeleton } from './TypeProjectWhatWeLearned'
import type { TypeProjectWireframeSkeleton } from './TypeProjectWireframe'
import type { TypeProjectWorkflowSkeleton } from './TypeProjectWorkflow'
import type { TypeTestimonialSkeleton } from './TypeTestimonial'

export interface TypeProjectFields {
	titleCaseStudy: EntryFieldTypes.Symbol
	projectCard: EntryFieldTypes.EntryLink<TypeProjectCardSkeleton>
	introCaption: EntryFieldTypes.RichText
	scopeOfWork?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeProjectScopeOfWorkSkeleton>>
	introPhoto?: EntryFieldTypes.EntryLink<TypeIntroPhotoSkeleton>
	challengesTitle?: EntryFieldTypes.Symbol
	challengesText?: EntryFieldTypes.RichText
	challengesImage?: EntryFieldTypes.AssetLink
	workflowTitle: EntryFieldTypes.Symbol
	workflowItems?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeProjectWorkflowSkeleton>>
	personasTitle?: EntryFieldTypes.Symbol
	personasText?: EntryFieldTypes.RichText
	personasImages?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>
	sitemapTitle?: EntryFieldTypes.Symbol
	sitemapText?: EntryFieldTypes.RichText
	sitemapImageDesktop?: EntryFieldTypes.AssetLink
	sitemapImageMobile?: EntryFieldTypes.AssetLink
	wireframes?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeProjectWireframeSkeleton>>

	basicImage?: EntryFieldTypes.AssetLink
	standardSections?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeProjectStandardSectionSkeleton>>
	uiHighlightTitle?: EntryFieldTypes.Symbol
	uiHighlightDesktopImage?: EntryFieldTypes.AssetLink
	uiHighlightMobileImage?: EntryFieldTypes.AssetLink
	uiHighlightBackgroundColor?: EntryFieldTypes.Symbol
	uiSubcategories?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeProjectUiSubcategorySkeleton>>
	basicImage2?: EntryFieldTypes.AssetLink
	typographyAndColors?: EntryFieldTypes.EntryLink<TypeProjectTypographyColorsSkeleton>
	testimonial?: EntryFieldTypes.EntryLink<TypeTestimonialSkeleton>
	whatWeLearned: EntryFieldTypes.EntryLink<TypeProjectWhatWeLearnedSkeleton>
	similarProjects: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeProjectCardSkeleton>>
	metaTitle: EntryFieldTypes.Symbol
	metaDescription: EntryFieldTypes.Symbol
	metaKeywords: EntryFieldTypes.Array<EntryFieldTypes.Symbol>
	metaImage: EntryFieldTypes.AssetLink
}

export type TypeProjectSkeleton = EntrySkeletonType<TypeProjectFields, 'project'>
export type TypeProject<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<
	TypeProjectSkeleton,
	Modifiers,
	Locales
>
