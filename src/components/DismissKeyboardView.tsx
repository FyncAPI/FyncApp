import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

export const DismissKeyboardView = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
};
