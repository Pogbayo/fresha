import styles from "./treatment.module.css";
import { GiHairStrands } from "react-icons/gi";
import { GiFingernail } from "react-icons/gi";
import { GiEyelashes } from "react-icons/gi";
import { TbMassage } from "react-icons/tb";
import { PiWheelchairDuotone } from "react-icons/pi";
import { GiFemaleLegs } from "react-icons/gi";
import { CiFaceSmile } from "react-icons/ci";
import { FaUmbrellaBeach } from "react-icons/fa";
import { IoMdHeartDislike } from "react-icons/io";
import { ImMakeGroup } from "react-icons/im";
import { CiMedicalCross } from "react-icons/ci";
import { CgGym } from "react-icons/cg";

const Treatment = ({
  handleTreatmentInput,
}: {
  handleTreatmentInput: (value: string) => void;
}) => {
  const handleClickForTreatment = (value: string) => {
    handleTreatmentInput(value);
  };
  return (
    <div className={styles.container}>
      <h3>Top Categories</h3>
      <ul>
        <li>
          <div>
            <GiHairStrands size={15} />
          </div>
          <div onClick={() => handleClickForTreatment("Hair Styling")}>
            Hair Styling
          </div>
        </li>
        <li>
          <div>
            <GiFingernail size={15} />
          </div>
          <div onClick={() => handleClickForTreatment("Nails")}>Nails</div>
        </li>
        <li>
          <div>
            <GiEyelashes size={15} />
          </div>
          <div onClick={() => handleClickForTreatment("Eye brow & Eye lashes")}>
            Eye brow & Eye lashes
          </div>
        </li>
        <li>
          <div>
            <TbMassage size={15} />
          </div>
          <div onClick={() => handleClickForTreatment("Massage")}>Massage</div>
        </li>
        <li>
          <div>
            <PiWheelchairDuotone size={15} />
          </div>
          <div onClick={() => handleClickForTreatment("Barbing")}>Barbing</div>
        </li>
        <li>
          <div>
            <GiFemaleLegs size={15} />
          </div>
          <div onClick={() => handleClickForTreatment("Hair removal")}>
            Hair removal
          </div>
        </li>
        <li>
          <div>
            <CiFaceSmile size={15} />
          </div>
          <div onClick={() => handleClickForTreatment("Facials and skincare")}>
            Facials and skincare
          </div>
        </li>
        <li>
          <div>
            <FaUmbrellaBeach size={15} />
          </div>
          <div onClick={() => handleClickForTreatment("Body")}>Body</div>
        </li>
        <li>
          <div>
            <IoMdHeartDislike size={15} />
          </div>
          <div onClick={() => handleClickForTreatment("Tattoo and piercing")}>
            Tattoo and piercing
          </div>
        </li>
        <li>
          <div>
            <ImMakeGroup size={15} />
          </div>
          <div onClick={() => handleClickForTreatment("Make up")}>Make up</div>
        </li>
        <li>
          <div>
            <CiMedicalCross size={15} />
          </div>
          <div onClick={() => handleClickForTreatment("Medical and dental")}>
            Medical and dental
          </div>
        </li>
        <li>
          <div>
            <CgGym size={15} />
          </div>
          <div onClick={() => handleClickForTreatment("Fitness")}>Fitness</div>
        </li>
      </ul>
    </div>
  );
};
export default Treatment;
