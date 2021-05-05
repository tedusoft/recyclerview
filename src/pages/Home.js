import React, { useState } from "react";
import { Button, Container, Row, Col, Jumbotron, Alert } from "reactstrap";
import { NavLink } from "react-router-dom";
import UsefulLinks from "../components/Home/UsefulLinks";
import MainNavigation from "../components/Home/MainNavigation";
import "./Home.scss";
import ImageGallery from "react-image-gallery";
function Home({ pageData }) {
	const [fullscreen, setFullscreen] = useState(false);
	const RoundedImage = function ({ thumbnail }) {
		return (
			<img
				alt={thumbnail}
				src={thumbnail}
				style={
					fullscreen
						? { height: "90vh", width: "100%", objectFit: "contain" }
						: { borderRadius: "20px", height: "60vh" }
				}
				loading="lazy"
			/>
		);
	};

	const imgitems = pageData.screenshots.map((imgSrc) => {
		return {
			renderItem: RoundedImage,
			thumbnail: imgSrc,
			original: imgSrc,
		};
	});
	return (
		<React.Fragment>
			<Container className="mt-2 mb-5">
				<Row>
					<Col
						className="d-none d-md-inline mt-3"
						md={{ size: 3, order: 1 }}
						lg={{ size: 2, order: 0 }}
					>
						<div className="h-100 position-sticky">
							<div className="sticky-top">
								<MainNavigation />
							</div>
						</div>
					</Col>
					<Col xs="12" md={{ size: 9 }} lg={{ size: 8 }}>
						<Container id="scrollContainer">
							<section className="nav-section">
								<span className="nav-section-span" id="introduction"></span>
								<Row>
									<Col>
										<React.Fragment>
											<h3>Introduction</h3>
											<hr />
											<Jumbotron>
												<p className="lead">
													This extension is the adaptation of the android
													RecyclerView widget.
												</p>
												<hr className="my-4" />
												<p className="text-justify d-none d-md-block">
													{pageData.summary.summary}
												</p>
												<p className="lead">
													<a
														target="_blank"
														className="btn btn-primary"
														role="button"
														href={pageData.summary.source}
														rel="noreferrer"
													>
														Learn more
													</a>
												</p>
											</Jumbotron>
											<p className="text-justify">{pageData.description}</p>
										</React.Fragment>
									</Col>
								</Row>
							</section>
							<section className="nav-section d-md-none">
								<span className="nav-section-span" id="buy-now"></span>
								<Row>
									<Col>
										<React.Fragment>
											<h3>Buy now</h3>
											<hr />
											<p>
												To start using the extension, you need to purchase it.
												After purchase you will be able to use the extension in
												any project.
											</p>
											<Alert color="info">
												Once the purchase is made, send an email to
												tedusoft@gmail.com confirming your gmail address.
												Preferably send information about the transaction.
											</Alert>

											<Container>
												<Row>
													<Col>
														<NavLink to="/buy-now">
															<Button
																name="submit"
																color="primary"
																className="w-100 mb-3 btn-lg"
															>
																<span className="fa fa-paypal"></span>
																<p className="d-inline ml-2 font-weight-bold font-italic">
																	Buy now!
																</p>
															</Button>
														</NavLink>
													</Col>
												</Row>
											</Container>
										</React.Fragment>
									</Col>
								</Row>
							</section>
							<section className="nav-section">
								<span className="nav-section-span" id="screenshots"></span>
								<Row>
									<Col>
										<React.Fragment>
											<h3>Screenshots</h3>
											<hr />
										</React.Fragment>
									</Col>
									<Col
										xs="12"
										style={{
											height: "80vh",
										}}
									>
										<ImageGallery
											items={imgitems}
											showThumbnails={!fullscreen}
											onScreenChange={(fullscreen) => {
												setFullscreen(fullscreen);
											}}
										/>
									</Col>
								</Row>
							</section>
						</Container>
					</Col>
					<Col className="d-none d-lg-inline">
						<div className="position-sticky h-100">
							<div className="sticky-top">
								<UsefulLinks />
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</React.Fragment>
	);
}
export default Home;
