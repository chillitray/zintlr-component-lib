import React from "react";

export const  ProfileWrapperCard = ({ children, className, id }) => {
	return (
		<div id={id} className={`border w-full h-fit bg-white rounded-lg`}>
			<div className={`p-3 sm:p-7  mb-2 ${className || ""}`}>{children}</div>
		</div>
	);
}

