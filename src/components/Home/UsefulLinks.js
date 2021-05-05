import React from "react";
import { Nav, NavLink } from "reactstrap";
export default function UsefulLinks(props) {
	return (
		<React.Fragment>
			<p style={{ height: "50px" }}></p>
			<p className="font-weight-bold">Useful Links</p>
			<Nav vertical>
				<NavLink href="https://docs.kodular.io/" target="_blank">
					Kodular Docs
				</NavLink>{" "}
				<NavLink href="https://creator.kodular.io/" target="_blank">
					Kodular Creator
				</NavLink>{" "}
				<NavLink
					href="https://developer.android.com/guide/topics/ui/layout/recyclerview"
					target="_blank"
				>
					RecyclerView
				</NavLink>{" "}
			</Nav>
		</React.Fragment>
	);
}
