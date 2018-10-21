import { Dimensions, Platform, PixelRatio } from 'react-native';

export const __IOS__ = true;
export const __ANDROID__ = false;

export const gScreen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  navBarHeight: __IOS__ ? 64 : 50,
  navBarPaddingTop: __IOS__ ? 20 : 0,
  onePix: 1 / PixelRatio.get()
}

export const gColors = {
  brandPrimary: '#42bd9f',
  brandPrimaryTap: '#228B22'
}
