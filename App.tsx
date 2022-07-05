import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TailwindProvider, useTailwind } from 'tailwind-rn'

import {
  Login,
  Home,
  Contacts,
  Settings,
  Calling,
  IncomingCall,
} from './src/screens'
import utilities from './tailwind.json'

export type TabParamsList = {
  Home: undefined
  Contacts: undefined
  Settings: undefined
}

export type StackParamsList = {
  Login: undefined
  HomeStack: undefined
  Calling: undefined
  IncomingCall: undefined
}

const Tab = createBottomTabNavigator<TabParamsList>()
const Stack = createNativeStackNavigator<StackParamsList>()

const HomeStack = () => {
  const tw = useTailwind()
  return (
    <Tab.Navigator
      initialRouteName="Contacts"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <View style={tw('w-5 h-5 bg-sky-200 rounded-full')} />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <View style={tw('w-5 h-5 bg-sky-200 rounded-r-full')} />
          ),
        }}
        name="Contacts"
        component={Contacts}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <View style={tw('w-5 h-5 bg-sky-200 rounded-l-full')} />
          ),
        }}
        name="Settings"
        component={Settings}
      />
    </Tab.Navigator>
  )
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="IncomingCall"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomeStack" component={HomeStack} />
        <Stack.Screen name="Calling" component={Calling} />
        <Stack.Screen name="IncomingCall" component={IncomingCall} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const Root = () => (
  <TailwindProvider utilities={utilities}>
    <App />
  </TailwindProvider>
)

export default Root
