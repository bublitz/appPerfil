import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 15px;
  background-color: #0069ea;
`;

export const LoadingIcon = styled.ActivityIndicator`
  margin-top: 50px;
  margin-bottom: 50px;
`;

export const HeaderText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 5px;
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
  padding: 5px;
  background-color: #0069ea;
`;

export const RespText = styled.Text`
  font-size: 14px;
  color: #fff;
  padding: 10px;
`;

export const Area = styled.TouchableOpacity`
  border-radius: 10px;
  border: 2px solid #fff;
  justify-content: center;
  width: 100%;
  margin-bottom: 5px;
  background-color: #0a1c2d;
`;

export const InfoArea = styled.View`
  flex: 1;
  margin-left: 15px;
  margin-right: 5px;
  align-itens: center;
  justify-content: center;
`;

export const TitleText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 5px;
  color: #e4e4e4;
`;
