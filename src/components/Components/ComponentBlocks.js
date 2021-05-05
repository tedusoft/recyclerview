import React, { useContext, useEffect } from "react";
import {
	Container,
	Col,
	Row,
	Breadcrumb,
	BreadcrumbItem,
	Table,
	ListGroup,
	ListGroupItem,
	Nav,
	NavItem,
} from "reactstrap";
import { Fade, Stagger } from "react-animation-components";
import { NavLink } from "react-router-dom";
import ColorPill from "./ColorPill";
import { HashLink, navTo } from "../Home/HashNavigator";
import Scrollspy from "react-scrollspy";
import { AppbarContext } from "../../hooks/useAppbar";
let navItems = ["Overview"];
export default function ComponentBlocks({ component }) {
	navItems = ["Overview"];
	let blocks = component.content.blocks;
	const { setConfig } = useContext(AppbarContext);
	useEffect(() => {
		setConfig({
			showSearchBar: true,
			onSubmit: (text) => {
				const item = navItems.filter((value) => {
					return value.toLowerCase().includes(text.toLowerCase());
				})[0];
				if (item === undefined) {
					return false;
				}
				navTo(item, 150);
				return true;
			},
			errorMessage: "Item not found.",
		});
		return () => {
			setConfig({
				showSearchBar: false,
				onSubmit: null,
			});
		};
	}, [setConfig]);
	return (
		<Container>
			<Row>
				<Col xs="12" md="9" className="mb-5 ">
					<Container className="mb-5 ">
						<Row className="mb-5 ">
							<Col xs="12">
								<Breadcrumb>
									<BreadcrumbItem>
										<NavLink to="/home" exact>
											Home
										</NavLink>
									</BreadcrumbItem>
									<BreadcrumbItem>
										<NavLink to="/components" exact>
											Components
										</NavLink>
									</BreadcrumbItem>
									<BreadcrumbItem active>{component.title}</BreadcrumbItem>
								</Breadcrumb>
							</Col>
							<Col xs="12" id="Overview">
								<h2>Overview</h2>
								<hr />
								<p className="text-justify">{component.content.overview}</p>
								{component.content.source ? (
									<a
										rel="noreferrer"
										target="_blank"
										href={component.content.source}
										className="btn btn-outline-primary mb-4"
									>
										GO TO THE SOURCE
									</a>
								) : (
									<React.Fragment />
								)}
							</Col>
							<Col xs="12">
								{blocks.events === undefined ? (
									<React.Fragment />
								) : (
									<div>
										<h2 id="Events">Events</h2>
										<hr />
										{mapBlocks(blocks.events, "Events", component.title)}
									</div>
								)}
								{blocks.methods === undefined ? (
									<React.Fragment />
								) : (
									<div>
										<h2 id="Methods">Methods</h2>
										<hr />
										{mapBlocks(blocks.methods, "Methods", component.title)}
									</div>
								)}
								{blocks.properties === undefined ? (
									<React.Fragment />
								) : (
									<div className="mb-5 pb-5">
										<h2 id="Properties">Properties</h2>
										<hr />
										{mapBlocks(
											blocks.properties,
											"Properties",
											component.title
										)}
									</div>
								)}
							</Col>
						</Row>
					</Container>
				</Col>
				<Col
					className="d-none d-md-block mt-3"
					md="3"
					style={{
						marginLeft: "-2vw",
						height: "90vh",
						width: "100%",
					}}
				>
					<div className="position-fixed">
						<p className="h5 mt-6 position-sticky">Table of contents</p>
						<Nav
							vertical
							style={{
								overflow: "scroll",
								display: "inline-block",
								height: "76vh",
							}}
						>
							<Scrollspy
								items={navItems}
								componentTag="div"
								currentClassName="nav-section-active"
								scrolledPastClassName="nav-section-inactive"
								offset={-150}
								style={{ listStyle: "none" }}
								onUpdate={(item) => {
									if (item !== undefined) {
										handleSpyChange(item);
									}
								}}
							>
								{navItems.map((item) => (
									<NavItem
										id={`${item}-nav`}
										key={`${item}-nav`}
										style={{ cursor: "pointer" }}
										className={
											item === "Events" ||
											item === "Methods" ||
											item === "Properties" ||
											item === "Overview"
												? "ml-0 font-weight-bold"
												: "ml-2"
										}
									>
										<HashLink
											to={item}
											className="nav-link text-truncate"
											offset={150}
										>
											{item}
										</HashLink>
									</NavItem>
								))}
							</Scrollspy>
						</Nav>
					</div>
				</Col>
			</Row>
		</Container>
	);
}

const handleSpyChange = ({ id }) => {
	let idFragment = navItems.filter((_item) => _item === id);
	document.getElementById(`${idFragment}-nav`).scrollIntoView();
};
const mapBlocks = (blocks, id, name) => {
	if (!navItems.includes(id)) navItems = navItems.concat(id);
	return (
		<section id={`${id}-section`}>
			<Stagger in>
				<Fade in>
					{blocks.map((block) => {
						if (!navItems.includes(block.name))
							navItems = navItems.concat(block.name);
						return (
							<div className="mb-5" id={block.name} key={block.name}>
								<h3 className="text-truncate">{block.name}</h3>
								<p className="text-justify mb-3">{block.description}</p>
								{id === "Properties" ? (
									<div
										className={`d-flex align-items-center flex-wrap ${
											block.info ? "mb-3" : "mb-5 pb-5"
										}`}
									>
										{block.paramTypes.map((type, index) => (
											<ColorPill
												type={type}
												key={`${block.name}-${type}-${index}`}
											>
												{type}
											</ColorPill>
										))}
										{block.defValue !== undefined ? (
											<ColorPill>
												<span className="font-weight-bold">Default: </span>{" "}
												{block.defValue.includes("#") ? (
													<span>
														{block.defValue}{" "}
														<span
															style={{
																backgroundColor: block.defValue,
																color: "transparent",
																border: "1px solid white",
																userSelect: "none",
															}}
														>
															{"__"}
														</span>
													</span>
												) : (
													block.defValue
												)}
											</ColorPill>
										) : (
											<React.Fragment />
										)}
										<span
											className="d-inline-block"
											style={{
												borderRadius: "3px",
												height: "5px",
												width: "20px",
												backgroundColor: "black",
												margin: "3px",
											}}
										></span>
										{block.blockTypes.map((type, index) => (
											<ColorPill
												color="#BDBDBD"
												textColor="black"
												key={`${block.name}-${type}-${index}`}
											>
												{type}
											</ColorPill>
										))}
										<span
											className="d-inline-block"
											style={{
												height: "1px",
												width: "5px",
												backgroundColor: "black",
												margin: "3px",
											}}
										></span>
										{block.presentation.map((prese, index) => (
											<ColorPill
												color="black"
												textColor="white"
												key={`${block.name}-${prese}-${index}`}
											>
												{prese}
											</ColorPill>
										))}
									</div>
								) : (
									<React.Fragment>
										<img
											style={{ overflow: "hidden" }}
											src={`/images/${name}/${block.name}.png`}
											className="img-thumbnail ml-3 mb-2"
											alt={block.name}
										/>
										{block.params === undefined ? (
											<React.Fragment />
										) : (
											<Container>
												<Row>
													<Col xs="12" md="4">
														<Table color="dark" style={{ overflow: "hidden" }}>
															<thead className="bg-secondary text-white">
																<tr>
																	<th>Params</th>
																	<th>Type</th>
																</tr>
															</thead>
															<tbody>
																{block.params.map((param) => (
																	<tr key={param.name}>
																		<th
																			className="align-middle bg-light"
																			scope="row"
																		>
																			{param.name}
																		</th>
																		<td className="align-middle">
																			<ColorPill type={param.type}>
																				{param.type}
																			</ColorPill>
																		</td>
																	</tr>
																))}
															</tbody>
														</Table>
													</Col>
												</Row>
											</Container>
										)}
									</React.Fragment>
								)}
								{block.info !== undefined ? (
									<ListGroup>
										{block.info.map((inf, index) => (
											<ListGroupItem
												className="border border-dark text-dark ml-3"
												key={`blockinfo-${index}-${block.name}`}
											>
												{inf}
											</ListGroupItem>
										))}
									</ListGroup>
								) : (
									<React.Fragment />
								)}
							</div>
						);
					})}
				</Fade>
			</Stagger>
		</section>
	);
};
