import React from "react";
import {StyleSheet} from 'react-native';
import {Color, Margin, Border} from './Theme'

const styles  = StyleSheet.create({ 
buttons: {
    borderColor: Color.BUTTON_BORDER_COLOR,
    borderWidth: Border.BUTTON_BORDER_WIDTH,
    margin: Margin.BUTTON_MARGIN,
    borderRadius: Border.BUTTON_BORDER_RADIUS,
    backgroundColor: Color.BUTTON_BACKGROUND_COLOR,
},
error: {
    color: Color.ERROR_COLOR,
    marginLeft: Margin.ERROR_MARGIN,
},
listLayout: {
    borderColor: '#918f3f',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  gridLayout: {
    margin: '2.5%',
    borderColor: '#918f3f',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: '45%',
  },
});

export default styles;