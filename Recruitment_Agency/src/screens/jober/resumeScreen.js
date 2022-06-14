import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DocumentPicker, {types} from 'react-native-document-picker';
import {useSelector, useDispatch} from 'react-redux';
import storage from '@react-native-firebase/storage';
import {Card, Title} from 'react-native-paper';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as userAction from '../../redux/actions/user';

const ResumeScreen = () => {
  const user = useSelector(state => state.user.userProfile[0]);
  const userType = useSelector(state => state.auth.user.userType);
  const [file, setFile] = React.useState(user?.resume ?? '');
  const [uploading, setUploading] = React.useState(false);
  // const [transferred, setTransferred] = React.useState(0);
  const dispatch = useDispatch();

  const chooseFile = async () => {
    try {
      const files = await DocumentPicker.pick({
        presentationStyle: 'FullScreen',
        copyTo: 'cachesDirectory',
        type: [types.allFiles],
      });

      const fileName = files[0].name;
      const ext = fileName.split('.').pop();
      const name = fileName.split('.')[0];
      const newFileName = name + Date.now() + '.' + ext;

      const type = files[0].type.split('/')[0];
      let folderPath;
      if (type === 'image') {
        folderPath =
          userType === 'Company'
            ? `images/company/${newFileName}`
            : `images/jober/${newFileName}`;
      } else if (type === 'application') {
        folderPath = userType === 'Jober' ? `resume/${newFileName}` : '';
      } else {
        console.log('Something Wrong!');
      }

      // FileName
      const fileUri = files[0].fileCopyUri;
      const uploadUri =
        Platform.OS === 'ios' ? fileUri.replace('file://', '') : fileUri;

      try {
        setUploading(true);
        // setTransferred(0);
        const fileReference = storage().ref(folderPath);
        const task = fileReference.putFile(uploadUri);

        // set progress state
        // task.on('state_changed', snapshot => {
        //   transferred.current =
        //     Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // });

        task.then(async () => {
          const url = await storage().ref(folderPath).getDownloadURL();
          setFile(url);
          if (type === 'image') {
            await dispatch(
              userAction.fileUpload(
                userType === 'Company'
                  ? {companyLogo: url}
                  : {profileImage: url},
              ),
            );
          } else if (type === 'application') {
            await dispatch(
              userAction.fileUpload(userType === 'Jober' ? {resume: url} : ''),
            );
          }

          await dispatch(userAction.fetchUser());
          setUploading(false);
        });
      } catch (e) {
        console.error(e);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs
      } else {
        console.warn(err);
        throw err;
      }
    }
  };

  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  const Icon = file ? Ionicons : MCI;
  const name = file ? 'checkmark-done' : 'upload';
  const color = file ? 'green' : 'gray';

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Upload Resume</Text>
      <Text style={styles.text}>
        Plase upload your resume in PDF format, We also support DOC, DOCX, JPG,
        JPEG, PNG format.
      </Text>
      <View
        style={{
          borderTopLeftRadius: Platform.OS === 'android' ? 20 : 0,
          borderTopRightRadius: Platform.OS === 'android' ? 20 : 0,
          borderBottomLeftRadius: Platform.OS === 'android' ? 35 : 0,
          borderBottomRightRadius: Platform.OS === 'android' ? 35 : 0,
          overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        }}>
        <TouchableCmp onPress={() => chooseFile()}>
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.card1stView}>
                <Title style={styles.title}>
                  Click To {file ? 'Update' : 'Upload'} Resume
                </Title>

                {uploading ? (
                  <ActivityIndicator size="small" />
                ) : (
                  <Icon name={name} color={color} size={30} />
                )}
              </View>
            </Card.Content>
          </Card>
        </TouchableCmp>
      </View>
      <Text
        style={{
          ...styles.text,
          marginLeft: 15,
          color: file ? 'green' : '#b31409',
        }}>
        {file ? 'Your Resume Uploaded SuccessFully' : 'Resume Not Uploaded'}
      </Text>
    </View>
  );
};

export default ResumeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: 'black',
    paddingBottom: 10,
  },
  text: {
    fontSize: 14,
    color: 'gray',
    paddingBottom: 30,
    paddingTop: 5,
  },
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {width: 8, height: 5},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 20,
    backgroundColor: 'white',
    // marginLeft: 10,
    // marginRight: 10,
    marginBottom: 10,
    // marginTop: 20,
  },
  card1stView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card2ndView: {
    flexDirection: 'row',
  },
  title: {
    color: 'black',
    fontSize: 18,
  },
});
