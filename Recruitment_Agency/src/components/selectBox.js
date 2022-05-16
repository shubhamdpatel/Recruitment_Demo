import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const SelectBox = props => {
  const {data, selectValue} = props;
  const [selectedItem, setSelectedItem] = React.useState(
    data[selectValue || 0],
  );
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            setSelectedItem(item);
            props.onSelectedItem(item);
          }}>
          <View
            style={{
              ...styles.ovel,
              backgroundColor: selectedItem === item ? 'blue' : 'white',
              borderColor: selectedItem === item ? 'white' : 'black',
            }}>
            <Text
              style={{
                fontSize: 17,
                color: selectedItem === item ? 'white' : 'black',
                fontWeight: selectedItem === item ? 'bold' : '400',
              }}>
              {item}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SelectBox;

const styles = StyleSheet.create({
  container: {flexWrap: 'wrap', flexDirection: 'row', width: '100%'},
  ovel: {
    borderWidth: 1,
    minWidth: 100,
    height: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    margin: 5,
  },
});
