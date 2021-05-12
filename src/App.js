import AppBar from "./components/AppBar";
import Footer from "./components/Footer";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import React, { Component } from "react";
import Home from "./pages/Home";
import BuyNow from "./pages/BuyNow";
import Checkout from "./pages/Checkout";
import Components from "./pages/Components";
import ReactLoadingScreen from "react-loading-screen";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { AppbarProvider } from "./hooks/useAppbar";
import SnackbarProvider from "react-simple-snackbar";
import ScrollToTop from "react-scroll-to-top";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formData: {
				name: "",
				lastname: "",
				client_email: "",
				client_gdrive: "",
			},
			pages: undefined,
			components: undefined,
			pickedProducts: [],
			products: [
				{
					id: 1,
					name: "RecyclerView + Widgets",
					unit_amount: {
						currency_code: "USD",
						value: 25,
					},
					description:
						"The base extension to start using RecyclerView on Kodular.Contains all the widgets.",
					quantity: 1,
				},
				{
					id: 2,
					name: "Widget Animator",
					unit_amount: {
						currency_code: "USD",
						value: 4,
					},
					description:
						"Extension that helps to create animations with widgets. 58 total animations.",
					quantity: 1,
				},
				{
					id: 3,
					name: "Firebase Tools",
					unit_amount: {
						currency_code: "USD",
						value: 4,
					},
					description:
						"Very useful extension for FirebaseDB users, it allows to carry out advanced queries and more features.",
					quantity: 1,
				},
			],
		};
		this.setPickedProducts = this.setPickedProducts.bind(this);
		this.setFormData = this.setFormData.bind(this);
	}

	setPickedProducts(ids) {
		this.setState({ pickedProducts: ids });
	}

	setFormData(data) {
		this.setState({ formData: data });
	}

	componentDidMount() {
		fetch(`${process.env.PUBLIC_URL}/data/Pages.json`)
			.then((res) => res.json())
			.then(async (res) => {
				this.setState({ pages: res });
				let tasks = res.components.map((strComponent) => {
					return fetch(`${process.env.PUBLIC_URL}/data/${strComponent}.json`)
						.then((data) => data.json())
						.then((json) => {
							this.setState({
								components: {
									...this.state.components,
									[strComponent]: json,
								},
							});
						});
				});
				await Promise.all(tasks);
			});
	}
	render() {
		return this.state.pages === undefined ||
			this.state.components === undefined ? (
			<ReactLoadingScreen
				children={<p>We are getting the data...</p>}
				loading={true}
				bgColor="#FAFFFF"
				spinnerColor="#7D88B2"
				textColor="#7D88B2"
				text="Wait while data is loading..."
				logoSrc={`${process.env.PUBLIC_URL}/images/icon.svg`}
			/>
		) : (
			<div>
				<AppbarProvider>
					<SnackbarProvider>
						<ScrollToTop smooth />
						<div>
							<AppBar
								showSearchBar={this.state.showSearchBar}
								pickedProducts={this.state.pickedProducts}
							/>
							<TransitionGroup>
								<CSSTransition
									key={this.props.location.key}
									classNames="page"
									timeout={300}
								>
									<Switch location={this.props.location}>
										<Route exact path="/home">
											<Home pageData={this.state.pages.HomePage} />
										</Route>
										<Route
											path={["/components", "/components/:pathComponent"]}
											exact
										>
											<Components
												pageData={this.state.pages.ComponentsPage}
												groups={this.state.pages.groups}
												totalComponents={this.state.pages.components.length}
												components={this.state.components}
											/>
										</Route>
										<Route path="/buy-now" exact>
											<BuyNow
												products={this.state.products}
												pickedProducts={this.state.pickedProducts}
												setPickedProducts={this.setPickedProducts}
											/>
										</Route>
										<Route path="/buy-now/checkout" exact>
											<Checkout
												formData={this.state.formData}
												setFormData={this.setFormData}
												products={this.state.products}
												pickedProducts={this.state.pickedProducts}
												setPickedProducts={this.setPickedProducts}
											/>
										</Route>
										<Redirect to="/home" />
									</Switch>
								</CSSTransition>
							</TransitionGroup>
						</div>
					</SnackbarProvider>
				</AppbarProvider>
				<Route
					render={({ location }) => {
						return !location.pathname.includes("/components/") ? (
							<Footer />
						) : null;
					}}
				/>
			</div>
		);
	}
}

export default withRouter(App);
