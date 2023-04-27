import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import HomeScreen from 'screens/HomeScreen';
import CartScreen from 'screens/CartScreen';
import PaymentScreen from 'screens/PaymentScreen';
import ProfileScreen from 'screens/ProfileScreen';
import CustomBottomTabs from 'components/CustomBottomTabs';
import Icons from '@expo/vector-icons/MaterialIcons';
import { CompositeScreenProps } from '@react-navigation/native';
import { RootStackScreenProps } from './RootStackNavigator';

export type TabsStackParamList = {
  Home: undefined;
  Cart: undefined;
  Payment: undefined;
  Profile: undefined;
};

export type TabsStackScreenProps<T extends keyof TabsStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabsStackParamList, T>,
    RootStackScreenProps<'TabsStack'>
  >;

const TabNavigator = () => {
  const Tab = createBottomTabNavigator<TabsStackParamList>();
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <CustomBottomTabs {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: props => <Icons name="home" {...props} /> }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: props => <Icons name="shopping-cart" {...props} />,
        }}
      />
      <Tab.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          tabBarIcon: props => (
            <Icons name="account-balance-wallet" {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: props => <Icons name="person" {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
