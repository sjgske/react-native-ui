import { View, Image, Text } from 'react-native';

const Card = () => {
  return (
    <View
      style={{
        flex: 1,
        height: 200,
        overflow: 'hidden',
        borderRadius: 10,
      }}
    >
      <Image
        style={{ width: '100%', height: '100%' }}
        source={{
          uri: 'https://i.pinimg.com/236x/24/e8/01/24e80139cf644bb0801418caf8acb0b1.jpg',
        }}
        resizeMode="cover"
      />
      <View
        style={{
          position: 'absolute',
          left: 12,
          top: 12,
          paddingHorizontal: 14,
          paddingVertical: 10,
          backgroundColor: 'rgba(0,0,0,0.25)',
          borderRadius: 100,
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#fff' }}>
          ♥︎ 130
        </Text>
      </View>
    </View>
  );
};

export default Card;
