import React from "react";
import UserInfo from "./UserInfo";
import AccountSettingSection from "./AccountSettingSection";
import DangerZone from "./DangerZone";

const AcountSection = () => {
	return (
		<div className="flex flex-col gap-4">
			<UserInfo />
			<AccountSettingSection />
			<DangerZone />
		</div>
	);
};

export default AcountSection;
