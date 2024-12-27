import React, { useContext, useEffect, useRef } from "react";
import SelectButtonGroup from "../ButtonGroups/SelectButtonGroup";
import { FilterContext } from "@/app/lib/typeDefintions";

const FilterContainer = ({ isVisible, setIsFilterVisible }) => {
	const filterContainerRef = useRef();
	const {
		selectedAllergies,
		setSelectedAllergies,
		allergies,
		selectedDiets,
		setSelectedDiets,
		diets,
	} = useContext(FilterContext);
	useEffect(() => {
		function handleClickOutside(event) {
			if (
				filterContainerRef.current &&
				!filterContainerRef.current.contains(event.target)
			) {
				setIsFilterVisible(!isVisible);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [filterContainerRef]);
	return (
		<div
			ref={filterContainerRef}
			className={`mt-4 w-full max-w-md rounded-lg bg-white p-4 shadow-lg transition-opacity duration-300 dark:bg-slate-500 ${
				isVisible ? "opacity-100" : "opacity-0"
			}`}
			style={{
				display: isVisible ? "block" : "none",
			}}>
			<h2 className="mb-4 w-full text-center">Allergies</h2>
			<SelectButtonGroup
				selectedItems={selectedAllergies}
				setSelectedItems={setSelectedAllergies}
				items={allergies}
			/>

			<h2 className="mb-4 mt-5 w-full text-center">Diets</h2>
			<SelectButtonGroup
				selectedItems={selectedDiets}
				setSelectedItems={setSelectedDiets}
				items={diets}
			/>
		</div>
	);
};

export default FilterContainer;
