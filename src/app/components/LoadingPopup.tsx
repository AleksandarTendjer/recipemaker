"use client";

import { Spin } from "antd";
import React from "react";

interface LoadingPopupProps {
	loading: boolean;
}

const LoadingPopup: React.FC<LoadingPopupProps> = ({ loading }) => {
	if (!loading) return null;

	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				backgroundColor: "rgba(0, 0, 0, 0.5)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				zIndex: 1000,
			}}>
			<Spin size="large" />
		</div>
	);
};

export default LoadingPopup;
