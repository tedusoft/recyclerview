import React from "react";
import { Button } from "reactstrap";
export default function CartButton({ productID, onChange, checked }) {
	const toggle = (_) => {
		onChange(productID);
	};
	return (
		<Button onClick={toggle} outline={!checked} className="w-100 mx-0">
			<span
				className={
					checked
						? "fa fa-cart-arrow-down text-white"
						: "fa fa-cart-plus text-primary"
				}
			></span>{" "}
			{checked ? "REMOVE" : "ADD"}
		</Button>
	);
}
