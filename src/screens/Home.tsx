import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'

const Home = () => {
  const tw = useTailwind()
  return (
    <View style={tw('flex-1 items-center justify-center bg-white px-4')}>
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
  )
}

export default Home
