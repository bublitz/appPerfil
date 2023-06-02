import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import SelectDropdown from 'react-native-select-dropdown';
const {width} = Dimensions.get('window');
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  Container,
  HeaderText,
  InputArea,
  Scroller,
  Area,
  InfoArea,
  TitleText,
} from './styles';

import Api from '../../Api';

export default () => {
  const [value, setValue] = useState(null);
  const temas = ['Ano', 'Coisa', 'Digital', 'Filme', 'Lugar', 'Pessoa'];

  const [text, setText] = useState('');
  const [resp, setResp] = useState('');
  const [listQuest, setListQuest] = useState([]);
  const [loadQuest, setLoadQuest] = useState(false);
  const [listHint, setListHint] = useState([]);
  const [loadHint, setLoadHint] = useState(false);

  const [showHint, setShowHint] = useState(false);

  const refInput = useRef(null);

  const handleHintClick = async () => {
    if (text != '' || value != null) {
      setResp('');
      setListQuest([]);
      setLoadHint(true);
      setShowHint(true);
      let json = null;
      try {
        json = await Api.hint(value + ' ' + text);
      } catch (err) {
        Toast.show('Erro: ' + err.message, Toast.LONG);
      } finally {
        setLoadHint(false);
        if (json.error || json.length == 0) {
          Toast.show('Tente novamente!', Toast.LONG);
        } else {
          setResp(json.choices[0].message.content);
          setShowHint(true);
        }
      }
    } else {
      Toast.show('Selecione um tema!', Toast.LONG);
    }
  };

  const handleQuestClick = async () => {
    if (text != '' || value != null) {
      setResp('');
      setListHint([]);
      setLoadQuest(true);
      setShowHint(false);
      let json = null;
      try {
        json = await Api.question(value + ' ' + text);
      } catch (err) {
        Toast.show('Erro: ' + err.message, Toast.LONG);
      } finally {
        setLoadQuest(false);
        if (json.error || json.length == 0) {
          Toast.show('Tente novamente!', Toast.LONG);
        } else {
          setResp(json.choices[0].message.content);
          setShowHint(false);
        }
      }
    } else {
      Toast.show('Selecione um tema e digite o nome!', Toast.LONG);
    }
  };

  useEffect(() => {
    if (resp != '') {
      if (showHint)
        setListHint(
          resp
            .split('\n')
            .filter(linha => linha.charAt(0) <= '9' && linha.charAt(0) >= '0'),
        );
      else
        setListQuest(
          resp
            .split('\n')
            .filter(linha => linha.charAt(0) <= '9' && linha.charAt(0) >= '0'),
        );
    }
  }, [resp]);

  return (
    <Container>
      <Scroller>
        <View style={{minHeight: 10}} />
        <HeaderText>Tema</HeaderText>
        <SelectDropdown
          data={temas}
          defaultButtonText={'Selecione um tema'}
          onSelect={(selectedItem, index) => {
            setValue(selectedItem);
            setText('');
            refInput.current.focus();
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          renderDropdownIcon={isOpened => {
            return (
              <FontAwesome
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                color={'#fff'}
                size={18}
              />
            );
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
        />

        <View style={{minHeight: 20}} />

        <TextInput
          backgroundColor="#fff"
          textColor="#000"
          label={value}
          value={text}
          ref={refInput}
          onChangeText={text => setText(text)}
        />

        <View style={{minHeight: 10}} />

        <InputArea>
          <Button
            style={{width: 150}}
            disabled={value == null}
            mode="contained"
            buttonColor="#000"
            loading={loadHint}
            onPress={handleHintClick}>
            Dicas
          </Button>
          <Button
            style={{width: 150}}
            mode="contained"
            buttonColor="#000"
            disabled={value == null || text == ''}
            loading={loadQuest}
            onPress={handleQuestClick}>
            Questões
          </Button>
        </InputArea>

        {showHint && listHint != null && listHint.length > 1 ? (
          <>
            {listHint.map((item, k) => (
              <Text key={k} text={item} hint={showHint} comp={refInput} />
            ))}
          </>
        ) : (
          <></>
        )}
        {!showHint && listQuest != null && listQuest.length > 1 ? (
          <>
            {listQuest.map((item, k) => (
              <Text key={k} text={item} hint={showHint} comp={refInput} />
            ))}
          </>
        ) : (
          <></>
        )}

        <View style={{minHeight: 10}} />
      </Scroller>
    </Container>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    width,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
  },
  headerTitle: {color: '#000', fontWeight: 'bold', fontSize: 16},
  saveAreaViewContainer: {flex: 1, backgroundColor: '#FFF'},
  viewContainer: {flex: 1, width, backgroundColor: '#FFF'},
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '10%',
    paddingBottom: '20%',
  },

  dropdown1BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '##159',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fff',
  },
  dropdown1BtnTxtStyle: {color: '#fff', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#000', textAlign: 'left'},

  dropdown2BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#444',
    borderRadius: 8,
  },
  dropdown2BtnTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dropdown2DropdownStyle: {
    backgroundColor: '#444',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  dropdown2RowStyle: {backgroundColor: '#444', borderBottomColor: '#C5C5C5'},
  dropdown2RowTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  dropdown3BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    paddingHorizontal: 0,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#444',
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdown3BtnImage: {width: 45, height: 45, resizeMode: 'cover'},
  dropdown3BtnTxt: {
    color: '#444',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },
  dropdown3DropdownStyle: {backgroundColor: 'slategray'},
  dropdown3RowStyle: {
    backgroundColor: 'slategray',
    borderBottomColor: '#444',
    height: 50,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdownRowImage: {width: 45, height: 45, resizeMode: 'cover'},
  dropdown3RowTxt: {
    color: '#F1F1F1',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },

  dropdown4BtnStyle: {
    width: '50%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown4BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown4DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown4RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown4RowTxtStyle: {color: '#444', textAlign: 'left'},
});
