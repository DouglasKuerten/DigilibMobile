import * as React from "react";
import { Input } from "native-base";

export function InputField(props) {
  return (
    <Input variant={"rounded"} size={'lg'} _light={{ bgColor: 'gray.300', focusOutlineColor: 'gray.300', placeholderTextColor: 'dark.300' }} _dark={{ bgColor: 'dark.100', focusOutlineColor: 'dark.100', placeholderTextColor: 'gray.300' }} h="55px" borderRadius="10" {...props} />
  );
}