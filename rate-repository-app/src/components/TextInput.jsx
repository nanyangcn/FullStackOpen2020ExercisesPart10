import React from 'react';
import { TextInput as NativeTextInput } from 'react-native';

const TextInput = ({ style, ...props }) => {
  const textInputStyle = [style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
