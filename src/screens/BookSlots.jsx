import React from 'react';
import { ScrollView } from 'react-native';
import { NativeBaseProvider, Box, Heading, Text, Center, HStack, Spacer } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const BookSlots = (matchInfo) => {
    // console.log(matchInfo.route.params.team1);
    const navigation = useNavigation()
    return (
        <NativeBaseProvider>
            <ScrollView style={{ flex: 1 }}>
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
                        <HStack space={4}>
                            <Text color="white" fontSize="xl" fontWeight={'semibold'}>
                                {matchInfo.route.params.team1}
                            </Text>
                            <Spacer />
                            <Text color="white" fontSize="xl" fontWeight={'semibold'}>
                            {matchInfo.route.params.team2}
                            </Text>
                        </HStack>
                    </LinearGradient>
                </Box>
            </ScrollView>
        </NativeBaseProvider>
    );
};

export default BookSlots;
