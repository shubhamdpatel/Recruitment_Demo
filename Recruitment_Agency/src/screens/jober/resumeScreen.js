import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Card from '../../components/profileCard';
import DocumentPicker from 'react-native-document-picker';

const ResumeScreen = () => {
  const chooseFile = async () => {
    try {
      const files = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(files);
      //   setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <Card
      title="Upload Resume"
      iconName="upload"
      style={{marginTop: 20}}
      onPress={() => chooseFile()}
    />
  );
};

export default ResumeScreen;

const styles = StyleSheet.create({});
