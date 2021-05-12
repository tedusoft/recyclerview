import React from "react";
import {
	Container,
	Row,
	Col,
	Label,
	Card,
	CardDeck,
	CardTitle,
	CardHeader,
	CardBody,
	CardSubtitle,
	CardText,
	CardFooter,
	Button,
} from "reactstrap";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import CartButton from "../components/BuyNow/CartButton";
export default function BuyNow({
	products,
	pickedProducts,
	setPickedProducts,
}) {
	const history = useHistory();
	const handleCheck = (productID) => {
		if (!pickedProducts.includes(productID)) {
			setPickedProducts([...pickedProducts, productID]);
		} else if (pickedProducts.includes(productID)) {
			let newArray = [...pickedProducts];
			let idx = newArray.indexOf(productID);
			newArray.splice(idx, 1);
			setPickedProducts(newArray);
		}
	};
	return (
		<Container>
			<Helmet>
				<title>Buy Extensions</title>
			</Helmet>
			<Row>
				<Col xs="12">
					<h1 className="display-6">Extensions</h1>
					<p className="lead">What are you interested in buying?</p>
					<hr className="my-4" />
				</Col>
			</Row>
			<Row className="justify-content-center">
				<Col xs="12">
					<Label>Select the extensions from below: </Label>
				</Col>
				<Col xs="12">
					<CardDeck>
						{products.map((product) => (
							<Card key={product.name}>
								<CardHeader>
									<CardTitle>{product.name}</CardTitle>
									<CardSubtitle>
										{product.unit_amount.value} +{" "}
										{product.unit_amount.currency_code}
									</CardSubtitle>
								</CardHeader>
								<CardBody>
									<CardText>{product.description}</CardText>
								</CardBody>
								<CardFooter>
									<CartButton
										productID={product.id}
										onChange={handleCheck}
										checked={pickedProducts.includes(product.id)}
									/>{" "}
								</CardFooter>
							</Card>
						))}
					</CardDeck>
				</Col>
				<Col
					xs="12"
					className="d-flex align-items-center justify-content-end mt-5"
				>
					<p className=" m-0 p-0 mr-3">
						Extensions in cart: {pickedProducts.length}
					</p>
					<Button
						disabled={pickedProducts.length < 1}
						onClick={(_) => {
							history.push("/buy-now/checkout");
						}}
					>
						Checkout <span className="fa fa-chevron-right rounded-pill"></span>
					</Button>
				</Col>
			</Row>
		</Container>
	);
}
