import React from "react";

const Loader = ({ className }: { className?: string }) => {
	return <span className={` ${className ? "loader-lg" : "loader"}`}></span>;
};

export default Loader;
