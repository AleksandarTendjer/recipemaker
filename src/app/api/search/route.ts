import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
	if (req.method !== "POST") {
		return NextResponse.json(
			{ message: "Only POST requests are allowed" },
			{ status: 200 }
		);
	}

	try {
		const { params } = await req.json();
		console.log(params);
		const baseUrl = "https://api.edamam.com/search";

		if (!params) {
			return NextResponse.json(
				{ message: "Missing baseUrl or params in the request body" },
				{ status: 400 }
			);
		}

		const url = new URL(baseUrl);
		Object.keys(params).forEach((key) => {
			if (key !== "health") {
				url.searchParams.append(key, params[key]);
			}
		});
		if (Array.isArray(params.health)) {
			params.health.forEach((healthParam: string) => {
				url.searchParams.append("health", healthParam);
			});
		}

		const response = await fetch(url.toString(), {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		console.log(response);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const data = await response.json();
		NextResponse.json(data, { status: 200 });
	} catch (error) {
		console.error("Error in fetchData API route:", error);
		NextResponse.json({ message: "Internal server error" }, { status: 500 });
	}
};
