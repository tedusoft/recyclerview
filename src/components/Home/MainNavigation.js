import React from "react";
import Scrollspy from "react-scrollspy";
import { HashLink } from "./HashNavigator";
import { Nav, NavItem } from "reactstrap";
export default function MainNavigation(propss) {
	return (
		<React.Fragment>
			<p style={{ height: "50px" }}></p>
			<p className="ml-3 font-weight-bold">Home</p>
			<Nav vertical>
				<Scrollspy
					items={["introduction", "getin", "screenshots"]}
					currentClassName="nav-section-active"
					scrolledPastClassName="nav-section-inactive"
					offset={-100}
					style={{ listStyle: "none" }}
				>
					<NavItem className="nav-section-active">
						<HashLink className="text-dark nav-link" to="#introduction">
							Introduction
						</HashLink>
					</NavItem>
					<NavItem className="d-md-none">
						<HashLink className="text-dark nav-link" to="#buy-now">
							Buy now
						</HashLink>
					</NavItem>
					<NavItem>
						<HashLink className="nav-link text-dark" to="#screenshots">
							Screenshots
						</HashLink>
					</NavItem>
				</Scrollspy>
			</Nav>
		</React.Fragment>
	);
}
