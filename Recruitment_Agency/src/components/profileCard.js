import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import React from 'react';
import {Card, Title} from 'react-native-paper';

// import Icon from 'react-native-vector-icons/Octicons';
//Icons
import Fontisto from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileCard = props => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const {title, iconName, onPress, style} = props;

  return (
    <TouchableCmp onPress={onPress} style={style}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.card1stView}>
            <Title style={styles.title}>{title}</Title>
            <Icon name={iconName} color="gray" size={30} />
          </View>
        </Card.Content>
      </Card>
    </TouchableCmp>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {width: 8, height: 5},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 20,
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  container: {
    backgroundColor: '#f9fafd',

    justifyContent: 'center',
  },
  card1stView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card2ndView: {
    flexDirection: 'row',
  },
  title: {
    color: 'gray',
    fontSize: 18,
  },
});
