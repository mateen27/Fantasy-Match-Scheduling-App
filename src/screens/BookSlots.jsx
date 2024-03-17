import React from 'react';
import { ScrollView } from 'react-native';
import { NativeBaseProvider, Box, Heading, Text, Center, HStack, Spacer, VStack, Button } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { bettingContest } from '../data/bettingContestData';

const BookSlots = ({ route }) => {
    const navigation = useNavigation();

    const matchInformation = route;
    // console.log('matchInformation', {matchInformation})

    // Filter bettingData based on price categories
    const lowPriceContests = bettingContest.filter(contest => contest.price <= 50);
    // console.log(lowPriceContests);
    const mediumPriceContests = bettingContest.filter(contest => contest.price > 50 && contest.price <= 100);
    const highPriceContests = bettingContest.filter(contest => contest.price > 100);
    const customBetContest = bettingContest.filter(contest => contest.id === 6);

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
                        <Heading my={'10%'} color="white" mb={4}>
                            Match Information
                        </Heading>
                        <HStack space={4} mb={3} margin={3}>
                            <Text color="white" fontSize="xl" fontWeight={'semibold'}>
                                {route.params.team1}
                            </Text>
                            <Spacer />
                            <Text color="white" fontSize="xl" fontWeight={'semibold'}>
                                vs
                            </Text>
                            <Spacer />
                            <Text color="white" fontSize="xl" fontWeight={'semibold'}>
                                {route.params.team2}
                            </Text>
                        </HStack>
                    </LinearGradient>
                </Box>
                <Heading size={'md'} mx={3} my={3}>Betting Contests</Heading>
                <VStack>
                    {/* Low Price Contests */}
                    <Heading mx={3} my={2} size="sm">Low Price Contests (&#8804; $50)</Heading>
                    {lowPriceContests.map((contest, index) => (
                        <HStack key={index} bg={'#f8f8ff'} padding={5} my={2} justifyContent="space-between">
                            <Box>
                                <Text fontWeight={'bold'}>{contest.name}</Text>
                                <Text>{contest.description}</Text>
                                <Text fontWeight={'light'} fontStyle={'italic'}>Slots Left: {contest.slotsLeft}</Text>
                            </Box>
                            <Button bg={'#6167ce'} onPress={() => navigation.navigate('BettingScreen',  { contest, matchInformation } )}>Bet Now</Button>
                        </HStack>
                    ))}

                    {/* Medium Price Contests */}
                    <Heading size="sm" mx={3} my={2}>Medium Price Contests ($51 - $100)</Heading>
                    {mediumPriceContests.map((contest, index) => (
                        <HStack key={index} bg={'#f8f8ff'} padding={5} my={2} justifyContent="space-between">
                            <Box>
                                <Text fontWeight={'bold'}>{contest.name}</Text>
                                <Text>{contest.description}</Text>
                                <Text fontWeight={'light'} fontStyle={'italic'}>Slots Left: {contest.slotsLeft}</Text>
                            </Box>
                            <Button bg={'#6167ce'} onPress={() => navigation.navigate('BettingScreen',  { contest, matchInformation } )}>Bet Now</Button>
                        </HStack>
                    ))}

                    {/* High Price Contests */}
                    <Heading mx={3} my={2} size="sm">High Price Contests (&gt; $100)</Heading>
                    {highPriceContests.map((contest, index) => (
                        <HStack key={index} bg={'#f8f8ff'} padding={5} my={2} justifyContent="space-between">
                            <Box>
                                <Text fontWeight={'bold'}>{contest.name}</Text>
                                <Text>{contest.description}</Text>
                                <Text fontWeight={'light'} fontStyle={'italic'}>Slots Left: {contest.slotsLeft}</Text>
                            </Box>
                            <Button bg={'#6167ce'} onPress={() => navigation.navigate('BettingScreen',  { contest, matchInformation } )}>Bet Now</Button>
                        </HStack>
                    ))}

                    {/* Custom Bet Contests */}
                    <Heading mx={3} my={2} size="sm">Custom Bet ( $10 - $2000 )</Heading>
                    {customBetContest.map((contest, index) => (
                        <HStack key={index} bg={'#f8f8ff'} padding={5} my={2} justifyContent="space-between">
                            <Box>
                                <Text fontWeight={'bold'}>{contest.name}</Text>
                                <Text>{contest.description}</Text>
                                <Text fontWeight={'light'} fontStyle={'italic'}>Slots Left: {contest.slotsLeft}</Text>
                            </Box>
                            <Button bg={'#6167ce'}  onPress={() => navigation.navigate('BettingScreen',  { contest, matchInformation } )}>Bet Now</Button>
                        </HStack>
                    ))}
                </VStack>
            </ScrollView>
        </NativeBaseProvider>
    );
};

export default BookSlots;
