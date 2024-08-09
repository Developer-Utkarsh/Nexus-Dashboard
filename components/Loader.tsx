import React from "react";

const Loader = ({ light,large }: { light?: boolean,large?:boolean }) => {
	return <span className={`  ${large=== true ? "w-16 h-16 border-[4px]":"w-4 h-4 border-[2.25px]"}  ${light=== true ? " border-[#333]":"border-[#FAFAFA]"}  border-r-transparent  rounded-full animate-spin`}></span>;
};

export default Loader;
