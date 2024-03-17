import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { NativeBaseProvider, Avatar, Box, Button, Center, HStack, Heading, Text, VStack, Card, Pressable , ScrollView } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const Profile = () => {
  const [userData, setUserData] = useState('');

  const navigation = useNavigation();

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

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('userToken');
      // Navigate to the sign-in screen after clearing AsyncStorage
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error signing out:', error);
    }
  };
  return (
    <NativeBaseProvider>
      {/* <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
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
                </ScrollView> */}
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
      <VStack bg={'#f8f8ff'} padding={5} my={2} justifyContent="space-between">
        <Box>
          <Text fontWeight={'bold'}>Account Settings</Text>
        </Box>

      </VStack>
      <VStack bg={'#f8f8ff'} padding={5} my={2} justifyContent="space-between">
        <Pressable onPress={() => console.log('hi')}>
          <Box>
          <Text fontWeight={'bold'} onPress={() => navigation.navigate('FixedMatches')}>Fixed Matches</Text>
        </Box>
        </Pressable>

      </VStack>
      <VStack my={10}>
        <Center>
          <Button onPress={handleSignOut} bgColor= { '#6167ce'} size={'lg'}>Sign out</Button>
        </Center>
      </VStack>
    </NativeBaseProvider>
  );
};

export default Profile;