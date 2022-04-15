import React from 'react';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {FAB} from 'react-native-paper';
import Color from '../constant/Color';
import Icon from 'react-native-vector-icons/Octicons';
const FabButton = props => {
  const {iconName, style, onPress, color} = props;
  return (
    <TouchableOpacity style={[styles.fab, style]} onPress={onPress}>
      <Icon name={iconName} color={color ? color : 'white'} size={26} />
    </TouchableOpacity>
    // <FAB style={[styles.fab, style]} icon={iconName} onPress={onPress} />;
  );
};

export default FabButton;

const styles = StyleSheet.create({
  fab: {
    // position: 'absolute',
    width: Platform.OS === 'ios' ? 70 : 60,
    height: Platform.OS === 'ios' ? 70 : 60,
    borderRadius: 50,
    backgroundColor: Color.primary,
    margin: 20,
    left: 300,
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
