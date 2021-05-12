import React from "react";
import { Link } from "react-router-dom";

export default function Footer(props) {
	return (
		<div className="mt-5 pt-3 bg-light border-top">
			<div className="footer">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-4 offset-1 col-sm-2">
							<h5>Links</h5>
							<ul className="list-unstyled">
								<li>
									<Link to="/home">Home</Link>
								</li>
								<li>
									<Link to="/guide">Guide</Link>
								</li>
								<li>
									<Link to="/components">Components</Link>
								</li>
								<li>
									<Link to="/buy-now">Buy Now</Link>
								</li>
							</ul>
						</div>
						<div className="col-7 col-sm-5">
							<h5>Contact</h5>
							<address>
								<a
									style={{ wordWrap: "break-word" }}
									href="mailto:tedusoft@gmail.com"
								>
									tedusoft@gmail.com
								</a>
								<br />
								<a
									style={{ wordWrap: "break-word" }}
									href="mailto:salazar6cristopher@gmail.com"
								>
									salazar6cristopher@gmail.com
								</a>
							</address>
						</div>
						<div className="col-12 col-sm-4 align-self-center">
							<div className="text-center">
								<a className="btn" href="http://t.me/ccriistopher">
									<i className="fa fa-telegram"></i>
								</a>
								<a className="btn" href="http://www.linkedin.com/in/">
									<i className="fa fa-linkedin"></i>
								</a>

								<a className="btn" href="mailto:tedusoft@gmail.com">
									<i className="fa fa-envelope-o"></i>
								</a>
							</div>
						</div>
					</div>
					<div className="row justify-content-center">
						<div className="col-auto">
							<p>© Copyright 2021 Cristopher Salazar</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
