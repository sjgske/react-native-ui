import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icons from '@expo/vector-icons/MaterialIcons';

const MAX_PRICE = 500;

const COLORS = [
  {
    color: 'red',
    label: 'Red',
    itemCount: 4,
  },
  {
    color: 'blue',
    label: 'Blue',
    itemCount: 2,
  },
  {
    color: 'yellow',
    label: 'Yellow',
    itemCount: 6,
  },
  {
    color: 'purple',
    label: 'Purple',
    itemCount: 10,
  },
];

const SLEEVES = [
  {
    id: 'shortSleeve',
    label: 'Short Sleeve',
    itemCount: 20,
  },
  {
    id: 'longSleeve',
    label: 'Long Sleeve',
    itemCount: 100,
  },
  {
    id: 'sleeveless',
    label: 'Sleeveless',
    itemCount: 50,
  },
];

const FilterView = () => {
  const [minPrice, setMinPrice] = useState(50);
  const [maxPrice, setMaxPrice] = useState(250);
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ paddingHorizontal: 24, flex: 1 }}
        contentContainerStyle={{ rowGap: 24 }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text style={{ flex: 1, fontSize: 20, fontWeight: '700' }}>
            Filters
          </Text>
          <TouchableOpacity>
            <Text>Reset</Text>
          </TouchableOpacity>
        </View>

        {/* Range selector */}
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
          >
            <View
              style={{
                position: 'absolute',
                left: `${(minPrice / MAX_PRICE) * 100}%`,
                width: `${((maxPrice - minPrice) / MAX_PRICE) * 100}%`,
                height: '100%',
                backgroundColor: colors.text,
              }}
            />
            <View style={{ position: 'absolute', left: '10%' }}>
              <SliderHandle />
            </View>
            <View style={{ position: 'absolute', left: '50%' }}>
              <SliderHandle />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 12,
            }}
          >
            <Text style={{ color: colors.text, opacity: 0.5 }}>$0</Text>
            <Text style={{ color: colors.text, opacity: 0.5 }}>
              ${MAX_PRICE}
            </Text>
          </View>
        </View>

        {/* Sports Category Filter */}
        <View>
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12 }}>
            Sports
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {new Array(8).fill('').map((_, i) => (
              <Chip isSelected={i === 0} label="Item" itemCount={i} key={i} />
            ))}
          </View>
        </View>

        {/* Color Filter */}
        <View>
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12 }}>
            Color
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {COLORS.map((item, i) => (
              <Chip
                key={i}
                isSelected={i === 0}
                label={item.label}
                itemCount={item.itemCount}
                left={
                  <View
                    style={{
                      backgroundColor: item.color,
                      width: 16,
                      height: 16,
                      borderRadius: 8,
                    }}
                  />
                }
              />
            ))}
          </View>
        </View>

        {/* Sleeves Filter */}
        <View>
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12 }}>
            Sleeves
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {SLEEVES.map((item, i) => (
              <Chip
                isSelected={i === 0}
                label={item.label}
                itemCount={item.itemCount}
                key={i}
              />
            ))}
          </View>
        </View>

        <View style={{ flex: 1 }} />
      </ScrollView>

      {/* Button */}
      <View style={{ padding: 24, paddingBottom: 24 + insets.bottom }}>
        <TouchableOpacity
          style={{
            backgroundColor: colors.text,
            height: 64,
            borderRadius: 64,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: colors.background,
            }}
          >
            Apply filters
          </Text>
          <View
            style={{
              backgroundColor: colors.card,
              width: 40,
              aspectRatio: 1,
              borderRadius: 40,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: 12,
              right: 12,
              bottom: 12,
            }}
          >
            <Icons name="arrow-forward" size={24} color={colors.text} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilterView;

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

const Chip = ({
  isSelected,
  label,
  itemCount,
  left,
}: {
  isSelected: boolean;
  label: string;
  itemCount: number;
  left?: React.ReactNode;
}) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 100,
        backgroundColor: isSelected ? colors.text : colors.background,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
      }}
    >
      {!!left && <View style={{ marginRight: 4 }}>{left}</View>}
      <Text
        style={{
          fontSize: 14,
          fontWeight: '600',
          color: isSelected ? colors.background : colors.text,
        }}
      >
        {label} [{itemCount}]
      </Text>
    </TouchableOpacity>
  );
};
