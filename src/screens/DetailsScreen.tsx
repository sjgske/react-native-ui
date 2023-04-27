import { RootStackScreenProps } from 'navigators/RootStackNavigator';
import { SafeAreaView, Text } from 'react-native';

const DetailsScreen = ({
  navigation,
  route: {
    params: { id },
  },
}: RootStackScreenProps<'Details'>) => {
  return (
    <SafeAreaView>
      <Text>ID: {id}</Text>
    </SafeAreaView>
  );
};

export default DetailsScreen;
