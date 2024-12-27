import React from "react";
import { ArrowLeftIcon, Search } from "lucide-react";

const SearchBar = ({ searchTerm, setSearchTerm, OnSearch, className }) => {
	const handleClear = () => {
		setSearchTerm("");
	};

	return (
		<div className={className}>
			<div
				onClick={handleClear}
				className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none cursor-pointer">
				<ArrowLeftIcon className={"w-6 h-6"} />
			</div>
			<input
				type="text"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder="Search..."
				className="bg-transparent ml-2 outline-none placeholder-gray-500 text-gray-500 flex-grow"
			/>
			<button
				onClick={OnSearch}
				className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none">
				<Search className={"w-6 h-6"} />
			</button>
		</div>
	);
};

export default SearchBar;
