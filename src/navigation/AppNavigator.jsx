import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Matches from '../screens/Matches';
import FixedMatches from '../screens/FixedMatches';
import EditMatches from '../screens/EditMatches';
import RegisterScreen from '../screens/Authentication/Register';
import LoginScreen from '../screens/Authentication/Login';
import BookSlots from '../screens/BookSlots';

// bottom navigation part
const Tab = createBottomTabNavigator();
function HomeTabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={Home} options={{ headerShown: true, headerTintColor: '#fff', headerStyle: { backgroundColor: '#757ad4' } }} />
            <Tab.Screen name="Matches" component={Matches} options={{ headerShown: true , headerTintColor: '#fff', headerStyle: { backgroundColor: '#757ad4' } }} />
            <Tab.Screen name="Profile" component={Profile} options={{ headerShown: true , headerTintColor: '#fff', headerStyle: { backgroundColor: '#757ad4' } }} />
        </Tab.Navigator>
    );
}

const Stack = createNativeStackNavigator();

function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='Register' component={RegisterScreen} />
                <Stack.Screen name="HomeTabs" component={HomeTabs} />
                <Stack.Screen name="FixedMatches" component={FixedMatches} />
                <Stack.Screen name="EditMatches" component={EditMatches} />
                <Stack.Screen name="BookSlots" component={BookSlots} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;