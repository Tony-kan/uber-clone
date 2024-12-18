import react from "react";

import { View, Text } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

const Map = () => {
  // const region = {}

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
      // initialRegion={region}
      showsUserLocation={true}
      userInterfaceStyle="light"
    >
      <Text>Map</Text>
    </MapView>
  );
};
export default Map;
