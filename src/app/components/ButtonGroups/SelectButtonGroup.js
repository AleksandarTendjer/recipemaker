import React from "react";

const SelectButtonGroup = ({ selectedItems, setSelectedItems, items }) => {
	const handleSelect = (clickedItem) => {
		const alreadyAdded = selectedItems.find(
			(selectedItem) => selectedItem.value === clickedItem.value
		);
		return alreadyAdded
			? setSelectedItems(
					selectedItems.filter(
						(selectedItem) => selectedItem.value !== clickedItem.value
					)
				)
			: setSelectedItems([...selectedItems, clickedItem]);
	};

	return (
		<ul className="grid grid-cols-3 grid-rows-2 gap-3">
			{items.map((item) => (
				<li
					key={item.label}
					onClick={() => handleSelect(item)}
					className={`cursor-pointer select-none items-center justify-center rounded-lg p-4 hover:cursor-pointer hover:bg-slate-300 focus:outline-none ${
						selectedItems.find(
							(alreadySelectedItem) => alreadySelectedItem.value === item.value
						)
							? "bg-blue-500 text-white"
							: "bg-gray-200 text-gray-700"
					} focus:outline-none`}>
					{item?.label}
				</li>
			))}
		</ul>
	);
};

export default SelectButtonGroup;
