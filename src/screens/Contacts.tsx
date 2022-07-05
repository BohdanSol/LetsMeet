import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTailwind } from 'tailwind-rn/dist'
import { Voximplant } from 'react-native-voximplant'

import { isCallPermissionsGranted } from '../utils'
import mockedContacts from '../utils/contacts.json'
import { routes } from '../navigation/Routes'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Contacts = ({ navigation }) => {
  const tw = useTailwind()
  const voximplant = Voximplant.getInstance()
  const AudioDeviceManager =
    Voximplant.Hardware.AudioDeviceManager.getInstance()

  const [authUserDisplayName, setAuthUserDisplayName] = useState<string>('')

  useEffect(() => {
    const getUserDisplayName = async () => {
      let name = await AsyncStorage.getItem('LM-displayName')
      setAuthUserDisplayName(name)
    }
    getUserDisplayName()
  }, [])

  useEffect(() => {
    voximplant.on(
      Voximplant.ClientEvents.IncomingCall,
      (incomingCallEvent: { call: any }) =>
        navigation.navigate(routes.INCOMING_CALL, {
          call: incomingCallEvent.call,
        }),
    )
    const selectAudioDevice = async (device: string) => {
      // device equal one of these: 'Earpiece', 'Speaker', 'WiredHeadset', 'Bluetooth'
      await AudioDeviceManager.selectAudioDevice(device)
    }
    selectAudioDevice('Speaker')
    return () => {
      voximplant.off(Voximplant.ClientEvents.IncomingCall)
    }
  }, [])

  const handleCallPressed = (item: {
    isActive: boolean
    displayName: string
  }) => {
    const hasPermission = isCallPermissionsGranted()
    const isMe = authUserDisplayName === item?.displayName
    if (!hasPermission || !item.isActive || isMe) {
      return
    }
    navigation.push('Calling', { callee: item })
    console.log(item)
  }

  return (
    <SafeAreaView
      edges={['top']}
      style={tw('flex-1 items-center justify-center bg-white')}>
      <FlatList
        data={mockedContacts}
        style={tw('w-full')}
        renderItem={({ item }) => (
          <View
            style={tw(
              'h-12 w-full items-center justify-between flex-row px-4',
            )}>
            <Text style={tw('text-blue font-semibold')}>
              {item.displayName}
            </Text>
            <View>
              <Pressable
                hitSlop={10}
                style={[
                  tw('w-14 h-6 rounded-full items-center justify-center'),
                  tw(item.isActive ? 'bg-green' : 'bg-rose-300'),
                  // @ts-ignore
                  tw(authUserDisplayName === item.displayName && 'bg-sky-300'),
                ]}
                onPress={() => item.isActive && handleCallPressed(item)}>
                <Text style={tw('text-white font-bold')}>
                  {authUserDisplayName === item.displayName ? 'YOU' : 'CALL'}
                </Text>
              </Pressable>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View style={tw('h-px w-full bg-sky-200')} />
        )}
      />
    </SafeAreaView>
  )
}

export default Contacts
