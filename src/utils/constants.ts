import { Dimensions } from 'react-native'

export const metrics = {
  deviceWidth: Dimensions.get('screen').width,
  deviceHeight: Dimensions.get('screen').height,
}

export const APP_NAME = 'letsmeet'
export const ACC_NAME = 'solovei'

export const callSettings = {
  video: {
    sendVideo: true,
    receiveVideo: true,
  },
}
