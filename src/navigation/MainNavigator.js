import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Home Stack Components
import OrderHistory from '../screens/components/OrderHistory';
import RoomDetailsScreen from '../screens/components/RoomDetailsScreen';
import RoomsScreen from '../screens/components/RoomsScreen';

// User Stack Components
import UserProfile from '../screens/auth/UserProfile';

// Info Stack Components
import InfoScreen from '../screens/components/InfoScreen';

// Icons for the Stack
import OutlineHome from 'react-native-vector-icons/AntDesign';
import FilledHome from 'react-native-vector-icons/Entypo';
import User from 'react-native-vector-icons/FontAwesome';
import Info from 'react-native-vector-icons/Ionicons';
import COLORS from '../styles/Colors';

const HomeStack = createStackNavigator();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator initialRouteName="RoomsScreen" screenOptions={{headerShown: false}}>
            <HomeStack.Screen name="RoomsScreen" component={RoomsScreen} />
            <HomeStack.Screen name="RoomDetailsScreen" component={RoomDetailsScreen} />
        </HomeStack.Navigator>
    );
}

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
    return (
        <ProfileStack.Navigator initialRouteName="UserProfile" screenOptions={{ headerShown: false }}>
            <ProfileStack.Screen name="UserProfile" component={UserProfile} />
            <ProfileStack.Screen name="OrderHistory" component={OrderHistory} />
        </ProfileStack.Navigator>
    );
}

const InfoStack = createStackNavigator();

function InfoStackScreen() {
    return (
        <InfoStack.Navigator initialRouteName="InfoScreen" screenOptions={{ headerShown: false }}>
            <InfoStack.Screen name="InfoScreen" component={InfoScreen} />
        </InfoStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerShown: false,
                lazy: true,
                tabBarIcon: ({ focused, color, size }) => {
                    let IconComponent;

                    if (route.name === 'Home') {
                        return (
                            focused ?
                                <FilledHome
                                    name="home"
                                    size={size}
                                    color={color}
                                />
                            :
                                <OutlineHome
                                    name="home"
                                    size={size}
                                    color={color}
                                />
                        )
                    } else if (route.name === 'Info') {
                        return (
                            <Info
                                name={focused ? "information-circle" : "information-circle-outline"}
                                size={size}
                                color={color}
                            />
                        )
                    } else if (route.name === 'Profile') {
                        return (
                            <User
                                name={focused ? "user" : "user-o"}
                                size={size}
                                color={color}
                            />
                        );
                    } 
                },
                tabBarActiveTintColor: COLORS.WHITE,
                tabBarInactiveTintColor: COLORS.WHITE,
                tabBarStyle: {
                    backgroundColor: COLORS.LIGHT_BLUE,
                    height: 75,
                    paddingTop: 15,
                    paddingBottom: 5,
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Info" component={InfoStackScreen} />
            <Tab.Screen name="Profile" component={ProfileStackScreen} />
        </Tab.Navigator>
    );
};

export default MainNavigator;