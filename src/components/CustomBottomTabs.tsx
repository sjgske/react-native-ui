import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icons from '@expo/vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';

const CustomBottomTabs = (props: BottomTabBarProps) => {
  const { colors } = useTheme();
  return (
    <SafeAreaView edges={['bottom']}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {props.state.routes.map((route, i) => {
          const isActive = i === props.state.index;
          return (
            <Pressable
              key={route.name}
              onPress={() => props.navigation.navigate(route.name)}
              style={{
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                paddingVertical: 8,
                paddingHorizontal: 24,
              }}
            >
              <View
                style={{
                  width: 32,
                  height: 32,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isActive ? colors.primary : 'transparent',
                  borderRadius: 32,
                }}
              >
                <Icons
                  name={
                    route.name === 'Home'
                      ? 'home'
                      : route.name === 'Cart'
                      ? 'shopping-cart'
                      : route.name === 'Payment'
                      ? 'account-balance-wallet'
                      : 'person'
                  }
                  size={24}
                  color={isActive ? '#fff' : colors.text}
                  style={{
                    opacity: isActive ? 1 : 0.5,
                  }}
                />
              </View>
              {isActive && (
                <Text
                  style={{ marginLeft: 4, fontSize: 12, fontWeight: '600' }}
                >
                  {route.name}
                </Text>
              )}
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default CustomBottomTabs;
