import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as userAction from '../redux/actions/user';
import * as authAction from '../redux/actions/auth';
import Color from '../constant/Color';
import auth from '@react-native-firebase/auth';
import {Avatar} from 'react-native-paper';
import ProfileCard from '../components/profileCard';
import ImagePicker from 'react-native-image-crop-picker';
import Animated, {color} from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import * as Progress from 'react-native-progress';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import storage from '@react-native-firebase/storage';
const ProfileScreen = ({navigation}) => {
  const companyImage =
    'https://firebasestorage.googleapis.com/v0/b/recruitment-agency-e0465.appspot.com/o/images%2Fdefault%2Fcompany.png?alt=media&token=e5db119f-31d2-4449-9d1b-4f3a9549a2ab';
  const userImage =
    'https://firebasestorage.googleapis.com/v0/b/recruitment-agency-e0465.appspot.com/o/images%2Fdefault%2Fboy.png?alt=media&token=32913849-407a-4e96-8700-ca1c4bfd839d';

  const user = useSelector(state => state.user.userProfile[0]);

  const [profile, setProfile] = useState('');
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const dispatch = useDispatch();
  // Fetch Job
  const fetchUser = async () => {
    await dispatch(userAction.fetchUser());
  };

  React.useEffect(() => {
    debugger;
    fetchUser();
  }, [dispatch]);

  React.useEffect(() => {
    auth()
      .signInAnonymously()
      .then(() => {
        // console.log('User signed in anonymously');
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });
  }, []);

  // Delete Account
  const accountDelete = () => {
    Alert.alert(
      'Are you sure?',
      'Are you sure you want to delete your account?',
      [
        {text: 'No'},
        {
          text: 'Yes',
          onPress: () => {},
        },
      ],
      {cancelable: true},
    );
  };

  // Logout
  const logoutHandeler = async () => {
    await dispatch(authAction.logout());
  };

  // Image Upload
  const imageUpload = async imagePath => {
    setProfile(imagePath);
    // set image name
    const imageName = imagePath.substring(imagePath.lastIndexOf('/') + 1);
    const ext = imageName.split('.').pop();
    const name = imageName.split('.')[0];
    const newImageName = name + Date.now() + '.' + ext;
    const folderPath = user?.companyName
      ? `images/company/${newImageName}`
      : `images/jober/${newImageName}`;
    // console.log(folderPath);

    //FileName
    const uploadUri =
      Platform.OS === 'ios' ? imagePath.replace('file://', '') : imagePath;

    sheetRef.current.snapTo(1);

    setUploading(true);
    setTransferred(0);

    try {
      const imageReference = storage().ref(folderPath);
      const task = imageReference.putFile(uploadUri);
      // set progress state
      task.on('state_changed', snapshot => {
        setTransferred(
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
        );
      });

      task.then(async () => {
        const url = await storage().ref(folderPath).getDownloadURL();
        await dispatch(userAction.updateProfile({companyLogo: url}));
        await dispatch(userAction.fetchUser());
      });
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
  };

  // Image Choose
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      imageUpload(image.path);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(async image => {
      imageUpload(image.path);
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
          {uploading ? (
            <Progress.Bar progress={transferred} width={100} />
          ) : (
            <View>
              {user?.companyName ? (
                <Avatar.Image
                  size={180}
                  source={{
                    uri: user?.companyName ? user?.companyLogo : companyImage,
                  }}
                />
              ) : (
                <Avatar.Image
                  size={180}
                  source={{
                    uri: user?.firstName ? userImage : profile,
                  }}
                />
              )}
              <TouchableOpacity
                style={styles.imageIcon}
                onPress={() => sheetRef.current.snapTo(0)}>
                <MCI
                  name="camera-plus-outline"
                  size={30}
                  color={Color.accent}
                />
              </TouchableOpacity>
            </View>
          )}

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
            <View>
              <ProfileCard
                title="My Profile"
                iconName="chevron-right"
                onPress={() => navigation.navigate('Company Profile')}
              />
              <ProfileCard title="My Resume" iconName="chevron-right" />
            </View>
          )}

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
          <ProfileCard
            title="Delete My Account"
            iconName="delete"
            onPress={() => {
              accountDelete();
            }}
          />
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
  imageIcon: {
    position: 'absolute',
    top: 125,
    right: 10,
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Color.accent,
    borderWidth: 3,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: {width: 2, height: 3},
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
