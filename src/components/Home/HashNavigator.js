import React from "react";
export const navTo = (elementId, offset = 0) => {
	let scrollTop = window.scrollY;
	let element = document.getElementById(elementId.replace("#", ""));
	var elementPosition = element.getBoundingClientRect().top;
	var offsetPosition = elementPosition - offset + scrollTop;

	window.scrollTo({
		top: offsetPosition,
		behavior: "smooth",
	});
};

export function HashLink({ to, children, className, offset = 0 }) {
	return (
		<div className={`${className} nav-link`} onClick={(e) => navTo(to, offset)}>
			{children}
		</div>
	);
}
