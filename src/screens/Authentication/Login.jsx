import React, { useEffect } from "react";
import {
    NativeBaseProvider,
    Box,
    HStack,
    VStack,
    Text,
    Pressable,
    Image,
    Center,
    Stack,
    Input,
    Icon,
    Button,
} from "native-base";
// icons
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { digestStringAsync, CryptoDigestAlgorithm } from 'expo-crypto';
import { Alert } from "react-native";

const LoginScreen = () => {
    // state management
    const [show, setShow] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    //   navigation
    const navigation = useNavigation();

    // function for checking the login status!
//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       try {
//         // accessing the token from async storage!
//         const token = await AsyncStorage.getItem("userToken");

//         // if token found
//         if (token) {
//           navigation.replace("Home");
//         } else {
//           // token not found navigate to the Login Screen itself!
//         }
//       } catch (error) {
//         console.log("error checking the login status", error);
//       }
//     };

//     // calling the function
//     checkLoginStatus();
//   }, []);

    // function for login functionality
    const handleLogin = async () => {
        try {
            const encryptedUserData = await AsyncStorage.getItem('user');
    
            if (!encryptedUserData) {
                console.log('User not found');
                return;
            }
    
            const userData = JSON.parse(encryptedUserData);
    
            if (userData.email === email && userData.password === password) {
                console.log('Login successful');
                Alert.alert('Login successful');
                await AsyncStorage.setItem('userToken', userData.id);
    
                // Check user type
                if (userData.userType === 'admin') {
                    navigation.replace('AdminTabs');
                } else {
                    navigation.replace('UserTabs');
                }
            } else {
                console.log('Invalid email or password');
                Alert.alert('Invalid email or password');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            Alert.alert('Error logging in:', error);
        }
    };
    
    return (
        <NativeBaseProvider>
            <Box bg="#fff" flex={1}>
                <VStack
                    space={2}
                    justifyContent="center"
                    alignItems="center"
                    safeAreaTop
                    my={9}
                    mb={9}
                >
                    {/* Image */}
                    <Center>
                        <Image
                            size={200}
                            borderRadius={30}
                            source={{
                                uri: "https://weboconnect.com/assets/images/full-width-images/sport-application.png",
                            }}
                            alt="Alternate Text"
                        />
                    </Center>
                </VStack>
                <VStack space={5} my={2} alignItems={"center"}>
                    <Text
                        color={"#01295f"}
                        bold
                        fontSize={"xl"}
                        maxW="300"
                        w="80%"
                        textAlign={"center"}
                    >
                        Sign In
                    </Text>
                </VStack>
                <VStack space={2} alignItems={"center"}>
                    <Text
                        bold
                        color={"#0e4e7a"}
                        fontSize={"lg"}
                        maxW="300"
                        w="80%"
                        textAlign={"center"}
                    >
                        Login in to your account!
                    </Text>
                </VStack>
                {/* Email or username */}
                <Stack space={4} my={8} w="75%" maxW="300px" mx="auto">
                    <Input
                        size={"lg"}
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                        w={{
                            base: "100%",
                            md: "55%",
                        }}
                        alignSelf={"center"}
                        InputLeftElement={
                            <Icon
                                as={<AntDesign name="user" />}
                                size={5}
                                ml="2"
                                color="muted.400"
                            />
                        }
                        placeholder="Username or Email"
                    />
                </Stack>
                {/* password */}
                <Stack space={4} w="75%" maxW="300px" mx="auto">
                    <Input
                        size={"lg"}
                        value={password}
                        onChangeText={(password) => setPassword(password)}
                        w={{
                            base: "100%",
                            md: "55%",
                        }}
                        type={show ? "text" : "password"}
                        InputRightElement={
                            <Pressable onPress={() => setShow(!show)}>
                                <Icon
                                    as={<AntDesign name={show ? "lock" : "unlock"} />}
                                    size={5}
                                    mr="2"
                                    color="muted.400"
                                />
                            </Pressable>
                        }
                        placeholder="Password"
                    />
                </Stack>
                {/* login/ register button */}
                <Stack space={4} my={10} w="75%" maxW="300px" mx="auto">
                    <Button borderRadius={10} bg={'blue.400'} size={'md'} onPress={handleLogin}>
                        Login
                    </Button>
                </Stack>
                {/* bottom text */}
                <Stack space={2} my={-8} w="75%" maxW="300px" mx="auto">
                    <HStack justifyContent="center">
                        <Text color={"grey"}>Don't have an Account?</Text>
                        <Pressable onPress={() => navigation.navigate('Register')}>
                            <Text bold color={"#01295f"} ml={2}>
                                Register Now
                            </Text>
                        </Pressable>
                    </HStack>
                </Stack>
            </Box>
        </NativeBaseProvider>
    );
};

export default LoginScreen;