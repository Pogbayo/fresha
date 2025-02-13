import { ProfileFav } from "./ProfileFav/ProfileFav";
import styles from "./bodyTwo.module.css";
import { ProfileDeets } from "./ProfileDeets/ProfileDeets";
import { ProfileAppointment } from "./ProfileAppointment/ProfileAppointment";
import { useApiContext } from "../../../contextAPi/ApiResponseContext/useApiContext";
import { DeleteAccount } from "./DeleteAccount/DeleteAccount";

export const BodyTwo = () => {
  const { activeComponent } = useApiContext();

  return (
    <div className={styles.container}>
      {activeComponent === "deets" && <ProfileDeets />}
      {activeComponent === "fav" && <ProfileFav />}
      {activeComponent === "appointment" && <ProfileAppointment />}
      {activeComponent === "deleteaccount" && <DeleteAccount />}
    </div>
  );
};
