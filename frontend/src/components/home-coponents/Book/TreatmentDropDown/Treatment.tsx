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

export const Treatment = () => {
  return (
    <div className={styles.container}>
      <h3>Top Categories</h3>
      <ul>
        <li>
          <div>
            <GiHairStrands color="purple" size={15} />
          </div>
          <div>Hair Styling</div>
        </li>
        <li>
          <div>
            <GiFingernail color="purple" size={15} />
          </div>
          <div>Nails</div>
        </li>
        <li>
          <div>
            <GiEyelashes color="purple" size={15} />
          </div>
          <div>Eye brow & Eye lashes</div>
        </li>
        <li>
          <div>
            <TbMassage color="purple" size={15} />
          </div>
          <div>Massage</div>
        </li>
        <li>
          <div>
            <PiWheelchairDuotone color="purple" size={15} />
          </div>
          <div>Barbing</div>
        </li>
        <li>
          <div>
            <GiFemaleLegs color="purple" size={15} />
          </div>
          <div>Hair removal</div>
        </li>
        <li>
          <div>
            <CiFaceSmile color="purple" size={15} />
          </div>
          <div>Facials and skincare</div>
        </li>
        <li>
          <div>
            <FaUmbrellaBeach color="purple" size={15} />
          </div>
          <div>Body</div>
        </li>
        <li>
          <div>
            <IoMdHeartDislike color="purple" size={15} />
          </div>
          <div>Tattoo and piercing</div>
        </li>
        <li>
          <div>
            <ImMakeGroup color="purple" size={15} />
          </div>
          <div>Make up</div>
        </li>
        <li>
          <div>
            <CiMedicalCross color="purple" size={15} />
          </div>
          <div>Medical and dental</div>
        </li>
        <li>
          <div>
            <CgGym color="purple" size={15} />
          </div>
          <div>Fitness</div>
        </li>
      </ul>
    </div>
  );
};
