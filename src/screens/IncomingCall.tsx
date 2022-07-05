import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Voximplant } from 'react-native-voximplant'
import { useTailwind } from 'tailwind-rn/dist'
import { routes } from '../navigation/Routes'
import { isCallPermissionsGranted } from '../utils'

const IncomingCall = () => {
  const tw = useTailwind()
  const { call } = useRoute().params
  const navigation = useNavigation()

  const [caller, setCaller] = useState('')

  useEffect(() => {
    setCaller(call.getEndpoints()[0].displayName)
  }, [call])

  useEffect(() => {
    call.on(Voximplant.CallEvents.Disconnected, () => {
      navigation.navigate(routes.CONTACTS)
    })

    return () => {
      call.off(Voximplant.CallEvents.Disconnected)
    }
  }, [call, navigation])

  const onAccept = () => {
    const hasPermission = isCallPermissionsGranted()
    if (!hasPermission) {
      return
    }
    navigation.replace('Calling', { call, isIncoming: true })
  }
  const onDecline = () => {
    call.decline()
  }
  return (
    <SafeAreaView style={tw('flex-1 bg-blue justify-around items-center')}>
      <View style={tw('items-center')}>
        <Text style={tw('text-2xl')}>{caller}</Text>
        <Text style={tw('mb-16')}>Incoming call...</Text>
      </View>
      <View style={tw('flex-row w-full justify-around')}>
        <Pressable
          onPress={onDecline}
          style={tw(
            'bg-red w-16 h-16 rounded-full mx-6 justify-center items-center',
          )}>
          <Text>D</Text>
        </Pressable>
        <Pressable
          onPress={onAccept}
          style={tw(
            'bg-green w-16 h-16 rounded-full mx-6 justify-center items-center',
          )}>
          <Text>A</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default IncomingCall
