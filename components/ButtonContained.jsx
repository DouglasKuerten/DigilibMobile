import * as React from "react";
import { Button } from 'react-native-paper'

export function ButtonContained(props) {
  return (
    <Button mode="contained" color="#000000" children={props.title} onPress={props.onPress} style={{ width: "30%", borderRadius: 25, marginTop: 20 }}></Button>
  );
}