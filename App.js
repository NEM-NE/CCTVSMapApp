import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MapScreen from './MapScreen';
import SearchScreen from './SearchScreen';
import DirectionTab from './components/AppTabNavigator/DirectionTab'
import ChatTab from './components/AppTabNavigator/ChatTab'
import CalTab from './components/AppTabNavigator/CalTab'

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={MapScreen} initialParams={{ region: undefined}} options={{headerShown:null}}/>
      <HomeStack.Screen name="Search" component={SearchScreen} />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Home') {
              return (
                <Ionicons
                  name={
                    focused
                      ? 'ios-home'
                      : 'ios-home-outline'
                  }
                  size={size}
                  color={color}
                />
              );
            }else if(route.name === 'Direction') {
              return (
                <Ionicons
                  name={
                    focused
                      ? 'location'
                      : 'location-outline'
                  }
                  size={size}
                  color={color}
                />
              );
            }else if(route.name === 'Chat') {
              return (
                <Ionicons
                  name={
                    focused
                      ? 'chatbox-ellipses'
                      : 'chatbox-ellipses-outline'
                  }
                  size={size}
                  color={color}
                />
              );
            }else if(route.name === 'Cal') {
              return (
                <Ionicons
                  name={
                    focused
                      ? 'ios-calculator'
                      : 'ios-calculator-outline'
                  }
                  size={size}
                  color={color}
                />
              );
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeStackScreen}/>
        <Tab.Screen name="Direction" component={DirectionTab} />
        <Tab.Screen name="Chat" component={ChatTab} />
        <Tab.Screen name="Cal" component={CalTab} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
