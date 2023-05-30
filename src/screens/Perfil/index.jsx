import React, {useState, useEffect, useRef} from 'react';
import {StatusBar, Text, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import SelectDropdown from 'react-native-select-dropdown';

import {
  Container,
  LoadingIcon,
  HeaderText,
  InputArea,
  Scroller,
  RespText,
} from './styles';

import Api from '../../Api';

export default () => {
  const [value, setValue] = useState(null);
  const lista = ['Ano', 'Coisa', 'Digital', 'Filme', 'Lugar', 'Pessoa'];

  const [text, setText] = useState('');
  const [resp, setResp] = useState('');
  const [loading, setLoading] = useState(false);

  const refInput = useRef(null);

  const handleDicasClick = async () => {
    if (value != null) {
      setLoading(true);
      let json = await Api.dicas(value + ' ' + text);
      setLoading(false);

      if (json.error || json.legth == 0) {
        Toast.show('Erro', Toast.LONG);
      } else {
        setResp(json.choices[0].message.content);
      }
    } else {
      Toast.show('Selecione um tema!', Toast.LONG);
    }
  };

  const handleGerarClick = async () => {
    if (text != '' || value != null) {
      setLoading(true);
      let json = await Api.question(value + ' ' + text);
      setLoading(false);

      if (json.error || json.legth == 0) {
        Toast.show('Erro', Toast.LONG);
      } else {
        setResp(json.choices[0].message.content);
      }
    } else {
      Toast.show('Selecione um tema e digite o valor!', Toast.LONG);
    }
  };

  return (
    <Container>
      <Scroller>
        <InputArea>
          <SelectDropdown
            buttonColor="#023"
            data={lista}
            defaultButtonText={'Selecione o tema'}
            onSelect={(selectedItem, index) => {
              setValue(selectedItem);
              setText('');
              refInput.current.focus();
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />
        </InputArea>

        <View style={{minHeight: 10}} />

        <TextInput
          label={value}
          value={text}
          ref={refInput}
          onChangeText={text => setText(text)}
        />

        <InputArea>
          <Button
            mode="contained"
            buttonColor="#000"
            loading={loading}
            onPress={handleDicasClick}>
            Dicas
          </Button>
          <Button
            mode="contained"
            buttonColor="#000"
            loading={loading}
            onPress={handleGerarClick}>
            Gerar
          </Button>
        </InputArea>
        <RespText>{resp}</RespText>
      </Scroller>
    </Container>
  );
};
