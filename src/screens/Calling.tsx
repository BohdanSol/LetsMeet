import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState, useRef } from 'react'
import { View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTailwind } from 'tailwind-rn/dist'
import { Voximplant } from 'react-native-voximplant'
import { callSettings } from '../utils'

interface IVoximplant {
  on: (arg1: string, arg2: () => void) => void
  off: (arg1: string) => void
  answer: (arg1: object) => void
  hangup: () => void
  getEndpoints: () => any
}

const Calling = () => {
  const tw = useTailwind()
  const route = useRoute()
  const navigation = useNavigation()
  const voximplant = Voximplant.getInstance()

  const { callee, call: incomingCall, isIncoming } = route?.params

  const [callStatus, setCallStatus] = useState('Initializing')
  const [localVideoStreamId, setLocalVideoStreamId] = useState('')
  const [remoteVideoStreamId, setRemoteVideoStreamId] = useState('')

  const call = useRef<IVoximplant>(incomingCall)
  const callEndpoint = useRef<any>(null)

  useEffect(() => {
    const makeCall = async () => {
      call.current = await voximplant.call(callee.username, callSettings)
      subscribeToCallEvents()
      // console.log(call)
    }

    const answerCall = async () => {
      subscribeToCallEvents()
      callEndpoint.current = call.current.getEndpoints()[0]
      subscribeToEndpointEvent()
      call.current.answer(callSettings)
    }

    const subscribeToCallEvents = () => {
      call.current.on(Voximplant.CallEvents.Failed, (callEvent) => {
        // Alert.alert(callEvent.reason)
        // navigation.goBack()
      })

      call.current.on(Voximplant.CallEvents.ProgressToneStart, (callEvent) => {
        setCallStatus('Calling')
      })

      call.current.on(Voximplant.CallEvents.Connected, (callEvent) => {
        setCallStatus('Connected')
      })

      call.current.on(Voximplant.CallEvents.Disconnected, (callEvent) => {
        navigation.goBack()
      })

      call.current.on(
        Voximplant.CallEvents.LocalVideoStreamAdded,
        (callEvent) => {
          setLocalVideoStreamId(callEvent.videoStream.id)
        },
      )

      call.current.on(Voximplant.CallEvents.EndpointAdded, (callEvent) => {
        callEndpoint.current = callEvent.endpoint
        subscribeToEndpointEvent()
      })

      call.current.on(Voximplant.CallEvents.EndpointAdded, (callEvent) => {
        callEndpoint.current = callEvent.endpoint
        subscribeToEndpointEvent()
      })
    }

    const subscribeToEndpointEvent = async () => {
      callEndpoint.current.on(
        Voximplant.EndpointEvents.RemoteVideoStreamAdded,
        (endpointEvent) => {
          setRemoteVideoStreamId(endpointEvent.videoStream.id)
        },
      )
    }

    if (isIncoming) {
      answerCall()
    } else {
      makeCall()
    }

    return () => {
      call.current.off(Voximplant.CallEvents.Failed)
      call.current.off(Voximplant.CallEvents.ProgressToneStart)
      call.current.off(Voximplant.CallEvents.Connected)
      call.current.off(Voximplant.CallEvents.Disconnected)
      call.current.off(Voximplant.CallEvents.EndpointAdded)
      call.current.off(Voximplant.CallEvents.RemoteVideoStreamAdded)
    }
  }, [callee.username, isIncoming, navigation, voximplant])

  const onEndCallPressed = () => {
    call.current.hangup()
    navigation.goBack()
  }
  return (
    <SafeAreaView style={tw('flex-1 bg-sky-200 justify-between px-6')}>
      <View>
        <Text
          onPress={() => {
            if (isIncoming) {
              onEndCallPressed()
            }
            navigation.goBack()
          }}
          style={tw(
            'h-6 z-20 absolute top-8 bg-red px-4 rounded-full bg-blue text-white font-bold pt-px',
          )}>
          Back
        </Text>
        <View style={tw('w-full z-20')}>
          <Text style={tw('text-center')}>Username</Text>
          <Text style={tw('text-center')}>{callStatus}</Text>
        </View>
      </View>
      <Voximplant.VideoView
        videoStreamId={remoteVideoStreamId}
        style={tw(
          'absolute top-0 left-48 right-0 bottom-20 bg-sky-200 rounded-xl',
        )}
      />
      <Voximplant.VideoView
        videoStreamId={localVideoStreamId}
        showOnTop={true}
        scaleMode={Voximplant.RenderScaleType.SCALE_FILL}
        style={tw(
          'absolute z-10 top-48 left-4 w-24 h-36 bg-sky-200 rounded-xl',
        )}
      />
      <Pressable
        onPress={onEndCallPressed}
        style={tw(
          'h-12 w-full bg-red rounded-xl justify-center items-center mb-6',
        )}>
        <Text style={tw('font-bold text-white')}>End call</Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default Calling
