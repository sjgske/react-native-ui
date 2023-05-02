import { useTheme } from '@react-navigation/native';
import { useMemo, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
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
          context.value = { ...context.value, left: leftHandlePos.value };
        })
        .onUpdate(e => {
          leftHandlePos.value = Math.min(
            Math.max(0, e.translationX + context.value.left),
            rightHandlePos.value,
          );
          runOnJS(onStartPriceChange)(
            Math.floor((leftHandlePos.value / barWidth) * maxPrice),
          );
        }),
    [barWidth],
  );
  const rightHandleGesture = useMemo(
    () =>
      Gesture.Pan()
        .onStart(() => {
          // context.value.right = rightHandlePos.value
          context.value = { ...context.value, right: rightHandlePos.value };
        })
        .onUpdate(e => {
          rightHandlePos.value = Math.min(
            Math.max(leftHandlePos.value, e.translationX + context.value.right),
            barWidth,
          );
          runOnJS(onEndPriceChange)(
            Math.floor((rightHandlePos.value / barWidth) * maxPrice),
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

  const barHighlightStyle = useAnimatedStyle(() => ({
    left: leftHandlePos.value,
    width: rightHandlePos.value - leftHandlePos.value,
  }));

  // 리렌더링 될 때마다 매번 바뀌지 않도록 useMemo에 저장해줌!
  const bars = useMemo(
    () => (
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        {new Array(Math.floor(maxPrice / 40)).fill('').map((_, i) => {
          const randomValue = Math.random();
          return (
            <View
              key={i}
              style={{
                flex: 1,
                height: Math.floor(randomValue * 40) + 8,
                backgroundColor: `rgba(41, 100, 255, ${randomValue})`,
              }}
            />
          );
        })}
      </View>
    ),
    [],
  );

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

      {bars}

      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: colors.border,
          position: 'relative',
        }}
        onLayout={e => setBarWidth(e.nativeEvent.layout.width)}
      >
        <Animated.View
          style={[
            {
              position: 'absolute',
              height: '100%',
              backgroundColor: colors.text,
            },
            barHighlightStyle,
          ]}
        />
        <GestureDetector gesture={leftHandleGesture}>
          <Animated.View style={[{ position: 'absolute' }, leftHandleStyle]}>
            <SliderHandle label={`$${startPrice}`} />
          </Animated.View>
        </GestureDetector>

        <GestureDetector gesture={rightHandleGesture}>
          <Animated.View style={[{ position: 'absolute' }, rightHandleStyle]}>
            <SliderHandle label={`$${endPrice}`} />
          </Animated.View>
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

const SliderHandle = ({ label }: { label: string }) => {
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
        position: 'relative',
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
      <View
        style={{
          position: 'absolute',
          bottom: '-105%',
          width: 200,
          alignItems: 'center',
        }}
      >
        <View>
          <Text numberOfLines={1} style={{ color: colors.text }}>
            {label}
          </Text>
        </View>
      </View>
    </View>
  );
};
