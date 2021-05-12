import React from "react";
import { useHistory } from "react-router-dom";
import {
	Container,
	Col,
	Row,
	Card,
	Breadcrumb,
	BreadcrumbItem,
	Badge,
	Spinner,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import useWave from "use-wave";

export default function Overview({ components, pageData, totalComponents }) {
	const history = useHistory();
	let wave = useWave();

	return (
		<Container>
			<React.Fragment>
				<Row>
					<Col>
						<Breadcrumb>
							<BreadcrumbItem>
								<NavLink to="/home">Home</NavLink>
							</BreadcrumbItem>
							<BreadcrumbItem active>Components</BreadcrumbItem>
						</Breadcrumb>
					</Col>
				</Row>
				<Row>
					<Col xs="12">
						<h2>Overview</h2>
						<hr />
					</Col>
					<Col>
						<p className="text-justify">{pageData.overview}</p>
					</Col>
					<Col xs="12">
						<h2>Components</h2>
						<hr />

						{components === undefined || components.length < totalComponents ? (
							<Container>
								<Row>
									<Col
										xs="12"
										className="d-flex align-items-center flex-column mt-5 pt-5"
									>
										<span className="text-dark font-weight-bold h4 text-justify">
											Loading Components
										</span>
										<Spinner color="dark" />
									</Col>
								</Row>
							</Container>
						) : (
							<React.Fragment>
								<Container>
									<Row>
										{Object.keys(components).map((key) => {
											let comp = components[key];
											let blockCount = 0;
											const blocks = comp.content.blocks;
											if (blocks.events !== undefined)
												blockCount += blocks.events.length;
											if (blocks.methods !== undefined)
												blockCount += blocks.methods.length;
											if (blocks.properties !== undefined)
												blockCount += blocks.properties.length;
											return (
												<Col xs="12" md="6" lg="4" className="mt-2" key={key}>
													<Card>
														<div
															className="container user-select-none"
															ref={wave}
															onClick={(e) => {
																setTimeout(() => {
																	history.push(`/components/${comp.title}`);
																}, 250);
															}}
														>
															<Row className="d-flex align-items-center pb-2 pt-2">
																<Col xs="auto">
																	<img
																		alt={comp.icon}
																		src={`${process.env.PUBLIC_URL}/images/icons/${comp.icon}`}
																	/>
																</Col>
																<Col className="d-flex justify-items-center flex-column">
																	<p className="m-0 ">
																		{comp.title}{" "}
																		<Badge color="secondary">
																			{blockCount}
																		</Badge>
																	</p>
																	<p className="m-0  text-muted">
																		{comp.group}
																	</p>
																</Col>
																<Col xs="auto">
																	<span className="fa fa-chevron-right text-secondary rounded p-2 bg-light" />
																</Col>
															</Row>
														</div>
													</Card>
												</Col>
											);
										})}
									</Row>
								</Container>
							</React.Fragment>
						)}
					</Col>
				</Row>
			</React.Fragment>
		</Container>
	);
}
