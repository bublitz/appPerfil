import styled from 'styled-components/native';

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
