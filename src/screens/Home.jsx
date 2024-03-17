import React, { useEffect, useState, useLayoutEffect } from 'react'; // Import useLayoutEffect
import { Pressable, ScrollView, Image } from 'react-native';
import {
  NativeBaseProvider,
  VStack,
  HStack,
  Heading,
  Text,
  Box,
  Center,
  Button,
  View
} from 'native-base';
import { dummyData } from '../data/dummyData';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const todayDate = new Date().toISOString().split('T')[0];
  const currentTime = new Date();

  // Filter today's matches and check if match time is in the future
  const todaysMatches = dummyData.filter(match => {
    const matchDate = new Date(match.date);
    const matchTime = new Date(`${match.date}T${match.time}`);
    
    // Check if match date is today and match time is in the future
    return matchDate.toISOString().split('T')[0] === todayDate && matchTime > currentTime;
  });

  const upcomingMatches = dummyData.filter(match => {
    const matchDate = new Date(match.date);
    const today = new Date();
    return matchDate >= today;
  }).slice(0, 4);

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
        <VStack my={3} mx={4}>
          <HStack justifyContent={'space-between'}>
            <Heading size={'md'}>Upcoming Matches</Heading>
            <Pressable><Heading top={1} size={'xs'}>View all Matches</Heading></Pressable>
          </HStack>
          <VStack my={3}>
            {upcomingMatches.map((match, index) => (
              <MatchCard key={index} match={match} />
            ))}
          </VStack>
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
};

const MatchCard = ({ match }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const navigation = useNavigation();

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

  const handlePress = () => {
    // Navigate to another component and pass the match information as parameter
    navigation.navigate('BookSlots', match);
  };

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
      <Text>Time Left: {timeLeft}</Text>
      <Center marginTop={3} position={'absolute'} top={110} right={3} justifyContent={'right'}>
        <Button bg={'#6167ce'} onPress={handlePress}>Book Slot</Button>
      </Center>
    </Box>
  );
};

export default Home;
