import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 10px;
`;

export const LoadingIcon = styled.ActivityIndicator`
  margin-top: 50px;
  margin-bottom: 50px;
`;

export const HeaderText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #000;
`;

export const InputArea = styled.View`
  width: 100%;
  padding: 20px;
  justify-content: space-between;
  flex-direction: row;
`;

export const CallButton = styled.TouchableOpacity`
  height: 60px;
  background-color: #000;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`;

export const CallButtonText = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
`;

export const Scroller = styled.ScrollView`
  flex: 1;
  padding: 10px;
  background-color: #fff;
`;

export const RespText = styled.Text`
  font-size: 14px;
  color: #000;
  padding: 10px;
`;

export const Area = styled.TouchableOpacity`
  border-radius: 20px;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 20px;
`;

export const InfoArea = styled.View`
  flex: 1;
  margin-left: 15px;
  margin-right: 15px;
  align-itens: center;
`;

export const TitleText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #ffffff;
`;
