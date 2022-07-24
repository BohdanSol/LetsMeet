import React, { useEffect, useState } from 'react'
import { View, StatusBar } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import { Wallet } from '../skia'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PriceList } from '../skia/Model'

const Home = () => {
  const tw = useTailwind()
  return (
    <View style={tw('flex-1 items-center justify-center bg-white px-4')}>
      <Wallet />
    </View>
  )
}

export default Home
