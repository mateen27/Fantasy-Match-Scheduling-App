import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { NativeBaseProvider, Avatar, Box, Button, Center, HStack, Heading, Text, VStack, Card } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [userData, setUserData] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const encryptedUserData = await AsyncStorage.getItem('user');
      if (encryptedUserData) {
        const userData = JSON.parse(encryptedUserData);
        setUserData(userData);
      } else {
        console.log('User data not found');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert('Error fetching user data:', error);
    }
  };

  return (
    <NativeBaseProvider>
      <Center>
        <Avatar
          my={4}
          bg="purple.600"
          size="2xl"
          source={{
            uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"
          }}
        >
          RB
        </Avatar>
        <Heading size={'lg'}>{userData.name}</Heading>
        <Heading size={'sm'} color={'gray.500'} my={1}>{userData.email}</Heading>
      </Center>
      <VStack p={4}>
        {Object.keys(userData).map(key => {
          if (!['email', 'id', 'name', 'password'].includes(key)) {
            const bet = userData[key];
            return (
              <Card key={key} p={3} my={2}>
                <Heading size="md">{bet.matchInfo.name}</Heading>
                <Text>Amount: ${bet.betAmount}</Text>
                <Text>Team 1: {bet.matchInfo.params.team1}</Text>
                <Text>Team 2: {bet.matchInfo.params.team2}</Text>
              </Card>
            );
          }
          return null;
        })}
      </VStack>
    </NativeBaseProvider>
  );
};

export default Profile;
