import Link from "next/link";

/**
 * This function generates a customizable button component that can be rendered as a link.
 *
 * title - The text to be displayed on the button.
 * onClick - The callback function to be executed when the button is clicked. Default is an empty function.
 * className - Additional CSS classes to be applied to the button.
 * dark - A flag indicating whether the button should have a dark color scheme. Default is false.
 * href - The URL the button should link to.
 * It returns- The JSX representation of the button component.
 */
const Button = ({ title, onClick = () => { }, className = "", dark = false, href = "" }) => {
	return (
		<Link href={href} prefetch={false} legacyBehavior>
			<a
				className={`${dark
					? "bg-text-black text-[#ffffff]"
					: "bg-grayish-120 text-text-black border-text-black"
					} shadow-sm rounded-[10px] p-2 md:px-5 md:py-4 ${className} border text-xs md:text-base md:leading-4`}
				onClick={() => onClick()}
			>
				{title}
			</a>
		</Link>
	);
}

export { Button };
