import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Matches from '../screens/Matches';
import FixedMatches from '../screens/FixedMatches';
import EditMatches from '../screens/EditMatches';
import RegisterScreen from '../screens/Authentication/Register';
import LoginScreen from '../screens/Authentication/Login';
import BookSlots from '../screens/BookSlots';
import BettingScreen from '../screens/BettingScreen';
import AddMatch from '../screens/AddMatch';
import EditMatch from '../screens/EditMatch';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function UserTabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Matches" component={Matches} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

function AdminTabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="AddMatch" component={AddMatch} />
            <Tab.Screen name="EditMatch" component={EditMatch} />
            <Tab.Screen name="Matches" component={Matches} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

function AppNavigator() {
    const [userType, setUserType] = React.useState('');

    React.useEffect(() => {
        async function fetchUserType() {
            try {
                const userData = await AsyncStorage.getItem('user');
                if (userData) {
                    const parsedUserData = JSON.parse(userData);
                    setUserType(parsedUserData.userType);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchUserType();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: true }}>
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='Register' component={RegisterScreen} />
                {userType === 'admin' ? (
                    <>
                        <Stack.Screen name="AdminTabs" component={AdminTabs} />
                        <Stack.Screen name="BookSlots" component={BookSlots} />
                        <Stack.Screen name="AddMatch" component={AddMatch} />
                        <Stack.Screen name="BettingScreen" component={BettingScreen} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="UserTabs" component={UserTabs} />
                        <Stack.Screen name="BookSlots" component={BookSlots} />
                        <Stack.Screen name="BettingScreen" component={BettingScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;
