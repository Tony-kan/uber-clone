import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignedIn, SignedOut, useUser, useClerk } from "@clerk/clerk-expo";

import { Link } from "expo-router";
import * as Linking from "expo-linking";

const recentRides = [];
const Home = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to your desired page
      Linking.openURL(Linking.createURL("/(auth)/sign-in"));
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView>
      <FlatList
        data={recentRides?.slice(0, 5)}
        renderItem={({ item }) => <RideCard ride={item} />}
      />
      {/*<SignedIn>*/}
      {/*  <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>*/}
      {/*  <TouchableOpacity*/}
      {/*    className="bg-primary-500 border border-primary-500 w-16 h-16"*/}
      {/*    onPress={handleSignOut}*/}
      {/*  >*/}
      {/*    <Text>Sign Out</Text>*/}
      {/*  </TouchableOpacity>*/}
      {/*</SignedIn>*/}
      {/*<SignedOut>*/}
      {/*  <Link href="/(auth)/sign-in">*/}
      {/*    <Text className="text-black">Sign in</Text>*/}
      {/*  </Link>*/}
      {/*  <Link href="/(auth)/sign-up">*/}
      {/*    <Text className="text-black">Sign up</Text>*/}
      {/*  </Link>*/}
      {/*</SignedOut>*/}
    </SafeAreaView>
  );
};

export default Home;
