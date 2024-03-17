import React, { useState, useEffect } from 'react';
import { ScrollView, Alert } from 'react-native';
import { NativeBaseProvider, Box, Heading, Text, Center, HStack, VStack, Button, Stack } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BettingScreen = ({ route }) => {
    const { matchInformation } = route.params;
    const [onChangeValue, setOnChangeValue] = useState(0);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const encryptedUserData = await AsyncStorage.getItem('user');
            if (encryptedUserData) {
                const userData = JSON.parse(encryptedUserData);
                // console.log('userData' , userData);
                setUserData(userData);
            } else {
                console.log('User data not found');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            Alert.alert('Error fetching user data:', error);
        }
    };

    const getWinner = (team1Wins, team2Wins) => {
        return team1Wins > team2Wins ? matchInformation.params.team1 : matchInformation.params.team2;
    };

    const handlePlaceBet = async () => {
        try {
            const encryptedUserData = await AsyncStorage.getItem('user');
            let userData = {};
            if (encryptedUserData) {
                userData = JSON.parse(encryptedUserData);
            }
            
            const matchId = matchInformation.params.id;
            
            if (userData.hasOwnProperty(matchId)) {
                if (Array.isArray(userData[matchId])) {
                    userData[matchId].push({
                        betAmount: onChangeValue,
                        matchInfo: matchInformation
                    });
                } else {
                    userData[matchId] = [{
                        betAmount: onChangeValue,
                        matchInfo: matchInformation
                    }];
                }
            } else {
                userData[matchId] = [{
                    betAmount: onChangeValue,
                    matchInfo: matchInformation
                }];
            }
    
            // Save updated user data
            await AsyncStorage.setItem('user', JSON.stringify(userData));
    
            // Notify the user that the bet has been placed
            Alert.alert('Success', 'Your bet has been placed successfully!');
        } catch (error) {
            console.error('Error placing bet:', error);
            Alert.alert('Error placing bet:', error);
        }
    };

    return (
        <NativeBaseProvider>
            <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
                <Box flex={1}>
                    <LinearGradient
                        colors={['#4e54c8', '#8f94fb']}
                        start={[0, 0]}
                        end={[1, 1]}
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Heading my={'15%'} color="white" mb={4}>
                            Match Scheduling
                        </Heading>
                    </LinearGradient>
                </Box>
                <Box px={4} py={2} backgroundColor="#f0f2f5" borderRadius={8} margin={4}>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        Match Information
                    </Text>
                    <Text fontSize="md">Team 1: {matchInformation.params.team1}</Text>
                    <Text fontSize="md">Team 2: {matchInformation.params.team2}</Text>
                    <Text fontSize="md">Date: {matchInformation.params.date}</Text>
                    <Text fontSize="md">Time: {matchInformation.params.time}</Text>
                    <Text fontSize="md">Venue: {matchInformation.params.venue}</Text>
                    <Text fontSize="md">City: {matchInformation.params.city}</Text>
                    <Text fontSize="md" color="green.500" fontWeight="bold" mt={2}>
                        {getWinner(matchInformation.team1Wins, matchInformation.team2Wins)} has higher chances to win
                    </Text>
                </Box>
                <VStack px={3} py={2}>
                    <Heading size={'md'}>Place your Bet!</Heading>
                </VStack>
                <Center flex={1} bg="#f0f2f5">
                    <Stack space={4} alignItems="center" w="75%" maxW="300">
                        <Text textAlign="center" fontSize={'md'}>Bet Amount: {onChangeValue}</Text>
                        {[...Array(route.params.contest.returnAmount / route.params.contest.price).keys()].map((index) => (
                            <Button
                                key={index}
                                width={100}
                                mb={2}
                                variant="outline"
                                colorScheme="cyan"
                                onPress={() => setOnChangeValue((index + 1) * route.params.contest.price)}
                            >
                                <HStack>
                                    <Text>$</Text>
                                    <Text>{(index + 1) * route.params.contest.price}</Text>
                                </HStack>
                            </Button>
                        ))}
                    </Stack>
                </Center>
                <Center mb={10} marginTop={10}>
                    <Button w={'90%'} borderRadius={10} size={'md'} colorScheme="blueGray" onPress={handlePlaceBet}>Place Bet</Button>
                </Center>
            </ScrollView>
        </NativeBaseProvider>
    );
};

export default BettingScreen;
