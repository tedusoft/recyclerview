import React, { useState } from "react";
import {
	Container,
	Row,
	Col,
	Table,
	Modal,
	ModalHeader,
	ModalBody,
	Spinner,
	Form,
	FormText,
	FormGroup,
	Jumbotron,
	Badge,
	Label,
	Input,
	Alert,
	Button,
} from "reactstrap";
import Script from "@gumgum/react-script-tag";
import { Redirect, useHistory } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import emailjs from "emailjs-com";
export default function Checkout({
	products,
	pickedProducts,
	setPickedProducts,
	formData,
	setFormData,
}) {
	const history = useHistory();
	const [openSnackbar] = useSnackbar({
		position: "bottom-right",
		style: {
			backgroundColor: "white",
			border: "2px solid red",
			borderRadius: "10px",
			color: "red",
			fontSize: "20px",
			textAlign: "center",
		},
		closeStyle: {
			color: "red",
			fontSize: "16px",
		},
	});
	const [modalVisible, setModalVisible] = useState(false);
	const toggleModal = () => setModalVisible(!modalVisible);
	const [paypalLoaded, setPaypalLoaded] = useState(window.paypal !== undefined);
	const [isDataValid, setDataValid] = useState(false);
	const checkoutProducts = products.filter((product) =>
		pickedProducts.includes(product.id)
	);
	const price = checkoutProducts.reduce((total, item) => {
		return total + item.unit_amount.value;
	}, 0);
	const initPayPalButton = () => {
		window.paypal
			.Buttons({
				style: {
					shape: "pill",
					color: "blue",
					layout: "vertical",
					label: "paypal",
				},
				createOrder: function (data, actions) {
					var priceTotal = Math.round(price * 100) / 100;
					return actions.order.create({
						purchase_units: [
							{
								amount: {
									currency_code: "USD",
									value: priceTotal,
									breakdown: {
										item_total: {
											currency_code: "USD",
											value: priceTotal,
										},
									},
								},
								items: checkoutProducts,
							},
						],
					});
				},

				onApprove: function (data, actions) {
					return actions.order.capture().then(function (details) {
						setModalVisible(true);
						emailjs
							.send(
								"default_service",
								"template_qr5u179",
								{
									client_name: formData.name + " " + formData.lastname,
									client_email: formData.client_email,
									client_gdrive: formData.client_gdrive,
								},
								"user_Z0tDIaK634ZfJUrLfrywg"
							)
							.then((resp) => {
								setModalVisible(false);
								setPickedProducts([]);
								history.push("/home");
								if (resp.status === 200) {
									setTimeout(() => {
										alert("Transaction completed.");
									}, 1000);
								}
							});
					});
				},
				onError: function (err) {
					console.log(err);
				},
				onCancel: function (data) {
					openSnackbar("The transaction was canceled.");
				},
			})
			.render("#paypal-button-container");
	};
	if (pickedProducts.length <= 0) {
		return <Redirect to="/home" />;
	}
	if (!paypalLoaded) {
		return (
			<Container
				style={{
					height: "90vh",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Row className="justify-content-center">
					<p className="h2 w-100">Waiting for Paypal...</p>
					<Spinner color="secondary" />
				</Row>
				<Script
					src="https://www.paypal.com/sdk/js?client-id=AdCBXwV8CZFQbTSQHeqlf_4ts2-iHWleOYaDpqdhiJyBspNrhDMxr3lVmLFWYT22fP-JxXjEhHOyjpTX&currency=USD"
					type="text/javascript"
					onLoad={(e) => {
						if (window.paypal) {
							setPaypalLoaded(true);
						}
					}}
					async
				/>
			</Container>
		);
	}

	const handleInputs = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	return (
		<Container>
			<Row hidden={isDataValid}>
				<Col xs="12">
					<Jumbotron className="pt-2 pb-2 mt-2">
						<span className="font-weight-bold lead">
							Secure payment with paypal
						</span>
						<hr className="my-2" />
						<span className="text-justify">
							Before continuing, you need to enter valuable information for
							product delivery.
						</span>
						<br />
						<span>
							<strong>NOTE:</strong> Do not close this window until the payment
							is made.
						</span>
					</Jumbotron>
				</Col>
				<Col xs="12" md="8">
					<Form>
						<FormGroup>
							<FormText>
								<span className="font-weight-bold h2">Billing Information</span>
							</FormText>
						</FormGroup>
						<Row form>
							<Col xs="12" md="6">
								<FormGroup>
									<Label for="first_name">First Name</Label>
									<Input
										id="first_name"
										type="text"
										required
										name="name"
										value={formData.name}
										onChange={handleInputs}
									/>
								</FormGroup>
							</Col>
							<Col xs="12" md="6">
								<FormGroup>
									<Label for="last_name">Last Name</Label>
									<Input
										id="last_name"
										type="text"
										required
										name="lastname"
										value={formData.lastname}
										onChange={handleInputs}
									/>
								</FormGroup>
							</Col>
						</Row>
						<FormGroup>
							<Label for="client_email">Email address</Label>
							<Input
								id="client_email"
								type="email"
								name="client_email"
								value={formData.client_email}
								onChange={handleInputs}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="client_gdrive">Gmail address</Label>
							<Input
								id="client_gdrive"
								type="email"
								required
								name="client_gdrive"
								value={formData.client_gdrive}
								onChange={handleInputs}
							/>
						</FormGroup>
						<Alert color="info">
							It is necessary to be able to give permissions to read the files
							in Google Drive.
						</Alert>
					</Form>
				</Col>
				<Col xs="12" md="4">
					<p className="h3 text-dark d-flex justify-content-end w-100">
						Your cart
						<Badge className="ml-auto" color="info">
							{pickedProducts.length}
						</Badge>
					</p>
					<Table bordered>
						<tbody>
							{checkoutProducts.map((product) => (
								<tr key={product.name}>
									<td className="align-middle d-flex">
										<span className="mr-auto">{product.name}</span>
										<span className="text-secondary">
											{product.unit_amount.value}{" "}
											{product.unit_amount.currency_code}
										</span>
									</td>
								</tr>
							))}
						</tbody>
						<tfoot className="text-secondary">
							<tr className="bg-muted">
								<td className="align-middle d-flex">
									<span className="mr-auto">Total</span>
									<span className="font-weight-bold">
										{price}
										{" $"}
									</span>
								</td>
							</tr>
						</tfoot>
					</Table>
				</Col>
			</Row>
			<Row>
				<Col xs="12" className="pt-5 pb-5 d-flex justify-content-end">
					<Button
						className="mr-auto"
						outline
						color="secondary"
						onClick={(e) => {
							if (isDataValid) {
								setDataValid(false);
							} else {
								history.push("/buy-now");
							}
						}}
					>
						<p className="p-0 m-0">
							<span className="fa fa-shopping-cart"></span>
							{" Go back"}
						</p>
					</Button>
					<Button
						color="secondary"
						hidden={isDataValid}
						onClick={(e) => {
							if (
								formData.name.replace(/\s/g, "").length > 0 &&
								formData.lastname.replace(/\s/g, "").length > 0 &&
								formData.client_email.replace(/\s/g, "").length > 0 &&
								formData.client_gdrive.replace(/\s/g, "").length > 0
							) {
								if (
									document.querySelector("#paypal-button-container").children
										.length <= 0
								) {
									initPayPalButton();
								}
								setDataValid(true);
							} else {
								openSnackbar("Invalid data, please fill the form.");
							}
						}}
					>
						<p className="p-0 m-0">
							Continue to checkout <span className="fa fa-chevron-right"></span>
						</p>
					</Button>
				</Col>
				<Col xs="12" className={isDataValid ? "d-block" : "d-none"}>
					<div
						id="paypal-button-container"
						className="d-flex flex-row justify-content-center w-100"
					>
						{paypalLoaded ? null : <Spinner />}
					</div>
				</Col>
				<Modal isOpen={modalVisible} toggle={toggleModal}>
					<ModalHeader toggle={toggleModal}>
						Transaction carried out
					</ModalHeader>
					<ModalBody>
						<p>
							The payment has been made successfully, wait for this window to
							close automatically.
							<br />
							<span className="fa fa-check fa-3x w-100 d-flex justify-content-center text-success"></span>
						</p>
					</ModalBody>
				</Modal>
			</Row>
		</Container>
	);
}
