import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { useEffect } from "react";
import { UIActivityIndicator } from "react-native-indicators";
import useLocation from "../hooks/useLocation";

const Map = () => {
  const { locationCoords, getUserLocation } = useLocation();

  useEffect(() => {
    (async () => await getUserLocation())();
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
          <Marker title="Your set point" coordinate={locationCoords} />
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
