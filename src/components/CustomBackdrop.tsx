import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: `rgba(0,0,0,${interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 0.3],
      Extrapolate.CLAMP,
    )})`,
  }));

  const blurViewProps = useAnimatedProps(() => ({
    intensity: interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 15],
      Extrapolate.CLAMP,
    ),
  }));

  return (
    <AnimatedBlurView
      animatedProps={blurViewProps}
      style={[style, containerAnimatedStyle]}
    />
  );
};

export default CustomBackdrop;
