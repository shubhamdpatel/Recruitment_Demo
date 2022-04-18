import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as userAction from '../../redux/actions/user';
import * as authAction from '../../redux/actions/auth';
import Color from '../../constant/Color';

import {Avatar} from 'react-native-paper';
import ProfileCard from '../../components/profileCard';
import ImagePicker from 'react-native-image-crop-picker';
import Animated, {color} from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = ({navigation}) => {
  const [image, setImage] = useState(
    'https://api.adorable.io/avatars/80/abott@adorable.png',
  );
  const user = useSelector(state => state.user.userProfile[0]);
  const dispatch = useDispatch();
  // Fetch Job
  const fetchUser = async () => {
    await dispatch(userAction.fetchUser());
  };

  React.useEffect(() => {
    fetchUser();
  }, [dispatch]);

  // Logout
  const logoutHandeler = async () => {
    await dispatch(authAction.logout());
  };
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      console.log(image);
      setImage(image.path);
      sheetRef.current.snapTo(1);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      console.log(image);
      setImage(image.path);
      sheetRef.current.snapTo(1);
    });
  };

  const renderContent = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => sheetRef.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.pandelHandle}></View>
      </View>
    </View>
  );

  sheetRef = React.useRef();
  fall = new Animated.Value(1);

  return (
    <View style={{flex: 1}}>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[330, 0]}
        renderContent={renderContent}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <Animated.View
        style={{
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
        }}>
        <View style={styles.imageCard}>
          {user?.companyName ? (
            <Avatar.Image
              size={180}
              source={{
                uri: image,
              }}
            />
          ) : (
            <Avatar.Image source={require('../../assets/boy.png')} size={180} />
          )}
          <MCI
            style={{
              position: 'absolute',
              top: 160,
              right: 140,
            }}
            name="camera-plus-outline"
            size={40}
            color="gray"
            onPress={() => sheetRef.current.snapTo(0)}
          />
          {user?.companyName ? (
            <Text style={styles.name}>{user?.companyName}</Text>
          ) : (
            <Text style={styles.name}>
              {user?.firstName} {user?.lastName}
            </Text>
          )}
        </View>
        <ScrollView>
          {/* <View style={styles.details}>
          <View style={{...styles.element}}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name="mail-outline" size={30} color="#4F8EF7" />
              <View style={{marginHorizontal: 10}}>
                <Text style={styles.textHeading}>Email </Text>
                <Text style={styles.text}>{user?.email}</Text>
              </View>
            </View>
          </View>

          <View style={{...styles.element}}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name="call-outline" size={30} color="#4F8EF7" />
              <View style={{marginHorizontal: 10}}>
                <Text style={styles.textHeading}>Mobile</Text>
                <Text style={styles.text}>{user?.mobile}</Text>
              </View>
            </View>
          </View>
        </View> */}
          <Text style={styles.text}>Personal Info </Text>
          {user?.companyName ? (
            <ProfileCard
              title="My Profile"
              iconName="chevron-right"
              onPress={() => navigation.navigate('Company Profile')}
            />
          ) : (
            <ProfileCard
              title="My Profile"
              iconName="chevron-right"
              onPress={() => navigation.navigate('Company Profile')}
            />
          )}

          <ProfileCard title="My Resume" iconName="chevron-right" />

          {/* <ProfileCard
          title="Account Settings"
          iconName="chevron-right"
          onPress={() => navigation.navigate('Account Setting')}
        /> */}
          <Text style={styles.text}>Account Settings</Text>
          <ProfileCard
            title="Logout"
            iconName="logout"
            delete-outline
            onPress={() => {
              logoutHandeler();
            }}
          />
          <ProfileCard title="Delete My Account" iconName="delete" />
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  pandelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: Color.accent,
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  imageCard: {
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 8,
    elevation: 5,
    // borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    height: Platform.OS === 'ios' ? '38%' : '50%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Cochin',
    textAlign: 'center',
  },

  details: {
    flex: 1,
    padding: '5%',
  },
  element: {
    marginVertical: 10,
  },
  textHeading: {
    fontSize: 16,
    fontWeight: '700',
  },
  text: {
    padding: 20,
    fontSize: 18,
  },
});

export default ProfileScreen;
