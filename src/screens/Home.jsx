import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import {
  NativeBaseProvider,
  VStack,
  HStack,
  Heading,
  Text,
  Box,
  Center,
  Button,
} from 'native-base';
import { dummyData } from '../data/dummyData'; // Importing dummy data

const Home = () => {
  // Get today's date in YYYY-MM-DD format
  const todayDate = new Date().toISOString().split('T')[0];

  // Filter matches for today's date
  const todaysMatches = dummyData.filter(match => match.date === todayDate);

  return (
    <NativeBaseProvider>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <VStack my={3} mx={4}>
          <Heading size={'md'}>Today's Matches</Heading>
        </VStack>
        <VStack mx={4}>
          {todaysMatches.map((match, index) => (
            <MatchCard key={index} match={match} />
          ))}
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
};

const MatchCard = ({ match }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateTimer = setInterval(() => {
      const matchTime = new Date(`${match.date}T${match.time}`);
      const currentTime = new Date();

      const difference = matchTime - currentTime;

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(`${hours} hrs ${minutes} min ${seconds} sec`);
    }, 1000);

    return () => clearInterval(updateTimer);
  }, [match]);

  return (
    <Box
      bg="gray.300"
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
      <Text>Time Left: {timeLeft}</Text>
      <Center marginTop={3} position={'absolute'} top={110} right={3} justifyContent={'right'}>
        <Button>Book Slot</Button>
      </Center>
    </Box>
  );
};

export default Home;
