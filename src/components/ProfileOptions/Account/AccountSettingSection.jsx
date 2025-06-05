import ProfileWrapperCard from '../../Utility/ProfileWrapperCard';

// const DisplayCard = ({ Item, handleClick }) => {
// 	return (
// 		<div className="w-fit xl2:w-[651px] flex flex-col p-5 gap-2.5 border  rounded">
// 			{Item?.title && <div className="text-base font-bold text-text-black">{Item.title}</div>}
// 			<div className="font-normal text-sm leading-5 mr-16">{Item.description}</div>
// 			{/* Button for changing the password */}
// 			<div
// 				className={cn(
// 					"font-semibold text-sm cursor-pointer hover:underline hover:underline-offset-2",
// 					Item.btnClassName
// 				)}
// 				onClick={handleClick}
// 			>
// 				{Item.btn}
// 			</div>
// 		</div>
// 	);
// };

const AccountSettingSection = () => {
  // const router = useRouter();

  return (
    <ProfileWrapperCard className="flex flex-col gap-5">
      <div className="text-base font-semibold   text-text-black">ACCOUNT SETTINGS</div>
      {/* <DisplayCard Item={logout_data} handleClick={LogoutHandler} />
			<DisplayCard
				Item={password_data}
				handleClick={() => {
					open_auth_page({ url: urls.changePassword, path: router.pathname });
				}}
			/> */}
    </ProfileWrapperCard>
  );
};

export default AccountSettingSection;
