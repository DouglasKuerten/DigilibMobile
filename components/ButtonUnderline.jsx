import * as React from "react";
import { Button, Text } from 'native-base'

export function ButtonUnderline(props) {
  return (
    <Button variant="unstyled" _text={{ color: 'black', fontWeight: 300 }} onPress={props.onPress} borderRadius={25} mt={2}><Text underline>{props.title}</Text></Button>
  );
}