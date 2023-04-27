import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Icons from '@expo/vector-icons/MaterialIcons';
import { useRef, useState, useCallback } from 'react';
import MasonryList from 'reanimated-masonry-list';
import { BlurView } from 'expo-blur';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Card from 'components/Card';
import CustomBackdrop from 'components/CustomBackdrop';
import FilterView from 'components/FilterView';
import { TabsStackScreenProps } from 'navigators/TabNavigator';

const CATEGORIES = ['Clothing', 'Shoes', 'Accessories', 'Bags', 'Perfumes'];

const MASONRY_LIST_DATA = [
  {
    imageUrl:
      'https://images.unsplash.com/photo-1521577352947-9bb58764b69a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=986&q=80',
    title: 'PUMA Everyday Hussle',
    price: 160,
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    title: 'PUMA Everyday Hussle',
    price: 180,
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1556217477-d325251ece38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1020&q=80',
    title: 'PUMA Everyday Hussle',
    price: 200,
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    title: 'PUMA Everyday Hussle',
    price: 180,
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1627225924765-552d49cf47ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    title: 'PUMA Everyday Hussle',
    price: 120,
  },
];

const HomeScreen = ({ navigation }: TabsStackScreenProps<'Home'>) => {
  const { colors } = useTheme();
  const [categoryIndex, setCategoryIndex] = useState(0);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openFilterModal = useCallback(() => {
    bottomSheetModalRef?.current?.present();
  }, []);

  return (
    <ScrollView>
      <SafeAreaView style={{ paddingVertical: 24, gap: 24 }}>
        {/* Header */}
        <View
          style={{
            paddingHorizontal: 24,
            paddingTop: 24,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Image
            source={{
              uri: 'https://yt3.ggpht.com/yti/AHyvSCCp3aqsoAtmpcd6OQDtlo0cPdVfy9D3ptMoG50rDg=s108-c-k-c0x00ffffff-no-rj',
            }}
            style={{ width: 52, aspectRatio: 1, borderRadius: 52 }}
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                marginBottom: 8,
                color: colors.text,
              }}
            >
              Hi, Danheon 👋
            </Text>
            <Text style={{ color: colors.text, opacity: 0.75 }}>
              Discover fashion that suit your style
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 52,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Icons name="notifications" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* SearchBar */}
        <View style={{ flexDirection: 'row', paddingHorizontal: 24, gap: 12 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              height: 52,
              borderRadius: 52,
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: 'center',
              paddingHorizontal: 24,
              flexDirection: 'row',
              gap: 12,
            }}
          >
            <Icons
              name="search"
              size={24}
              color={colors.text}
              style={{ opacity: 0.5 }}
            />
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                color: colors.text,
                opacity: 0.5,
              }}
            >
              Search
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={openFilterModal}
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 52,
              backgroundColor: colors.primary,
            }}
          >
            <Icons name="tune" size={24} color={colors.background} />
          </TouchableOpacity>
        </View>

        {/* Grid Collection View */}
        <View style={{ paddingHorizontal: 24, gap: 24 }}>
          {/* Title */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{ fontSize: 22, fontWeight: '700', color: colors.text }}
            >
              New Collections
            </Text>
            <TouchableOpacity>
              <Text style={{ color: colors.text }}>See All</Text>
            </TouchableOpacity>
          </View>

          {/* Card */}
          <View style={{ flexDirection: 'row', height: 200, gap: 12 }}>
            <View style={{ flex: 1 }}>
              <Card
                onPress={() => navigation.navigate('Details', { id: '123' })}
                price={130}
                imageUrl="https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
              />
            </View>
            <View style={{ flex: 1, gap: 12 }}>
              <Card
                onPress={() => navigation.navigate('Details', { id: '456' })}
                price={120}
                imageUrl="https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
              />
              <Card
                onPress={() => navigation.navigate('Details', { id: '789' })}
                price={170}
                imageUrl="https://images.unsplash.com/photo-1485218126466-34e6392ec754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80"
              />
            </View>
          </View>
        </View>

        {/* Categories */}
        <FlatList
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
          renderItem={({ item, index }) => {
            const isSelected = index === categoryIndex;
            return (
              <TouchableOpacity
                onPress={() => setCategoryIndex(index)}
                style={{
                  backgroundColor: isSelected ? colors.primary : colors.card,
                  paddingHorizontal: 20,
                  paddingVertical: 16,
                  borderRadius: 100,
                  borderColor: colors.border,
                  borderWidth: 1,
                }}
              >
                <Text
                  style={{
                    color: isSelected ? colors.background : colors.text,
                    fontWeight: '600',
                    fontSize: 16,
                    opacity: isSelected ? 1 : 0.5,
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        {/* Masonry */}
        <MasonryList
          data={MASONRY_LIST_DATA}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 20, marginLeft: 4 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }: { item: any; i: number }) => (
            <View
              style={{
                flex: 1,
                aspectRatio: i === 0 ? 1 : 3 / 4,
                overflow: 'hidden',
                marginTop: 16,
                borderRadius: 24,
              }}
            >
              <Image
                style={StyleSheet.absoluteFill}
                source={{
                  uri: item.imageUrl,
                }}
                resizeMode="cover"
              />
              <View style={[StyleSheet.absoluteFill, { padding: 12 }]}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 8,
                    paddingTop: 8,
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#000',
                      textShadowColor: 'rgba(0,0,0,0.2)',
                      textShadowOffset: {
                        height: 1,
                        width: 0,
                      },
                      textShadowRadius: 4,
                    }}
                  >
                    {item.title}
                  </Text>
                  <View
                    style={{
                      backgroundColor: colors.background,
                      borderRadius: 100,
                      width: 32,
                      height: 32,
                      aspectRatio: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icons
                      name="favorite-border"
                      size={20}
                      color={colors.text}
                    />
                  </View>
                </View>
                <View style={{ flex: 1 }}></View>
                {/* ↑ flex 간격 */}
                <View style={{ overflow: 'hidden', borderRadius: 100 }}>
                  <BlurView
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      paddingVertical: 10,
                      paddingHorizontal: 12,
                    }}
                    intensity={20}
                  >
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 16,
                        fontWeight: '600',
                        color: 'white',
                        marginLeft: 8,
                      }}
                    >
                      {item.price}.00
                    </Text>
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: 100,
                        backgroundColor: 'white',
                      }}
                    >
                      <Icons name="add-shopping-cart" size={20} color="#000" />
                    </TouchableOpacity>
                  </BlurView>
                </View>
              </View>
            </View>
          )}
          onEndReachedThreshold={0.1}
        />
      </SafeAreaView>

      {/* BottomSheet Modal */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={['80%']}
        index={0}
        backdropComponent={props => <CustomBackdrop {...props} />}
      >
        <FilterView />
      </BottomSheetModal>
    </ScrollView>
  );
};

export default HomeScreen;
