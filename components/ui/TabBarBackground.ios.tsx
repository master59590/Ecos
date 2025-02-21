import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BlurTabBarBackground() {
  return (
    <BlurView
      // System chrome material automatically adapts to the system's theme
      // and matches the native tab bar appearance on iOS.
      tint="systemChromeMaterial"
      intensity={100}
      style={styles.blurView}
    />
  );
}


export function useBottomTabOverflow() {
  const tabHeight = useBottomTabBarHeight();
  const { bottom } = useSafeAreaInsets();
  return tabHeight - bottom;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10, // ยกขึ้นจากขอบล่าง
    left: 20, // ขยับจากขอบซ้าย
    right: 20, // ขยับจากขอบขวา
    borderRadius: 20, // เพิ่มมุมโค้งมน
    overflow: 'hidden', // ทำให้ borderRadius มีผลกับ BlurView
  },
  blurView: {
    ...StyleSheet.absoluteFillObject, // ทำให้ BlurView ครอบเต็ม container
    borderRadius: 20, // ทำให้มุมโค้งมน
  },
});
