class TypeStyles {
	constructor() {
		this.base = {
			padding: "4px",
			textAlign: "center",
			color: "white",
			borderRadius: "7px",
			margin: "2px",
			backgroundColor: "#7D7D7D",
		};
	}

	color = (color) => {
		return { ...this.base, backgroundColor: color };
	};
	get = (type) => {
		switch (type) {
			case "Number":
				return { ...this.base, backgroundColor: "#3F71B5" };
			case "Text":
				return { ...this.base, backgroundColor: "#B32D5E" };
			case "Boolean":
				return { ...this.base, backgroundColor: "#77AB41" };
			case "Component":
				return { ...this.base, backgroundColor: "#8BC34A" };
			case "List":
				return { ...this.base, backgroundColor: "#5BA4D0" };
			case "Any":
				return { ...this.base, backgroundColor: "#4527A0" };
			case "Group":
				return { ...this.base, backgroundColor: "#7d88b2" };
			case "Color":
				return { ...this.base, backgroundColor: "#7D7D7D" };
			default:
				return this.base;
		}
	};
}
let styles = null;

export default function ColorPill({
	color = undefined,
	type = undefined,
	textColor = undefined,
	children,
}) {
	if (styles === null) styles = new TypeStyles();
	let style = color !== undefined ? styles.color(color) : styles.get(type);
	if (textColor !== undefined) {
		style = { ...style, color: textColor };
	}
	return (
		<span className="d-inline" style={style}>
			{children}
		</span>
	);
}
