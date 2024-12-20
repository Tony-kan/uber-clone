import react from "react";

import { View, Text } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
import { useLocationStore } from "@/store";
import { calculateRegion } from "@/lib/map";

const Map = () => {
  const {
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();

  const region = calculateRegion({
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  });

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
      }}
      tintColor="black"
      mapType="mutedStandard"
      initialRegion={region}
      showsUserLocation={true}
      userInterfaceStyle="light"
    >
      <Text>Map</Text>
    </MapView>
  );
};
export default Map;
