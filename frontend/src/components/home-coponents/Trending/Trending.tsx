import styles from "./Trending.module.css";

export interface Service {
  name: string;
  time: string;
  price: number;
  id: string;
}

export interface TeamMember {
  name: string;
  role: string;
  id: string;
}

export interface FitnessCenter {
  id: string;
  name: string;
  images: string[];
  services: Service[];
  reviews: string[];
  team: TeamMember[];
}

export const Trending = () => {
  const dummyData: FitnessCenter[] = [
    {
      id: "67962b27c5a885d5ca00aa5d",
      name: "Fitness Center",
      images: ["image1.jpg", "image2.jpg"],
      services: [
        {
          name: "Personal Training",
          time: "60 minutes",
          price: 5000,
          id: "67962b27c5a885d5ca00aa5e",
        },
        {
          name: "Yoga Class",
          time: "45 minutes",
          price: 3000,
          id: "67962b27c5a885d5ca00aa5f",
        },
      ],
      reviews: ["Excellent service!", "Highly recommend!"],
      team: [
        {
          name: "John Doe",
          role: "Trainer",
          id: "67962b27c5a885d5ca00aa60",
        },
        {
          name: "Jane Smith",
          role: "Manager",
          id: "67962b27c5a885d5ca00aa61",
        },
      ],
    },
  ];

  return (
    <div className={styles.container}>
      <h3>Trending</h3>
      <div className={styles.boxesDiv}>
        {dummyData.map((data) => (
          <div key={data.id} className={styles.boxDiv}>
            {/* <img src={data.images[0]} alt={`${data.name}`} /> */}
            <img
              src="/frontend/public/images/homeMedia/trendyStudio@2x-7323de5d66a7e52fa30aab8711abf488.webp"
              alt=""
            />
            <p>{data.name}</p>
            <p>{data.reviews[0]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
