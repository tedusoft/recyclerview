import React from "react";
import { useParams } from "react-router-dom";
import ComponentBlocks from "../components/Components/ComponentBlocks";
import Overview from "../components/Components/Overview";
import "./Components.scss";
import { Alert, Container, Row } from "reactstrap";
const Components = function ({ components, pageData, totalComponents }) {
	const { pathComponent } = useParams();
	if (pathComponent === undefined) {
		return (
			<Overview
				components={components}
				pageData={pageData}
				totalComponents={totalComponents}
			/>
		);
	} else {
		let component = components[pathComponent];
		if (component === null || component === undefined) {
			return (
				<Container className="mt-5 pt-5">
					<Row>
						<Alert color="warning" role="alert" className="pb-5 mb-5 col-12">
							<h4 className="alert-heading">
								<span className="fa fa-exclamation-circle text-warning"></span>{" "}
								Error 404
							</h4>
							<p>Invalid component: Component not found.</p>
							<hr />
							<p className="mb-0">
								Try selecting another component from the menu
							</p>
						</Alert>
					</Row>
				</Container>
			);
		}
		return <ComponentBlocks component={component} />;
	}
};

export default Components;
