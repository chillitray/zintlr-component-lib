import { GoAlertFill } from "react-icons/go";
import styles from "../styles/styles.module.css";

const DangerZone = () => {
  return (
    <div className={styles.profileBox}>
      <div className="bg-pinkish-200 flex flex-col gap-3 p-2 xl2:p-3 rounded-md xl2:w-[648px] ">
        <div className="flex gap-1 items-center">
          <GoAlertFill className="h-5 w-5 text-brightRed" />
          <span className="text-base font-semibold text-text-black ml-1 align-[6px]">
            Danger Zone
          </span>
        </div>
        <div className="flex flex-col p-3 xl2:p-5 gap-3 rounded bg-white ">
          {/* <div className="text-xs font-normal leading-4 text-black">
						{dangerZoneDescription}
					</div> */}
          {/* <div className="w-fit xl2:w-1/3 whitespace-nowrap">
						<DeactivateModal />
					</div> */}
        </div>
      </div>
    </div>
  );
};

export default DangerZone;
