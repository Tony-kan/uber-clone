import { Text, View } from "react-native";

const RideLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <View>
      <Text>Top of the layout</Text>
      {children}
      <Text>Bottom of the layout</Text>
    </View>
  );
};
export default RideLayout;
