import { Link, Stack } from "expo-router";
import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function NotFoundScreen() {
  // @ts-ignore
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Text className="text-2xl font-JakartaExtraBold">
          This screen doesn't exist.
        </Text>
        <Link href="/" style={styles.link}>
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
