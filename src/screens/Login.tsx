import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, TextInput, Alert } from 'react-native'
// @ts-ignore
import { Voximplant } from 'react-native-voximplant'
import { useTailwind } from 'tailwind-rn/dist'
import { routes } from '../navigation/Routes'
import { ACC_NAME, APP_NAME } from '../utils'

const Login = () => {
  const tw = useTailwind()
  const navigation = useNavigation()

  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const voximplant = Voximplant.getInstance()

  useEffect(() => {
    const connect = async () => {
      const status = await voximplant.getClientState()
      console.log(status)
      if (status === Voximplant.ClientState.DISCONNECTED) {
        await voximplant.connect()
      }
      if (status === Voximplant.ClientState.LOGGED_IN) {
        handleSuccessLogin()
      }
    }
    connect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voximplant])

  const handleVoximplantLogin = async () => {
    try {
      const voxUsername = `${login}@${APP_NAME}.${ACC_NAME}.voximplant.com`
      const authResult = await voximplant.login(voxUsername, password)
      handleSuccessLogin(authResult?.displayName)
    } catch (err) {
      console.log(err)
      const name = (err as Error).name
      const message = (err as Error).message
      Alert.alert(name, message)
    }
  }

  const handleSuccessLogin = (displayName: string) => {
    AsyncStorage.setItem('LM-displayName', displayName)
    // @ts-ignore
    navigation.replace(routes.HOME_STACK)
  }

  return (
    <View style={tw('flex-1 items-center justify-center bg-white px-4')}>
      <TextInput
        value={login}
        onChangeText={(text) => {
          setLogin(text)
        }}
        autoCapitalize={'none'}
        autoComplete={'off'}
        autoCorrect={false}
        placeholder={'Login...'}
        placeholderTextColor={'#555555'}
        style={tw('w-full bg-gray mb-4 h-12 rounded-lg px-4 text-blue')}
      />
      <TextInput
        value={password}
        onChangeText={(text) => {
          setPassword(text)
        }}
        autoCapitalize={'none'}
        autoComplete={'off'}
        autoCorrect={false}
        placeholder={'Password...'}
        placeholderTextColor={'#555555'}
        style={tw('w-full bg-gray mb-4 h-12 rounded-lg px-4 text-blue')}
      />
      <Pressable
        // @ts-ignore
        onPress={handleVoximplantLogin}
        style={tw(
          'h-12 w-full bg-blue rounded-lg items-center justify-center',
        )}>
        <Text style={tw('text-lg font-bold text-white')}>Log In</Text>
      </Pressable>
    </View>
  )
}

export default Login
