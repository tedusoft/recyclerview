import React, { useEffect, useState } from "react";
import {
	Container,
	Row,
	Col,
	Label,
	Table,
	Form,
	FormGroup,
	Input,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from "reactstrap";
import { Helmet } from "react-helmet";
import Script from "@gumgum/react-script-tag";
import CartButton from "../components/BuyNow/CartButton";
export default function BuyNow(props) {
	const [modalVisible, setModalVisible] = useState(false);
	const toggleModal = () => setModalVisible(!modalVisible);
	const [paypalLoaded, setPaypalLoaded] = useState(false);
	let [pickedProductsID, setPickedProductsID] = useState([]);
	const products = [
		{
			id: 1,
			name: "RecyclerView + Widgets",
			unit_amount: {
				currency_code: "USD",
				value: 25,
			},
		},
		{
			id: 2,
			name: "Widget Animator",
			unit_amount: {
				currency_code: "USD",
				value: 4,
			},
		},
		{
			id: 3,
			name: "Firebase Tools",
			unit_amount: {
				currency_code: "USD",
				value: 4,
			},
		},
	];

	const initPayPalButton = () => {
		const checkGroup = document.querySelector("#selectedGroup");
		window.paypal
			.Buttons({
				style: {
					shape: "pill",
					color: "black",
					layout: "vertical",
					label: "paypal",
				},
				createOrder: function (data, actions) {
					var ids = [];
					for (let i = -1; ++i < checkGroup.children.length; ) {
						ids.push(Number.parseInt(checkGroup.children.item(i).name));
					}
					var orderProducts = [],
						price = 0;
					products.forEach((product) => {
						if (ids.includes(product.id)) {
							orderProducts.push(product);
							price += product.unit_amount.value;
						}
					});
					var orderDescription = "RecyclerView Extension Pack";
					var priceTotal = Math.round(price * 100) / 100;
					return actions.order.create({
						purchase_units: [
							{
								description: orderDescription,
								amount: {
									currency_code: "USD",
									value: priceTotal,
									breakdown: {
										item_total: { currency_code: "USD", value: priceTotal },
										shipping: { currency_code: "USD", value: 0 },
										tax_total: { currency_code: "USD", value: 0 },
									},
									items: orderProducts,
								},
							},
						],
					});
				},

				onApprove: function (data, actions) {
					return actions.order.capture().then(function (details) {
						alert(
							"Transaction completed by " + details.payer.name.given_name + "!"
						);
					});
				},
				onError: function (err) {
					console.log(err);
				},
				onCancel: function (data) {
					setModalVisible(true);
				},
			})
			.render("#paypal-button-container");
	};

	useEffect(() => {
		if (paypalLoaded) {
			initPayPalButton();
		}
		return () => {
			setPaypalLoaded(false);
		};
	});
	const handleCheck = (productID) => {
		if (!pickedProductsID.includes(productID)) {
			setPickedProductsID([...pickedProductsID, productID]);
		} else if (pickedProductsID.includes(productID)) {
			let newArray = [...pickedProductsID];
			let idx = newArray.indexOf(productID);
			newArray.splice(idx, 1);
			setPickedProductsID(newArray);
		}
	};
	return (
		<Container>
			<Helmet>
				<title>Buy Extension</title>
			</Helmet>
			<Row>
				<Col xs="12">
					<h1 className="display-6">Buy RecyclerView Extension Pack</h1>
					<p className="lead">What are you interested in buying?</p>
					<hr className="my-4" />
				</Col>
			</Row>
			<Row className="justify-content-center">
				<Col xs="12">
					<Label>Select the products from below: </Label>
				</Col>
				<Col xs="12">
					<Table hover borderless>
						<thead>
							<tr className="text-secondary font-weight-bold">
								<th>Extension</th>
								<th>Price</th>
								<th> </th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product.name}>
									<th className="align-middle">
										<span>{product.name}</span>
									</th>
									<td className="align-middle">
										<span
											className={
												pickedProductsID.includes(product.id)
													? "text-secondary"
													: "text-muted"
											}
										>
											{product.unit_amount.value}{" "}
											{product.unit_amount.currency_code}
										</span>
									</td>
									<td className="w-25">
										<CartButton
											productID={product.id}
											onChange={handleCheck}
											checked={pickedProductsID.includes(product.id)}
										/>
									</td>
								</tr>
							))}
						</tbody>
						<tfoot className="text-secondary">
							<tr className="bg-muted">
								<th>Total</th>
								<td>
									{products.reduce((total, item) => {
										return (
											total +
											(pickedProductsID.includes(item.id)
												? item.unit_amount.value
												: 0)
										);
									}, 0)}
									{" $"}
								</td>
							</tr>
						</tfoot>
					</Table>
					<Form>
						<FormGroup hidden id="selectedGroup">
							{pickedProductsID.map((id) => (
								<Input
									className="inputSelector"
									type="checkbox"
									name={id}
									checked
									readOnly
									key={`check-${id}`}
								/>
							))}
						</FormGroup>
					</Form>
				</Col>
				<Col xs="12">
					<div
						id="paypal-button-container"
						className="d-flex flex-row justify-content-center"
						disabled
					></div>
				</Col>
				<Modal isOpen={modalVisible} toggle={toggleModal}>
					<ModalHeader toggle={toggleModal}>Modal title</ModalHeader>
					<ModalBody></ModalBody>
					<ModalFooter></ModalFooter>
				</Modal>
				<Script
					src="https://www.paypal.com/sdk/js?client-id=AdCBXwV8CZFQbTSQHeqlf_4ts2-iHWleOYaDpqdhiJyBspNrhDMxr3lVmLFWYT22fP-JxXjEhHOyjpTX&currency=USD"
					type="text/javascript"
					onLoad={(e) => {
						if (window.paypal) setPaypalLoaded(true);
					}}
					async
				/>
			</Row>
		</Container>
	);
}
