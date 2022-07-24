import React, { useEffect } from 'react'
import { View, Text, Pressable } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

const Ring = (props: { delay: number }) => {
  const tw = useTailwind()
  const ring = useSharedValue(0)

  const ringStyle = useAnimatedStyle(() => {
    return {
      opacity: 0.8 - ring.value,
      transform: [
        {
          scale: interpolate(ring.value, [0, 1], [0, 4]),
        },
      ],
    }
  })
  useEffect(() => {
    ring.value = withDelay(
      props.delay,
      withRepeat(
        withTiming(1, {
          duration: 2000,
        }),
        -1,
        false,
      ),
    )
  }, [props.delay, ring])

  return (
    <Animated.View
      style={[tw('absolute w-16 h-16 rounded-full bg-green'), ringStyle]}
    />
  )
}

const Settings = () => {
  const tw = useTailwind()

  return (
    <>
      <View style={tw('flex-1 items-center justify-center bg-white px-4')}>
        <View style={tw('h-36')}>
          <Ring delay={0} />
          <Ring delay={1000} />
          <Pressable
            style={tw(
              'bg-green w-16 h-16 rounded-full justify-center items-center',
            )}>
            <Text>A</Text>
          </Pressable>
        </View>
        <Pressable
          style={tw(
            'h-12 w-full bg-blue rounded-lg items-center justify-center',
          )}>
          <Text style={tw('text-lg font-bold text-white')}>New Meeting</Text>
        </Pressable>
        <Pressable
          style={tw(
            'h-12 w-full bg-white border-2 border-blue rounded-lg items-center justify-center mt-4',
          )}>
          <Text style={tw('text-lg font-bold text-blue')}>Join a meeting</Text>
        </Pressable>
      </View>
    </>
  )
}

export default Settings
