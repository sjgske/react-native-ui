import { useTheme } from '@react-navigation/native';
import { RootStackScreenProps } from 'navigators/RootStackNavigator';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Icons from '@expo/vector-icons/MaterialIcons';
import BottomSheet from '@gorhom/bottom-sheet';
import { useState } from 'react';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

const DetailsScreen = ({
  navigation,
  route: {
    params: { id },
  },
}: RootStackScreenProps<'Details'>) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [count, setCount] = useState(1);
  const [size, setSize] = useState(SIZES[0]);

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
        }}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView edges={['top']}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 24,
            gap: 8,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 52,
              borderWidth: 1,
              borderColor: colors.background,
            }}
          >
            <Icons name="arrow-back" size={24} color={colors.background} />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 52,
              borderWidth: 1,
              borderColor: colors.background,
            }}
          >
            <Icons name="favorite-border" size={24} color={colors.background} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 52,
              borderWidth: 1,
              borderColor: colors.background,
            }}
          >
            <Icons
              name="add-shopping-cart"
              size={24}
              color={colors.background}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <BottomSheet
        detached
        snapPoints={[64, 450]}
        index={0}
        style={{ marginHorizontal: 24 }}
        backgroundStyle={{
          borderRadius: 24,
          backgroundColor: colors.background,
        }}
        bottomInset={insets.bottom + 20}
      >
        <View style={{ padding: 16, gap: 20, flex: 1 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: colors.text,
            }}
          >
            PUMA Everyday Hussle
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View style={{ alignItems: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                {new Array(5).fill('').map((_, i) => (
                  <Icons
                    key={i}
                    name={i < 3 ? 'star' : 'star-border'}
                    color="#facc15"
                    size={28}
                  />
                ))}
              </View>
              <Text
                style={{
                  fontSize: 14,
                  color: colors.text,
                  opacity: 0.5,
                  marginTop: 2,
                }}
              >
                3.0 (250K Reviews)
              </Text>
            </View>
            <View style={{ flex: 1 }} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                backgroundColor: colors.primary,
                padding: 6,
                borderRadius: 100,
              }}
            >
              <TouchableOpacity
                onPress={() => setCount(prev => Math.max(prev - 1, 1))}
                style={{
                  backgroundColor: colors.card,
                  width: 32,
                  aspectRatio: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 32,
                }}
              >
                <Icons name="remove" size={20} color={colors.text} />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: colors.background,
                  width: 18,
                  textAlign: 'center',
                }}
              >
                {count}
              </Text>
              <TouchableOpacity
                onPress={() => setCount(prev => Math.min(prev + 1, 10))}
                style={{
                  backgroundColor: colors.card,
                  width: 32,
                  aspectRatio: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 32,
                }}
              >
                <Icons name="add" size={20} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  flex: 1,
                  fontSize: 16,
                  fontWeight: '600',
                  color: colors.text,
                  textTransform: 'uppercase',
                }}
              >{`Model is 6'1", Size M`}</Text>
              <Text style={{ color: colors.text, opacity: 0.5 }}>
                Size guide
              </Text>
            </View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
              {SIZES.map((s, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => setSize(s)}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 44,
                    alignContent: 'center',
                    justifyContent: 'center',
                    backgroundColor: s === size ? colors.primary : colors.card,
                  }}
                >
                  <Text
                    style={{
                      color: s === size ? colors.card : colors.text,
                      fontWeight: '600',
                      textAlign: 'center',
                      fontSize: 16,
                    }}
                  >
                    {s}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                marginBottom: 6,
                color: colors.text,
              }}
            >
              Description
            </Text>
            <Text
              style={{ color: colors.text, opacity: 0.75 }}
              numberOfLines={3}
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae
              tempora nesciunt qui quae totam odit cum magnam aliquid delectus!
              Unde veritatis ex quia est assumenda praesentium, iste
              necessitatibus ipsum deserunt.
            </Text>
          </View>

          <View style={{ flex: 1 }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{ color: colors.text, opacity: 0.75, marginBottom: 4 }}
              >
                Total
              </Text>
              <Text
                style={{ color: colors.text, fontSize: 18, fontWeight: '600' }}
              >
                $130.00
              </Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: colors.text,
                height: 64,
                borderRadius: 64,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                gap: 10,
                padding: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: colors.background,
                  paddingLeft: 10,
                }}
              >
                Add to cart
              </Text>
              <View
                style={{
                  backgroundColor: colors.card,
                  width: 40,
                  aspectRatio: 1,
                  borderRadius: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icons name="arrow-forward" size={24} color={colors.text} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default DetailsScreen;
