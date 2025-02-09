// import { IoIosStar } from "react-icons/io";
// import { FaStarHalfAlt } from "react-icons/fa";
// import { shopType } from "../../../../contextAPi/ApiResponseContext/ApiContext";
// import styles from "./ShopReviews.module.css";

// export const ShopReviews = ({ shop }: { shop: shopType }) => {
//   return (
//     <div>
//       <h1>Reviews</h1>
//       <div>
//         <div>
//           <span>
//             <IoIosStar />
//             <IoIosStar />
//             <IoIosStar />
//             <IoIosStar />
//             <FaStarHalfAlt />
//           </span>
//           <span>
//             4.6 <small>(933)</small>
//           </span>
//         </div>
//         <div className={styles.reviewsContainer}>
//           {shop?.reviews?.map((review, index) => (
//             <div key={index} className={styles.reviewItem}>
//               <div className={styles.header}>
//                 <span className={styles.initialCircle}>
//                   {review.name.charAt(0).toUpperCase()}
//                 </span>
//                 <p className={styles.name}>{review.name}</p>
//               </div>
//               <div className={styles.rating}>
//                 {[...Array(5)].map((_, i) => (
//                   <IoIosStar key={i} className={styles.star} />
//                 ))}
//               </div>
//               <p className={styles.comment}>{review.comment}</p>
//               <p>{review.comment}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
