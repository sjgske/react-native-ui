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

const CATEGORIES = ['Clothing', 'Shoes', 'Accessories', 'Bags', 'Perfumes'];

const HomeScreen = () => {
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
              <Card />
            </View>
            <View style={{ flex: 1, gap: 12 }}>
              <Card />
              <Card />
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
          data={[1, 2, 3, 4, 5]}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 20, marginLeft: 4 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }) => (
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
                style={[
                  StyleSheet.absoluteFill,
                  { width: '100%', height: '100%' },
                ]}
                source={{
                  uri: 'https://i.pinimg.com/236x/00/f4/4a/00f44a799775319a3ee841d61d9f5fc7.jpg',
                }}
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
                    }}
                  >
                    PUMA Everyday Hussle
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
                      160.00
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
