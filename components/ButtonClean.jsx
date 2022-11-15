import * as React from "react";
import { StyleSheet, Pressable, Text } from "react-native";

export function ButtonClean(props) {
  const { onPress, title = "Save" } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "#000000",
    textDecorationLine: "underline",
  },
});
