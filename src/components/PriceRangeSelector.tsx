import { useTheme } from '@react-navigation/native';
import { useMemo, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

interface Props {
  minPrice: number;
  maxPrice: number;
  startPrice: number;
  endPrice: number;
  onStartPriceChange: (value: number) => void;
  onEndPriceChange: (value: number) => void;
}

const PriceRangeSelector = ({
  minPrice,
  maxPrice,
  startPrice,
  endPrice,
  onStartPriceChange,
  onEndPriceChange,
}: Props) => {
  const { colors } = useTheme();
  const [barWidth, setBarWidth] = useState(0);
  const context = useSharedValue({ left: 0, right: 0 });

  const leftHandlePos = useSharedValue(minPrice);
  const rightHandlePos = useSharedValue(maxPrice);

  const leftHandleGesture = useMemo(
    () =>
      Gesture.Pan()
        .onStart(() => {
          context.value.left = leftHandlePos.value;
        })
        .onChange(e => {
          leftHandlePos.value = Math.min(
            Math.max(0, e.translationX + context.value.left),
            rightHandlePos.value,
          );
        }),
    [barWidth],
  );
  const rightHandleGesture = useMemo(
    () =>
      Gesture.Pan()
        .onStart(() => {
          context.value.right = rightHandlePos.value;
        })
        .onChange(e => {
          rightHandlePos.value = Math.min(
            Math.max(leftHandlePos.value, e.translationX + context.value.right),
            barWidth,
          );
        }),
    [barWidth],
  );

  const leftHandleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: leftHandlePos.value }],
  }));
  const rightHandleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: rightHandlePos.value }],
  }));

  useEffect(() => {
    if (barWidth === 0) return;

    leftHandlePos.value = (startPrice * barWidth) / maxPrice;
    rightHandlePos.value = (endPrice * barWidth) / maxPrice;
  }, [barWidth]);

  return (
    <View>
      <View style={{ marginBottom: 16 }}>
        <Text>Price Range</Text>
      </View>

      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: colors.border,
          position: 'relative',
        }}
        onLayout={e => setBarWidth(e.nativeEvent.layout.width)}
      >
        <View
          style={{
            position: 'absolute',
            left: `${(startPrice / maxPrice) * 100}%`,
            width: `${((endPrice - startPrice) / maxPrice) * 100}%`,
            height: '100%',
            backgroundColor: colors.text,
          }}
        />
        <GestureDetector gesture={leftHandleGesture}>
          <Animated.View style={[{ position: 'absolute' }, leftHandleStyle]}>
            <SliderHandle />
          </Animated.View>
        </GestureDetector>

        <GestureDetector gesture={rightHandleGesture}>
          <View style={[{ position: 'absolute' }, rightHandleStyle]}>
            <SliderHandle />
          </View>
        </GestureDetector>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 12,
        }}
      >
        <Text style={{ color: colors.text, opacity: 0.5 }}>${minPrice}</Text>
        <Text style={{ color: colors.text, opacity: 0.5 }}>${maxPrice}</Text>
      </View>
    </View>
  );
};

export default PriceRangeSelector;

const SliderHandle = () => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        height: 24,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        borderColor: colors.text,
        borderWidth: 2,
        backgroundColor: colors.background,
        transform: [{ translateX: -12 }, { translateY: -12 }],
      }}
    >
      <View
        style={{
          width: 3,
          height: 3,
          borderRadius: 10,
          top: 0.5,
          backgroundColor: colors.text,
        }}
      />
    </View>
  );
};
