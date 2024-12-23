import { View, Text } from "react-native";
import RideLayout from "@/components/RideLayout";

const BookRide = () => {
  return (
    <RideLayout title="Book Ride" snapPoints={["65%", "85%"]}>
      <Text>BookRide</Text>
    </RideLayout>
  );
};
export default BookRide;
