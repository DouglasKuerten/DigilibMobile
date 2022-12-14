import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { InputField } from "../components/InputField";
import { Box, Select, CheckIcon, ScrollView, VStack, FormControl, Divider, WarningOutlineIcon, Icon, useToast, Center, Image, Row, Heading, Button, useColorModeValue } from "native-base";
import { ButtonContained } from '../components/ButtonContained';
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { URL_API_BACK_END } from '@env';
import moment from 'moment'; import 'moment/locale/pt-br'
import { ToastAlert } from '../components/ToastAlert';

export function RegReservesScreen({ navigation }) {
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const toastIdRef = React.useRef();
  const [dataInputs, setDataInputs] = useState({
    internalCode: null,
    registration: null,
    reserveDate: new Date(),
    returnDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    reserveStatus: 'Ativa',
    observation: null
  });
  const [dataBook, setDataBook] = useState({ id: null });
  const [dataUser, setDataUser] = useState({ id: null });

  const [showReserveDate, setShowReserveDate] = useState(false);
  const [showReturnDate, setShowReturnDate] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false)
  const [isLoadingBook, setIsLoadingBook] = useState('');
  const [isLoadingUser, setIsLoadingUser] = useState('');


  async function setReserve() {
    await fetch(URL_API_BACK_END + 'reserves', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookId: dataBook.id,
        userId: dataUser.id,
        reserveDate: dataInputs.reserveDate,
        returnDate: dataInputs.returnDate,
        reserveStatus: dataInputs.reserveStatus,
        observation: dataInputs.observation
      })
    }).then(() => {
      const idAtivo = toastIdRef !== undefined ? toastIdRef.current : null;
      if (!toast.isActive(idAtivo)) {
        toastIdRef.current = toast.show({
          render: ({ id }) => {
            return <ToastAlert id={id} title={"Sucesso"} status={'success'} description={"Livro emprestado com sucesso!"} varToast={toast} />
          }
        });
      };
    })
  }

  const validate = () => {
    Object.keys(errors).forEach(key => {
      delete errors[key];
    })
    if (dataBook.id == null) {
      setErrors(Object.assign(errors, { internalCode: 'O c??digo ?? obrigat??rio!' }));
    }
    if (dataBook.id == null) {
      setErrors(Object.assign(errors, { registration: 'A matr??cula ?? obrigat??ria' }));
    } else if (!Number.isInteger(Number(dataInputs.registration))) {
      setErrors(Object.assign(errors, { registration: 'Somente n??meros s??o aceitos na matr??cula' }));
    } else if (dataInputs.registration.length > 11) {
      setErrors(Object.assign(errors, { registration: 'A matr??cula informado ?? muito grande (M??x. 11)' }));
    }
    if (dataInputs.reserveDate == undefined) {
      setErrors(Object.assign(errors, { reserveDate: 'A data da reserva ?? obrigat??ria!' }));
    }
    if (dataInputs.returnDate == undefined) {
      setErrors(Object.assign(errors, { returnDate: 'A data da previs??o de devolu????o ?? obrigat??ria!' }));
    }
    return Object.values(errors).length == 0 ? true : false;
  };

  async function registerReserve() {
    if (validate()) {
      setIsLoadingButton(true);
      await setReserve();
      setDataInputs({
        internalCode: null,
        registration: null,
        reserveDate: new Date(),
        returnDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        reserveStatus: 'Ativa',
        observation: null
      });
      setIsLoadingUser('');
      setIsLoadingBook('');
    } else {
      const idAtivo = toastIdRef !== undefined ? toastIdRef.current : null;
      if (!toast.isActive(idAtivo)) {
        toastIdRef.current = toast.show({
          render: ({ id }) => {
            return <ToastAlert id={id} title={"Erro ao emprestar livro"} status={'error'} description={"A valida????o de um ou mais campos falhou, revise todas as informa????es e tente novamente!"} varToast={toast} />
          }
        });
      }
    }
    setIsLoadingButton(false);
  };
  const getUser = async (registration) => {
    try {
      setIsLoadingUser('Buscando...')
      const response = await fetch(URL_API_BACK_END + 'users/registration/' + registration);
      const json = await response.json();
      setDataUser(json);
      setIsLoadingUser(json.name === 'SequelizeDatabaseError' || json.name === undefined ? 'Usu??rio n??o encontrado' : json.name)
    } catch (error) {
      setIsLoadingUser("Valor Inv??lido")
      // console.error(error);
    }
  }
  const getBook = async (internalCode) => {
    try {
      setIsLoadingBook('Buscando...')
      const response = await fetch(URL_API_BACK_END + 'books/internalCode/' + internalCode);
      const json = await response.json();
      setDataBook(json);
      setIsLoadingBook(json.title === 'SequelizeDatabaseError' || json.title === undefined ? 'Livro n??o encontrado' : json.title)
    } catch (error) {
      setIsLoadingBook("Valor Inv??lido")
      // console.error(error);
    }
  }

  const onChangeBookInternalCode = (value) => {
    if (Number.isInteger(Number(value))) {
      setDataInputs({ ...dataInputs, internalCode: value })
      getBook(value);
    }

  }
  const onChangeUserRegistration = (value) => {
    if (Number.isInteger(Number(value))) {
      setDataInputs({ ...dataInputs, registration: value })
      getUser(value);
    }
  }

  const onChangeReserveDate = (event, selectedDate) => {
    setShowReserveDate(false);
    if (event.type == 'set') {
      const currentDate = selectedDate;
      setDataInputs({ ...dataInputs, reserveDate: currentDate });
    }
  };

  const onChangeReturnDate = (event, selectedDate) => {
    setShowReturnDate(false);
    if (event.type == 'set') {
      const currentDate = selectedDate;
      setDataInputs({ ...dataInputs, returnDate: currentDate });
    }
  };

  const showModeReserveDate = (currentMode) => {
    if (Platform.OS === 'android') {
      setShowModeReserveDate(false);
    }
    setShowModeReserveDate(currentMode);
  };

  const showModeReturnDate = (currentMode) => {
    if (Platform.OS === 'android') {
      setShowReturnDate(false);
    }
    setShowReturnDate(currentMode);
  };

  const showDatepickerReserve = () => {
    setShowReserveDate(true);

  };
  const showDatepickerReturn = () => {
    setShowReturnDate(true);
  };

  const showTimepicker = () => {
    setShowReserveDate(true);
  };

  return (
    <Box flex={1} _light={{ bgColor: 'gray.100' }} _dark={{ bgColor: 'dark.50' }}>
      <VStack marginX={3} /* maxW="300px" */>
        <Box>
          {showReserveDate && (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              mode={'date'}
              is24Hour={true}
              onChange={onChangeReserveDate}
            />
          )}
          {showReturnDate && (
            <DateTimePicker
              testID="dateTimePickerReturn"
              value={new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)}
              mode={'date'}
              is24Hour={true}
              onChange={onChangeReturnDate}
            />
          )}
        </Box >
        <ScrollView showsVerticalScrollIndicator={false}>
          <FormControl isRequired isInvalid={'internalCode' in errors} mb={2}>
            <FormControl.Label _text={{ bold: true }}>C??digo do Livro</FormControl.Label>
            <Row>
              <InputField w={'30%'} mr={1} placeholder="" keyboardType='numeric' onChangeText={value => onChangeBookInternalCode(value)} value={dataInputs.internalCode} />
              <InputField isDisabled={true} flex={1} placeholder="" value={isLoadingBook} />
            </Row>
            {'internalCode' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.internalCode}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isRequired isInvalid={'registration' in errors} mb={4}>
            <FormControl.Label _text={{ bold: true }}>Matr??cula do Usu??rio</FormControl.Label>
            <Row>
              <InputField w={'30%'} mr={1} placeholder="" keyboardType='numeric' onChangeText={value => onChangeUserRegistration(value)} value={dataInputs.registration} />
              <InputField isDisabled={true} flex={1} placeholder="" value={isLoadingUser} />
            </Row>
            {'registration' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.registration}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isRequired isInvalid={'reserveDate' in errors} mb={2}>
            <FormControl.Label _text={{ bold: true }}>Data da Reserva</FormControl.Label>
            <Button leftIcon={<Icon as={Ionicons} name="calendar-outline" size="md" color={'gray.400'} mr={1} />} variant={'solid'} h={'55px'} borderRadius="10" _light={{ bgColor: 'gray.300', _text: { textTransform: 'uppercase', color: 'black', fontSize: 'md' } }} _dark={{ bgColor: 'dark.100', _text: { textTransform: 'uppercase', color: 'white', fontSize: 'md' } }} onPress={() => showDatepickerReserve()}>{moment(dataInputs.reserveDate).locale('pt-BR').format('LLL')}</Button>
            {'reserveDate' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.reserveDate}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isRequired isInvalid={'returnDate' in errors} mb={2}>
            <FormControl.Label _text={{ bold: true }}>Data Prevista de Devolu????o</FormControl.Label>
            <Button leftIcon={<Icon as={Ionicons} name="calendar-outline" size="md" color={'gray.400'} mr={1} />} variant={'solid'} h={'55px'} borderRadius="10" _light={{ bgColor: 'gray.300', _text: { textTransform: 'uppercase', color: 'black', fontSize: 'md' } }} _dark={{ bgColor: 'dark.100', _text: { textTransform: 'uppercase', color: 'white', fontSize: 'md' } }} onPress={() => showDatepickerReturn()}>{moment(dataInputs.returnDate).locale('pt-BR').format('LLL')}</Button>
            {'returnDate' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.returnDate}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isRequired isInvalid={'reserveStatus' in errors} mb={5}>
            <FormControl.Label _text={{ bold: true }}>Status da Reserva</FormControl.Label>
            <Select selectedValue={dataInputs.reserveStatus} variant={'rounded'} size={'lg'} borderRadius="10" h="55px" _light={{ bgColor: 'gray.300' }} _dark={{ bgColor: 'dark.100' }} shadow={1} placeholderTextColor={"gray.600"} placeholder=""
              _selectedItem={{ bg: "grey.500", endIcon: <CheckIcon size="5" /> }} mt={1} onValueChange={value => setDataInputs({ ...dataInputs, reserveStatus: value })} value={dataInputs.reserveStatus}>
              <Select.Item label='Ativa' value='Ativa' />
              <Select.Item label='Cancelada' value='Cancelada' />
              <Select.Item label='Concluida' value='Concluida' />
            </Select>
            {'reserveStatus' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.acessGroup}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isInvalid={'observation' in errors} mb={4}>
            <FormControl.Label _text={{ bold: true }}>Observa????o</FormControl.Label>
            <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, observation: value })} />
            {'observation' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.observation}</FormControl.ErrorMessage> : null}
          </FormControl>

          <Divider />
          <Box w={'100%'} alignItems={'center'} mt={2} mb={4}>
            <ButtonContained isLoading={isLoadingButton} w={'30%'} title={'Cadastrar'} onPress={(registerReserve)} colorScheme="cyan" />
          </Box>
        </ScrollView>

      </VStack>
    </Box>
  );
}
