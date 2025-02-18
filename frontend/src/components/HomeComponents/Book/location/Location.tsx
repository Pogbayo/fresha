import styles from "./Location.module.css";
import { TfiLocationArrow } from "react-icons/tfi";

export const Location = ({
  handleLocationValueInput,
}: {
  handleLocationValueInput: (value: string) => void;
}) => {
  const handleClickForInput = (value: string) => {
    handleLocationValueInput(value);
  };
  return (
    <div className={styles.container}>
      <p>
        <TfiLocationArrow color="lightpurle" size={30} />
      </p>
      <p onClick={() => handleClickForInput("Current Location")}>
        Current location
      </p>
    </div>
  );
};
export default Location;
