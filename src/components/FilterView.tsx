import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icons from '@expo/vector-icons/MaterialIcons';
import PriceRangeSelector from './PriceRangeSelector';

const MAX_PRICE = 500;

const COLORS = [
  {
    color: '#D93F3E',
    label: 'Red',
    itemCount: 4,
  },
  {
    color: '#FFFFFF',
    label: 'White',
    itemCount: 2,
  },
  {
    color: '#58AB51',
    label: 'Green',
    itemCount: 6,
  },
  {
    color: '#FB8C1D',
    label: 'Orange',
    itemCount: 10,
  },
  {
    color: '#D3B38D',
    label: 'Tan',
    itemCount: 10,
  },
  {
    color: '#FDE737',
    label: 'Yellow',
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

const FilterView = ({ colors }: { colors: any }) => {
  const [startPrice, setStartPrice] = useState(50);
  const [endPrice, setEndPrice] = useState(250);
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
          <Text
            style={{
              flex: 1,
              fontSize: 20,
              fontWeight: '700',
              color: colors.text,
            }}
          >
            Filters
          </Text>
          <TouchableOpacity>
            <Text>Reset</Text>
          </TouchableOpacity>
        </View>

        {/* Range selector */}
        <PriceRangeSelector
          minPrice={0}
          maxPrice={MAX_PRICE}
          startPrice={startPrice}
          endPrice={endPrice}
          onStartPriceChange={setStartPrice}
          onEndPriceChange={setEndPrice}
        />

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
          color: isSelected ? colors.background : colors.text,
        }}
      >
        {label} [{itemCount}]
      </Text>
    </TouchableOpacity>
  );
};
