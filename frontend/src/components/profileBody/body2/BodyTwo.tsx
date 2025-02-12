import { useState } from "react";
import { ProfileFav } from "./ProfileFav/ProfileFav";
import styles from "./bodyTwo.module.css";
import { ProfileDeets } from "./ProfileDeets/ProfileDeets";
import { ProfileAppointment } from "./ProfileAppointment/ProfileAppointment";

export const BodyTwo = () => {
  const [activeComponent, setActiveComponent] = useState<
    "deets" | "fav" | "appointment" | null
  >(null);

  return (
    <div className={styles.container}>
      <button
        onClick={() =>
          setActiveComponent(activeComponent === "deets" ? null : "deets")
        }
      >
        Show Profile Details
      </button>
      <button
        onClick={() =>
          setActiveComponent(activeComponent === "fav" ? null : "fav")
        }
      >
        Show Profile Favorites
      </button>
      <button
        onClick={() =>
          setActiveComponent(
            activeComponent === "appointment" ? null : "appointment"
          )
        }
      >
        Show Profile Appointments
      </button>

      {activeComponent === "deets" && <ProfileDeets />}
      {activeComponent === "fav" && <ProfileFav />}
      {activeComponent === "appointment" && <ProfileAppointment />}
    </div>
  );
};
