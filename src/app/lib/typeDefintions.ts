import { createContext } from "react";

export interface StringKeyValuePair {
	label: string;
	value: string;
}

export interface FilterContextType {
	selectedAllergies: string[];
	setSelectedAllergies: React.Dispatch<
		React.SetStateAction<StringKeyValuePair>
	>;
	allergies: StringKeyValuePair[];
	selectedDiets: string[];
	setSelectedDiets: React.Dispatch<React.SetStateAction<StringKeyValuePair>>;
	diets: StringKeyValuePair[];
}

export const FilterContext = createContext<FilterContextType | null>(null);
