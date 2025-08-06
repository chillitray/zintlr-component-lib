/**
 * This component creates a backdrop with a blurred
 * effect and centers its children within it.
 * props - The properties of the BlurComponent.
 * props.children - The content to be rendered inside the component.
 * props.className - Additional CSS classes to be applied to the outer span element.
 * props.childClass - Additional CSS classes to be applied to the inner span element.
 * @returns {React.ReactNode}
 */
function BlurComponent({ children, className = "", childClass = "", isBlur = false }) {
	return (
		<span
			className={`${isBlur
				? `justify-left flex  items-center bg-white/30  text-xl text-text-black blur-sm ${className}`
				: ""
				}`}
		>
			<span className={`text-center ${childClass}`}>{children}</span>
		</span>
	);
}

export { BlurComponent };
