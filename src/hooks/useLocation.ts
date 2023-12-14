import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Toast } from "toastify-react-native";
import { LocationCoords } from "../types";

const useLocation = () => {
  const [locationName, setLocationName] = useState("");
  const [locationCoords, setLocationCoords] = useState<LocationCoords>(null);
  const [locationLoader, setLocationLoader] = useState(false);
  const navigation = useNavigation();

  const getUserLocation = async () => {
    try {
      setLocationLoader(true);

      const { granted } = await Location.requestForegroundPermissionsAsync();

      if (granted) {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        const [locationAddress] = await Location.reverseGeocodeAsync(coords);

        const address = `${locationAddress.country + ", " ?? ""}${
          locationAddress.region + " - " ?? ""
        }${locationAddress.city + " " ?? ""}${locationAddress.name ?? ""}`;

        setLocationCoords(coords);
        setLocationName(address);

        navigation.navigate("Map");
      } else {
        Toast.error(
          "Access to your location is denied, please check the application settings",
          "top"
        );
      }
    } finally {
      setLocationLoader(false);
    }
  };

  return {
    locationName,
    setLocationName,
    locationCoords,
    locationLoader,
    getUserLocation,
  };
};

export default useLocation;
