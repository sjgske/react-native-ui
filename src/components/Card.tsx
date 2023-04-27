import { View, Image, Text, TouchableOpacity } from 'react-native';

interface Props {
  price: number;
  imageUrl: string;
  onPress: () => void;
}

const Card = ({ price, imageUrl, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
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
          uri: imageUrl,
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
          $ {price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
