import * as React from "react";
import { Input } from "native-base";

export function InputField(props) {
  return (
    <Input variant={"rounded"} size={'lg'} bgColor="gray.300" /* shadow={1} */ selectionColor={"#dddddd"} /* mb="8px" */ h="55px" focusOutlineColor={"gray.300"} placeholderTextColor={"gray.600"} borderRadius="10" {...props} />
  );
}