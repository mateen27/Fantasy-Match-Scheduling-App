import React from 'react';
import { ScrollView, View } from 'react-native';
import {
  NativeBaseProvider,
  VStack,
  HStack,
  Heading,
  Text,
  Box,
} from 'native-base';
import { dummyData } from '../data/dummyData';

const MatchCard = ( {match} ) => {
  return (
    <Box
      bg="#f8f8ff"
      p={4}
      rounded="md"
      mb={3}
    >
      <HStack justifyContent="space-between" mb={2}>
        <Text fontWeight="bold">{match.team1}</Text>
        <Text fontWeight='semibold'>vs</Text>
        <Text fontWeight="bold">{match.team2}</Text>
      </HStack>
      <Text>Date: {match.date}</Text>
      <Text>Time: {match.time}</Text>
      <Text>Venue: {match.venue}</Text>
      <Text>City: {match.city}</Text>
    </Box>
  );
};

const Matches = () => {
  const todayDate = new Date().toISOString().split('T')[0];
  const upcomingMatches = dummyData.filter(match => match.date >= todayDate);

  return (
    <NativeBaseProvider>
      <ScrollView style = {{ backgroundColor : 'white' }}>
        <VStack bg={'white'} my={3} mx={4}>
          <Heading size={'md'}>Upcoming Matches</Heading>
        </VStack>
        <VStack mx={4}>
          {upcomingMatches.map((match, index) => (
            <MatchCard key={index} match={match} />
          ))}
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
}

export default Matches;
