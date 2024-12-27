"use client";
import SearchBar from "./components/Forms/SearchBar";
import { useState, useEffect } from "react";
import FilterContainer from "./components/Filters/FilterContainer";
import { MoreVerticalIcon } from "lucide-react";
import { FilterContext, StringKeyValuePair } from "./lib/typeDefintions";
import LoadingPopup from "./components/LoadingPopup";

const Home = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [isFilterVisible, setIsFilterVisible] = useState(false);
	const [loading, setLoading] = useState(false); // Loading state

	const diets: StringKeyValuePair[] = [
		{ label: "Vegetarian", value: "vegetarian" },
		{ label: "Vegan", value: "vegan" },
		{ label: "Pescatarian", value: "pescatarian" },
		{ label: "Pork-free", value: "pork-free" },
		{ label: "Keto", value: "keto-friendly" },
		{ label: "Paleo", value: "paleo" },
	];
	const allergies: StringKeyValuePair[] = [
		{ label: "Gluten-free", value: "gluten-free" },
		{ label: "Peanut-free", value: "peanut-free" },
		{ label: "Shellfish-free", value: "shellfish-free" },
		{ label: "Soy-free", value: "soy-free" },
		{ label: "Dairy-free", value: "dairy-free" },
	];

	const getSelectedItemsFromStorage = (key: string) => {
		const storedValue =
			typeof window !== "undefined" ? localStorage.getItem(key) : null;
		if (!storedValue) return [];
		const data = JSON.parse(storedValue);
		const { savedItems, expiration } = data;
		if (!expiration || new Date(expiration) < new Date()) {
			localStorage.removeItem(key);
			return [];
		}
		return savedItems;
	};

	const [selectedDiets, setSelectedDiets] = useState(
		getSelectedItemsFromStorage("selectedDiets")
	);

	const [selectedAllergies, setSelectedAllergies] = useState(
		getSelectedItemsFromStorage("selectedAllergies")
	);

	useEffect(() => {
		const setItemToStorage = (key: string, selectedItems: object[]) => {
			const expiration = new Date();
			expiration.setTime(expiration.getTime() + 30 * 60 * 1000);
			localStorage.setItem(
				key,
				JSON.stringify({
					savedItems: selectedItems,
					expiration: expiration.toISOString(),
				})
			);
		};

		setItemToStorage("selectedAllergies", selectedAllergies);
		setItemToStorage("selectedDiets", selectedDiets);
	}, [selectedAllergies, selectedDiets]);

	const handleSearch = async () => {
		setLoading(true);
		const allergiesFromStorage = getSelectedItemsFromStorage(
			"selectedAllergies"
		).reduce((acc: string[], obj: StringKeyValuePair) => {
			acc.push(obj.value);
			return acc;
		}, []);
		const dietsFromStorage = getSelectedItemsFromStorage(
			"selectedDiets"
		).reduce((acc: string[], obj: StringKeyValuePair) => {
			acc.push(obj.value);
			return acc;
		}, []);

		const params: {
			app_id: string | undefined;
			app_key: string | undefined;
			q: string;
			health: string[];
		} = {
			app_id: process.env.NEXT_PUBLIC_APP_ID,
			app_key: process.env.NEXT_PUBLIC_APPLICATION_KEY,
			q: searchTerm,
			health: [],
		};

		if (allergiesFromStorage && allergiesFromStorage.length > 0) {
			allergiesFromStorage.forEach((allergy: string) => {
				params.health.push(allergy);
			});
		}

		if (dietsFromStorage && dietsFromStorage.length > 0) {
			dietsFromStorage.forEach((diet: string) => {
				params.health.push(diet);
			});
		}

		try {
			const response = await fetch("/api/search", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ params }),
			});

			if (!response.ok) {
				throw new Error("Failed to fetch data from API");
			}

			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setLoading(false);
		}
	};
	const handleFilterToggle = () => {
		setIsFilterVisible(!isFilterVisible);
	};
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-slate-600 bg-opacity-40 backdrop-blur">
			<div className="flex w-full max-w-md flex-row items-center justify-center rounded-lg bg-white p-4 shadow-lg dark:bg-slate-500">
				<SearchBar
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					OnSearch={handleSearch}
					className={"flex w-full items-center rounded-full bg-gray-200 p-2"}
				/>
				<div
					onClick={handleFilterToggle}
					className="ml-4 flex h-8 w-8 cursor-pointer rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none">
					<MoreVerticalIcon className={"h-8 w-8"} />
				</div>
			</div>
			{loading && <LoadingPopup loading={loading} />}
			<FilterContext.Provider
				value={{
					selectedAllergies,
					setSelectedAllergies,
					allergies,
					selectedDiets,
					setSelectedDiets,
					diets,
				}}>
				<FilterContainer
					isVisible={isFilterVisible}
					setIsFilterVisible={setIsFilterVisible}
				/>
			</FilterContext.Provider>

			<ul></ul>
		</div>
	);
};

export default Home;
