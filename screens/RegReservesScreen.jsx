import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { InputField } from "../components/InputField";
import { Box, Select, CheckIcon, ScrollView, VStack, FormControl, Divider, WarningOutlineIcon, Icon, Pressable, Center, Image, Row, Heading, Button, useColorModeValue } from "native-base";
import { ButtonContained } from '../components/ButtonContained';
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { URL_API_BACK_END } from '@env';
import moment from 'moment'; import 'moment/locale/pt-br'

export function RegReservesScreen({ navigation }) {
  const [errors, setErrors] = useState({});
  const [dataInputs, setDataInputs] = useState({});

  const [showReserveDate, setShowReserveDate] = useState(false);
  const [showReturnDate, setShowReturnDate] = useState(false);

  async function setReserve() {
    console.log(dataInputs)
    let reqs = await fetch(URL_API_BACK_END + 'reserves', {
      method: 'POST',

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Id: 30,
        bookId: dataInputs.bookId,
        userId: dataInputs.userId,
        reserveDate: dataInputs.reserveDate,
        returnDate: dataInputs.returnDate,
        reserveStatus: dataInputs.reserveStatus,
        observation: dataInputs.observation
      })
    });
    let ress = await reqs.text();
    console.log(ress)
  }

  const validate = () => {
    if (dataInputs.bookId == undefined) {
      setErrors({ ...errors, bookId: 'O código é obrigatório!' });
      return false;
    } else if (dataInputs.userId == undefined) {
      setErrors({ ...errors, userId: 'A matrícula é obrigatória!' });
      return false;
      /*    } else if (dataInputs.reserveDate == undefined) {
           setErrors({ ...errors, reserveDate: 'A data da reserva é obrigatória!' });
           return false;
         }
         else if (dataInputs.returnDate == undefined) {
           setErrors({ ...errors, returnDate: 'A data da previsão de devolução é obrigatória!' });
           return false; */
    }
    setErrors({});
    return true;
  };

  const registerReserve = () => {
    validate() ? setReserve() : console.log('Validation Failed');
  };

  const onChangeReserveDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowReserveDate(false);
    setDataInputs({ ...dataInputs, reserveDate: currentDate });
    console.log(dataInputs.reserveDate)
  };

  const onChangeReturnDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowReturnDate(false);
    setDataInputs({ ...dataInputs, returnDate: currentDate });
    console.log(dataInputs.returnDate)
  };

  const showModeReserveDate = (currentMode) => {
    if (Platform.OS === 'android') {
      setShowModeReserveDate(false);
      // for iOS, add a button that closes the picker
    }
    setShowModeReserveDate(currentMode);
  };

  const showModeReturnDate = (currentMode) => {
    if (Platform.OS === 'android') {
      setShowReturnDate(false);
      // for iOS, add a button that closes the picker
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
              value={new Date()}
              mode={'date'}
              is24Hour={true}
              onChange={onChangeReturnDate}
            />
          )}
        </Box >
        <ScrollView showsVerticalScrollIndicator={false}>
          <FormControl isRequired isInvalid={'bookId' in errors} mb={2}>
            <FormControl.Label _text={{ bold: true }}>Código do Livro</FormControl.Label>
            <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, bookId: value })} />
            {'bookId' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.bookId}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isRequired isInvalid={'userId' in errors} mb={4}>
            <FormControl.Label _text={{ bold: true }}>Matrícula do Usuário</FormControl.Label>
            <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, userId: value })} />
            {'userId' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.userId}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isRequired isInvalid={'reserveDate' in errors} mb={2}>
            <FormControl.Label _text={{ bold: true }}>Data da Reserva</FormControl.Label>
            <Button leftIcon={<Icon as={Ionicons} name="calendar-outline" size="md" color={'gray.400'} mr={1} />} variant={'solid'} h={'55px'} borderRadius="10" _light={{ bgColor: 'gray.300', _text: { textTransform: 'uppercase', color: 'black', fontSize: 'md' } }} _dark={{ bgColor: 'dark.100', _text: { textTransform: 'uppercase', color: 'white', fontSize: 'md' } }} onPress={() => showDatepickerReserve()}>{moment(dataInputs.reserveDate).locale('pt-BR').format('LLL')}</Button>
            {'reserveDate' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.reserveDate}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isInvalid={'returnDate' in errors} mb={2}>
            <FormControl.Label _text={{ bold: true }}>Data prevista de Retorno</FormControl.Label>
            <Button leftIcon={<Icon as={Ionicons} name="calendar-outline" size="md" color={'gray.400'} mr={1} />} variant={'solid'} h={'55px'} borderRadius="10" _light={{ bgColor: 'gray.300', _text: { textTransform: 'uppercase', color: 'black', fontSize: 'md' } }} _dark={{ bgColor: 'dark.100', _text: { textTransform: 'uppercase', color: 'white', fontSize: 'md' } }} onPress={() => showDatepickerReturn()}>{moment(dataInputs.returnDate).locale('pt-BR').format('LLL')}</Button>
            {'returnDate' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.returnDate}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isRequired isInvalid={'reserveStatus' in errors} mb={5}>
            <FormControl.Label _text={{ bold: true }}>Status da Reserva</FormControl.Label>
            <Select selectedValue={dataInputs.reserveStatus} variant={'rounded'} size={'lg'} borderRadius="10" h="55px" _light={{ bgColor: 'gray.300' }} _dark={{ bgColor: 'dark.100' }} shadow={1} placeholderTextColor={"gray.600"} placeholder=""
              _selectedItem={{ bg: "grey.500", endIcon: <CheckIcon size="5" /> }} mt={1} onValueChange={value => setDataInputs({ ...dataInputs, reserveStatus: value })}>
              <Select.Item label='Ativa' value='Ativa' />
              <Select.Item label='Cancelada' value='Cancelada' />
              <Select.Item label='Concluida' value='Concluida' />
            </Select>
            {'reserveStatus' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.acessGroup}</FormControl.ErrorMessage> : null}
          </FormControl>

          <FormControl isInvalid={'observation' in errors} mb={4}>
            <FormControl.Label _text={{ bold: true }}>Observação</FormControl.Label>
            <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, observation: value })} />
            {'observation' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.observation}</FormControl.ErrorMessage> : null}
          </FormControl>

          <Divider />
          <Box w={'100%'} alignItems={'center'} mt={2} mb={4}>
            <ButtonContained w={'30%'} title={'Cadastrar'} onPress={(registerReserve)} colorScheme="cyan" />
          </Box>
        </ScrollView>

      </VStack>
    </Box>
  );
}