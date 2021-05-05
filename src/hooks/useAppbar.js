import React, { useState, createContext } from "react";
export const AppbarContext = createContext();
export const AppbarProvider = ({ children }) => {
	const [config, setConfig] = useState({
		showSearchBar: false,
		onSubmit: (text) => {
			console.log(text);
		},
		errorMessage: "Invalid input.",
	});
	return (
		<AppbarContext.Provider value={{ config, setConfig }}>
			{children}
		</AppbarContext.Provider>
	);
};
