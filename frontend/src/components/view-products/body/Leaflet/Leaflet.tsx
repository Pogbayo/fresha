import { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./Leaflet.module.css";
import { shopType } from "../../../../contextAPi/ApiResponseContext/ApiContext";

interface ShopWithCoordinates extends shopType {
  latitude: number;
  longitude: number;
}

export const Leaflet = ({ shops }: { shops: shopType[] }) => {
  const mapRef = useRef<L.Map | null>(null);
  const [shopLocations, setShopLocations] = useState<ShopWithCoordinates[]>([]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }
    const fetchCoordinates = async () => {
      const geocodedShops = await Promise.all(
        shops.map(async (shop) => {
          const address = shop.address[0];
          if (!address) return null;

          const addressString = `${address.city}, ${address.country}`;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
              addressString
            )}&format=json`
          );
          console.log("Response status:", response.status);

          const data = await response.json();
          console.log("Geocoding API Response:", data);

          if (data.length > 0) {
            return {
              ...shop,
              latitude: parseFloat(data[0].lat),
              longitude: parseFloat(data[0].lon),
            };
          }
          return null;
        })
      );

      setShopLocations(
        geocodedShops.filter(Boolean) as unknown as ShopWithCoordinates[]
      );
    };

    fetchCoordinates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100vh", width: "100%" }}
        ref={(instance) => {
          if (instance) {
            mapRef.current = instance;
            instance.invalidateSize();
          }
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {shopLocations.map((shop, index) => (
          <Marker position={[shop.latitude, shop.longitude]} key={index}>
            <Popup>
              <h3>{shop.name}</h3>
              <p>{shop.address[0].country}</p>
            </Popup>{" "}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
