import React from "react";
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

const RegisterScreen = () => {
    // state management
    const [show, setShow] = React.useState(false);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [rePassword, setRePassword] = React.useState("");
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
                                uri: "https://weboconnect.com/assets/images/full-width-images/sport-application.png",
                            }}
                            alt="Alternate Text"
                        />
                    </Center>
                </VStack>
                <VStack space={5} my={2} alignItems={"center"}>
                    <Text color={'#01295f'} bold fontSize={"xl"} maxW="300" w="80%" textAlign={"center"}>
                        Register
                    </Text>
                </VStack>
                <VStack space={2} alignItems={"center"}>
                    <Text
                        bold
                        color={"#0e4e7a"}
                        fontSize={"md"}
                        maxW="300"
                        w="80%"
                        textAlign={"center"}
                    >
                        Register to get Started!
                    </Text>
                </VStack>
                {/* Name */}
                <Stack space={2} my={4} w="75%" maxW="300px" mx="auto">
                    <Input
                        size={"lg"}
                        value={name}
                        onChangeText={(name) => setName(name)}
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
                        placeholder="Enter your name"
                    />
                </Stack>

                {/* email id  */}
                <Stack space={2} my={1} w="75%" maxW="300px" mx="auto">
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
                                as={<AntDesign name="mail" />}
                                size={5}
                                ml="2"
                                color="muted.400"
                            />
                        }
                        placeholder="Enter your Email"
                    />
                </Stack>

                {/* enter password */}
                <Stack space={2} my={4} w="75%" maxW="300px" mx="auto">
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

                {/* Button for login/register */}
                <Stack space={4} my={6} w="75%" maxW="300px" mx="auto">
                    <Button borderRadius={10} bg={'blue.400'} size={'md'}>
                        Register
                    </Button>
                </Stack>

                {/* bottom text  */}
                <Stack space={2} my={-3} w="75%" maxW="300px" mx="auto">
                    <HStack justifyContent="center">
                        <Text color={"grey"}>Already have an Account?</Text>
                        <Pressable onPress={() => console.log('heelo')}>
                            <Text bold color={'#01295f'} ml={2}>Login Now</Text>
                        </Pressable>
                    </HStack>
                </Stack>
            </Box>
        </NativeBaseProvider>
    )
}

export default RegisterScreen