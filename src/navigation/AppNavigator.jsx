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

// bottom navigation part
const Tab = createBottomTabNavigator();
function HomeTabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Matches" component={Matches} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

const Stack = createNativeStackNavigator();

function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='HomeTab' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="HomeTabs" component={HomeTabs} />
                <Stack.Screen name="FixedMatches" component={FixedMatches} />
                <Stack.Screen name="EditMatches" component={EditMatches} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;