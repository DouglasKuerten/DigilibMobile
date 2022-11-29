import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { InputField } from "../components/InputField";
import { Box, Select, CheckIcon, ScrollView, VStack, FormControl, Divider, WarningOutlineIcon, Icon, Pressable, Center, Image, Row, Heading, Button } from "native-base";
import { ButtonContained } from '../components/ButtonContained';
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { URL_API_BACK_END } from '@env';
import moment from 'moment'; import 'moment/locale/pt-br'

export function RegReservesScreen({ navigation }) {
  const [errors, setErrors] = useState({});
  const [dataInputs, setDataInputs] = useState({});

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

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

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDataInputs({ ...dataInputs, reserveDate: currentDate });
    console.log(dataInputs.reserveDate)
  };

  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
    setShow(true);
  };

  const showTimepicker = () => {
    showMode('time');
    setShow(true);
  };

  return (
    <VStack marginX={3} /* maxW="300px" */>
      <Box>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </Box>
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
          <Button leftIcon={<Icon as={Ionicons} name="calendar-outline" size="md" color={'black'} mr={1} />} _text={{ textTransform: 'uppercase', color: 'black', fontSize: 'md' }} variant={'solid'} h={'55px'} borderRadius="10" bgColor="gray.300" onPress={showDatepicker}>{moment(dataInputs.reserveDate).locale('pt-BR').format('LLLL')}</Button>
          {'reserveDate' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.reserveDate}</FormControl.ErrorMessage> : null}
        </FormControl>

        <FormControl isInvalid={'returnDate' in errors} mb={2}>
          <FormControl.Label _text={{ bold: true }}>Data prevista de Retorno</FormControl.Label>
          <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, returnDate: value })} />
          {'returnDate' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.returnDate}</FormControl.ErrorMessage> : null}
        </FormControl>

        <FormControl isInvalid={'reserveStatus' in errors} mb={4}>
          <FormControl.Label _text={{ bold: true }}>Status da Reserva</FormControl.Label>
          <InputField placeholder="" onChangeText={value => setDataInputs({ ...dataInputs, reserveStatus: value })} />
          {'reserveStatus' in errors ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.reserveStatus}</FormControl.ErrorMessage> : null}
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
  );
}