import React from "react";
import { IoMailSharp } from "react-icons/io5";
import { MdPerson } from "react-icons/md";
import ProfileWrapperCard from "../../Utility/ProfileWrapperCard";

const UserInfo = () => {
	// const [isEditName, setIsEditName] = useState(false);
	// const { details, isLoggedIn } = useUser();
	// const nameRef = useRef();

	// const dispatch = useDispatch();

	// const submitHandler = () => {
	// 	// get the value from the reference
	// 	const name = nameRef.current?.value?.trim();
	// 	// If current name is same as upcoming name
	// 	if (name === details?.name) {
	// 		// Close the edit option of the input and exit
	// 		setIsEditName(false);
	// 		return;
	// 	}
	// 	// Start loading
	// 	dispatch(setTrLoader(true));
	// 	// Send API request to update name
	// 	const originalName = details?.name;
	// 	request_caller({
	// 		endpoint: urls.api.profile.update_profile,
	// 		data: {
	// 			name,
	// 		},
	// 		successToast: true,
	// 	})
	// 		.then((res) => {
	// 			if (res.success) {
	// 				// If API request is successfully completed
	// 				setIsEditName(false);
	// 				// Update the local states in context using the redux
	// 				const data = { ...details };
	// 				// update name
	// 				data.name = name;
	// 				// Update current datetime as last_updated
	// 				data.last_update = new Date().toISOString();
	// 				if (data) {
	// 					// Update the details using redux
	// 					dispatch(loadUser({ details: data, isLoggedIn }));
	// 				}
	// 				// else {
	// 				// 	nameRef.current.value = originalName;
	// 				// }
	// 			}
	// 		})
	// 		.catch(() => {
	// 			// If an error occurs in the request
	// 			nameRef.current.value = originalName;
	// 		})
	// 		.finally(() => {
	// 			// Stop loading after everything is done
	// 			dispatch(setTrLoader(false));
	// 		});
	// };

	// function handleCheck() {
	// 	if (isEditName === true) {
	// 		setIsEditName(false);
	// 		submitHandler();
	// 	} else {
	// 		setIsEditName(true);
	// 		setTimeout(() => {
	// 			nameRef.current?.focus();
	// 		}, 0);
	// 	}
	// }

	return (
		<ProfileWrapperCard id="account" className="flex flex-col gap-5">
			<div className="text-base font-semibold text-text-black">ACCOUNT INFORMATION</div>

			<div className="flex flex-col gap-8 lg2:flex-row lg2:gap-20 lg2:items-center">
				{/* Name Section */}
				<div className="flex flex-col gap-2">
					<div className="flex gap-2 text-sm font-medium leading-3  text-grayish-820 items-center">
						<MdPerson className="w-6 h-6" />
						<span>Name</span>
					</div>
					<div className="my-1 flex flex-row border w-72 rounded py-2.5 px-6 border-gray2">
						{/* <input
							type="text"
							placeholder={details?.name}
							defaultValue={details?.name}
							// ref={nameRef}
							// disabled={!isEditName}
							// readOnly={!isEditName}
							className="w-full text-sm font-medium text-text-black disabled:bg-white"
						/> */}
						{/* <button type="button" onClick={handleCheck} className="ml-1 mt-1">
							{isEditName ? (
								<IoSave className="text-dark-black cursor-pointer w-5 h-5" />
							) : (
								<TbPencilMinus className="group-hover:text-dark-black cursor-pointer w-5 h-5" />
							)}
						</button> */}
					</div>
				</div>
				{/* Email Section */}
				<div className="flex flex-col gap-2.5">
					<div className="flex gap-2 text-sm font-medium leading-3  text-grayish-820 items-center">
						<IoMailSharp className="w-6 h-6" />
						<span>Registered email</span>
					</div>
					<input
						type="text"
						placeholder="yourusername@email.com"
						className="text-sm w-72 font-medium text-text-black border rounded py-3 px-6  border-gray2"
						readOnly={true}
						disabled={true}
						defaultValue={details?.email}
					/>
				</div>
			</div>
		</ProfileWrapperCard>
	);
};

export default UserInfo;
