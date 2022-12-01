import * as React from "react";
import { Button } from 'native-base'

export function ButtonContained(props) {
  return (
      <Button variant="contained" _light={{bg:'black'}} _dark={{bg:'darkBlue.500'}} _text={{color: 'white', fontWeight: 600, fontSize: 15 }} borderRadius={25} mt={2} {...props}>{props.title}</Button>
  );
}