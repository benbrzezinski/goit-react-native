import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { UIActivityIndicator } from "react-native-indicators";
import { MapRouteParams } from "../types";
import useLocation from "../hooks/useLocation";

const Map = () => {
  const { params } = useRoute() as MapRouteParams;
  const { locationCoords, getUserLocation, getPhotoLocation } = useLocation();

  useEffect(() => {
    (async () =>
      params.type === "user"
        ? await getUserLocation()
        : await getPhotoLocation(params.address))();
  }, []);

  return (
    <View style={styles.container}>
      {locationCoords ? (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={{
            ...locationCoords,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          mapType="standard"
          minZoomLevel={4}
          showsUserLocation
        >
          <Marker
            title={
              params.type === "user" ? "Your photo location" : "Photo location"
            }
            coordinate={locationCoords}
          />
        </MapView>
      ) : (
        <UIActivityIndicator
          size={52}
          color="#ff6c00"
          style={{ paddingBottom: 60 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d7d7d7",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default Map;
