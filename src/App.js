import AppBar from "./components/AppBar";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import React, { Component } from "react";
import Home from "./pages/Home";
import BuyNow from "./pages/BuyNow";
import Components from "./pages/Components";
import ReactLoadingScreen from "react-loading-screen";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { AppbarProvider } from "./hooks/useAppbar";
import SnackbarProvider from "react-simple-snackbar";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pages: undefined,
			components: undefined,
		};
	}

	componentDidMount() {
		fetch("/data/Pages.json")
			.then((res) => res.json())
			.then((res) => {
				this.setState({ pages: res });
				const promises = res.components.map((strComponent) => {
					return fetch(`/data/${strComponent}.json`)
						.then((res) => res.json())
						.then((res) => {
							return this.setState({
								components: { ...this.state.components, [strComponent]: res },
							});
						});
				});
				return Promise.all(promises);
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
				logoSrc="/images/icon.svg"
			/>
		) : (
			<div>
				<AppbarProvider>
					<SnackbarProvider>
						<AppBar showSearchBar={this.state.showSearchBar} />
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
											totalComponents={this.state.pages.components.length}
											components={this.state.components}
										/>
									</Route>
									<Route path="/buy-now" exact>
										<BuyNow />
									</Route>
									<Redirect to="/home" />
								</Switch>
							</CSSTransition>
						</TransitionGroup>
					</SnackbarProvider>
				</AppbarProvider>
			</div>
		);
	}
}

export default withRouter(App);
