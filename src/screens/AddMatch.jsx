import React, { useState } from 'react';
import { NativeBaseProvider, Box, VStack, Text, Pressable, Image, Center, Stack, Input, Icon, Button, Select } from 'native-base';
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import * as Calendar from 'expo-calendar';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialIcons } from '@expo/vector-icons';

const AddMatch = () => {
    const [teamOneName, setTeamOneName] = useState('');
    const [teamTwoName, setTeamTwoName] = useState('');
    const [venue, setVenue] = useState('');
    const [city, setCity] = useState('');
    const [matchDate, setMatchDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [time, setTime] = useState('');

    const navigation = useNavigation();

    const handleAddMatch = () => {
        const message = JSON.stringify({ teamOneName, teamTwoName, venue, matchDate, time });
        Alert.alert('Match added successfully', message);
        console.log('Match added successfully', { teamOneName, teamTwoName, venue, matchDate, time });
        setTeamOneName('');
        setTeamTwoName('');
        setVenue('');
        setCity('');
        setMatchDate('');
        setTime('');
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const handleConfirm = (date) => {
        setMatchDate(date);
        hideDatePicker();
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    // for time picker
    const handleConfirmTime = (selectedDate) => {
        const selectedTime = selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setTime(selectedTime);
        hideTimePicker();
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };


    return (
        <NativeBaseProvider>
            <Box bg="#fff" flex={1}>
                <VStack
                    space={2}
                    justifyContent="center"
                    alignItems="center"
                    safeAreaTop
                    my={6}
                    mb={6}
                >
                    <Center>
                        <Image
                            size={200}
                            borderRadius={30}
                            source={{
                                uri: "https://th.bing.com/th/id/R.7f36e876afd82edbabf30233de73a572?rik=qP9oum1VFYzSeQ&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_387193.png&ehk=tBHG5ltNThs2lv5G6jlHcTF2vO2lnNybljMXBIcXlhI%3d&risl=&pid=ImgRaw&r=0",
                            }}
                            alt="Alternate Text"
                        />
                    </Center>
                </VStack>
                <VStack space={5} my={2} alignItems={"center"}>
                    <Text color={'#01295f'} bold fontSize={"xl"} maxW="300" w="80%" textAlign={"center"}>
                        Add Match Details
                    </Text>
                </VStack>
                {/* Team One Name */}
                <Stack space={2} my={4} w="75%" maxW="300px" mx="auto">
                    <Input
                        size={"lg"}
                        value={teamOneName}
                        onChangeText={setTeamOneName}
                        w={{
                            base: "100%",
                            md: "55%",
                        }}
                        alignSelf={"center"}
                        InputLeftElement={
                            <Icon
                                as={<AntDesign name="team" />}
                                size={5}
                                ml="2"
                                color="muted.400"
                            />
                        }
                        placeholder="Enter Team One Name"
                    />
                </Stack>
                {/* Team Two Name */}
                <Stack space={2} my={1} w="75%" maxW="300px" mx="auto">
                    <Input
                        size={"lg"}
                        value={teamTwoName}
                        onChangeText={setTeamTwoName}
                        w={{
                            base: "100%",
                            md: "55%",
                        }}
                        alignSelf={"center"}
                        InputLeftElement={
                            <Icon
                                as={<AntDesign name="team" />}
                                size={5}
                                ml="2"
                                color="muted.400"
                            />
                        }
                        placeholder="Enter Team Two Name"
                    />
                </Stack>
                {/* Venue */}
                <Stack space={2} my={4} w="75%" maxW="300px" mx="auto">
                    <Input
                        size={"lg"}
                        value={venue}
                        onChangeText={setVenue}
                        w={{
                            base: "100%",
                            md: "55%",
                        }}
                        alignSelf={"center"}
                        InputLeftElement={
                            <Icon
                                as={<MaterialIcons name="place" />}
                                size={5}
                                ml="2"
                                color="muted.400"
                            />
                        }
                        placeholder="Enter Venue"
                    />
                </Stack>
                {/* City */}
                <Stack space={2} my={1} w="75%" maxW="300px" mx="auto">
                    <Input
                        size={"lg"}
                        value={city}
                        onChangeText={setCity}
                        w={{
                            base: "100%",
                            md: "55%",
                        }}
                        alignSelf={"center"}
                        InputLeftElement={
                            <Icon
                                as={<AntDesign name="home" />}
                                size={5}
                                ml="2"
                                color="muted.400"
                            />
                        }
                        placeholder="Enter City"
                    />
                </Stack>
                {/* Date and Time inputs */}
                <Stack space={2} my={4} w="75%" maxW="300px" mx="auto">
                    <Button onPress={showDatePicker}>Select Match date</Button>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                </Stack>
                <Stack space={2} w="75%" maxW="300px" mx="auto">
                    <Button onPress={showTimePicker} >Select Match Timings</Button>
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={handleConfirmTime}
                        onCancel={hideTimePicker}
                        is24Hour={true}
                    />
                </Stack>
                {/* Button for adding match */}
                <Stack space={4} my={6} w="75%" maxW="300px" mx="auto">
                    <Button borderRadius={10} bg={'blue.400'} size={'md'} onPress={handleAddMatch}>
                        Add Match
                    </Button>
                </Stack>
            </Box>
        </NativeBaseProvider>
    )
}

export default AddMatch;