import React from 'react'

import HorizontalBlackLogo from '../../../../public/logos/horizontal-black-logo.svg'
import HorizontalWhiteLogo from '../../../../public/logos/horizontal-white-logo.svg'
import VerticalBlackLogo from '../../../../public/logos/vertical-black-logo.svg'
import VerticalWhiteLogo from '../../../../public/logos/vertical-white-logo.svg'
import SquareLogo from '../../../../public/logos/square-logo.svg'

type LogoVariant =
	| 'horizontal-black'
	| 'horizontal-white'
	| 'vertical-black'
	| 'vertical-white'
	| 'square'

interface ApplicationLogoProps {
	variant?: LogoVariant
	size?: number | string
}

const ApplicationLogo: React.FC<ApplicationLogoProps> = ({
	variant = 'horizontal-black',
	size = '100%',
}) => {
	const logos: Record<LogoVariant, string> = {
		'horizontal-black': HorizontalBlackLogo,
		'horizontal-white': HorizontalWhiteLogo,
		'vertical-black': VerticalBlackLogo,
		'vertical-white': VerticalWhiteLogo,
		square: SquareLogo,
	}

	const selectedLogo = logos[variant]

	return (
		<img
			src={selectedLogo}
			alt="Good Dads logo"
			style={{
				width: typeof size === 'number' ? `${size}px` : size,
				height: 'auto',
			}} // Dynamically set width
		/>
	)
}

export default ApplicationLogo
