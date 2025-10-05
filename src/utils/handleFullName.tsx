export const handleFullName = (firstName?: string, lastName?: string) => {
	return firstName && !lastName
		? firstName
		: !firstName && lastName
			? lastName
			: firstName && lastName
				? `${firstName} ${lastName}`
				: '-'
}
