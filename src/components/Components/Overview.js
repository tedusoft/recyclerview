import React from "react";
import { useHistory } from "react-router-dom";
import {
	Container,
	Col,
	Row,
	Card,
	CardTitle,
	CardText,
	CardBody,
	Button,
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
										{Object.keys(components).map((key, index) => {
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
												<Col xs="12" md="4" key={comp.name}>
													<div ref={wave}>
														<Card
															onClick={(e) => {
																setTimeout(() => {
																	history.push(`/components/${comp.title}`);
																}, 250);
															}}
														>
															<CardBody>
																<CardTitle tag="h5">
																	{comp.title}{" "}
																	<Badge color="secondary">{blockCount}</Badge>
																</CardTitle>
																<hr />
																<CardText
																	className="text-justify"
																	style={{
																		display: "block",
																		textOverflow: "ellipsis",
																		wordWrap: "break-word",
																		overflow: "hidden",
																		maxHeight: "5.5em",
																		lineHeight: "1.5em",
																	}}
																>
																	{comp.content.overview}
																</CardText>
																<Button outline className="w-100">
																	GO TO BLOCKS
																</Button>
															</CardBody>
														</Card>
													</div>
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
