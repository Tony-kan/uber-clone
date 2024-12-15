import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Text,
  Image,
  TextInput,
  Platform,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { platform } from "node:os";
import { InputFieldProps } from "@/types/type";
import { icons } from "@/constants";

const InputField = ({
  label,
  labelStyle,
  icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleEyeIconPress = () => {
    setShowPassword(!showPassword);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>
            {label}
          </Text>
          <View
            className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border-2 border-neutral-200 focus:border-2 focus:border-primary-500 ${containerStyle}`}
          >
            {icon && (
              <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
            )}
            <TextInput
              className={`rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1 ${inputStyle} text-left`}
              secureTextEntry={secureTextEntry && !showPassword}
              {...props}
            />
            {secureTextEntry && (
              <TouchableWithoutFeedback onPress={handleEyeIconPress}>
                <Image
                  source={showPassword ? icons.eyecross : icons.eyeopen}
                  className="w-6 h-6 mr-4"
                />
              </TouchableWithoutFeedback>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default InputField;
