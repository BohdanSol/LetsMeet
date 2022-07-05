import { PermissionsAndroid, Platform } from 'react-native'

export const isCallPermissionsGranted = async () => {
  if (Platform.OS === 'ios') {
    return true
  }

  const granted = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    PermissionsAndroid.PERMISSIONS.CAMERA,
  ])
  const recordAudioGranted =
    granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === 'granted'
  const cameraGranted =
    granted[PermissionsAndroid.PERMISSIONS.CAMERA] === 'granted'
  if (!cameraGranted || !recordAudioGranted) {
    return false
  } else {
    return true
  }
}
