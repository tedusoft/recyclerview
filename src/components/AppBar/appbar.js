import {
	Collapse,
	Navbar,
	NavbarToggler,
	Nav,
	NavItem,
	Input,
	Button,
	Row,
	Col,
	Container,
} from "reactstrap";
import "./appbar.scss";
import { NavLink } from "react-router-dom";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { AppbarContext } from "../../hooks/useAppbar";
import { withSnackbar } from "react-simple-snackbar";

class AppBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reachedTop: true,
			isOpen: false,
		};
		this.handleScroll = this.handleScroll.bind(this);
		this.toggle = this.toggle.bind(this);
		this.getNavItemClass = this.getNavItemClass.bind(this);
	}

	componentDidMount() {
		window.addEventListener("scroll", this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
	}

	handleScroll(e) {
		if (window.scrollY < 50) {
			if (this.state.reachedTop !== true)
				this.setState({
					reachedTop: true,
				});
		} else {
			if (this.state.reachedTop !== false)
				this.setState({
					reachedTop: false,
				});
		}
	}
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen,
		});
	}
	getNavItemClass(_path) {
		return this.props.location.pathname === _path ||
			this.props.location.pathname.includes(_path)
			? "nav-link text-primary"
			: "nav-link";
	}
	render() {
		return (
			<div
				className={
					"position-sticky fixed-top" +
					(this.state.reachedTop ? " bg-white" : " bg-light")
				}
				style={
					this.state.reachedTop
						? { borderBottom: "2px  solid #f5f3f4" }
						: { boxShadow: "0px 2px 5px lightGray" }
				}
				id="appBar"
			>
				<Navbar
					className="navbar-light container "
					color="none"
					light
					expand="md"
				>
					<NavLink
						className="font-weight-bold navbar-brand"
						style={{ color: "gray" }}
						to="/home"
					>
						<img
							style={{ filter: "grayscale(100%)" }}
							width="30px"
							height="30px"
							src="/images/icon.svg"
							className="mr-3 d-none d-md-inline"
							alt="Extension"
						/>
						RecyclerView docs
					</NavLink>

					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto align-items-md-center" navbar>
							<NavItem>
								<NavLink
									to="/home"
									className={this.getNavItemClass("/home")}
									activeClassName="activeNavLink"
									exact
								>
									<span className="fa fa-home"></span> Home
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									to="/guide"
									className={this.getNavItemClass("/guide")}
									activeClassName="activeNavLink"
									exact
								>
									<span className="fa fa-list-ol"></span> Guide
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									to="/components"
									className={this.getNavItemClass("/components")}
									activeClassName="activeNavLink"
									exact
								>
									<span className="fa fa-th-large"></span> Components
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									to="/buy-now"
									className={this.getNavItemClass("/buy-now")}
									activeClassName="activeNavLink"
									exact
								>
									<Button className="rounded-pill w-100">
										<span className="fa fa-paypal"></span> Buy Now
									</Button>
								</NavLink>
							</NavItem>
						</Nav>
					</Collapse>
				</Navbar>
				<SnackSearchBox />
			</div>
		);
	}
}

export class SearchBox extends React.Component {
	static contextType = AppbarContext;

	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
		};
		this.submit = this.submit.bind(this);
		this.cancelTimer = this.cancelTimer.bind(this);
		this.restoreTimer = this.restoreTimer.bind(this);
		this.timer = undefined;
	}
	componentWillUnmount() {
		this.setState({
			searchText: "",
		});
	}
	submit() {
		if (this.state.searchText.trim().length > 0) {
			if (!this.context.config.onSubmit(this.state.searchText.trim())) {
				this.props.openSnackbar(this.context.config.errorMessage);
			} else {
				this.setState({ searchText: "" });
			}
		}
	}

	cancelTimer() {
		if (this.timer !== undefined) {
			this.setState({ searchError: false });
			clearTimeout(this.timer);
			this.timer = undefined;
		}
	}

	restoreTimer() {
		this.cancelTimer();
		this.timer = setTimeout(() => {
			this.submit();
		}, 2000);
	}
	render() {
		return (
			<Container
				className={this.context.config.showSearchBar ? "d-block" : "d-none"}
			>
				<Row>
					<Col xs="12" className="mt-3 mb-3">
						<Container className="w-auto d-flex flex-row justify-content-end">
							<Row form>
								<Col
									xs="12"
									className="px-0 mx-0 position-relative d-flex justify-content-end"
								>
									<Input
										id="searchBox"
										onChange={(e) => {
											this.setState({ searchText: e.target.value });
											this.restoreTimer();
										}}
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												this.cancelTimer();
												this.submit();
											}
										}}
										value={this.state.searchText}
										placeholder="Search block..."
										className={"w-100 position-relative "}
									/>
									<Button
										className={"mx-0 h-100 "}
										onClick={() => {
											this.cancelTimer();
											this.submit();
										}}
									>
										<span className="fa fa-search"></span>
									</Button>
								</Col>
							</Row>
						</Container>
					</Col>
				</Row>
			</Container>
		);
	}
}
export const SnackSearchBox = withSnackbar(SearchBox);
export default withRouter(AppBar);
