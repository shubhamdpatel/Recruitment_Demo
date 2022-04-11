import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as companyAction from '../../redux/actions/company';

const CompanyDetialsScreen = ({route}) => {
  const cid = route?.params.params.cid;
  const dispatch = useDispatch();

  const company = useSelector(state => state.company.companyData);

  const fetchCompany = async () => {
    await dispatch(companyAction.fetchCompanyData(cid));
  };

  React.useEffect(() => {
    fetchCompany();
  }, []);

  return (
    <View>
      <Text>CompanyDetialsScreen</Text>
      <Text>{company?.companyName}</Text>
    </View>
  );
};
const styles = StyleSheet.create({});

export default CompanyDetialsScreen;
