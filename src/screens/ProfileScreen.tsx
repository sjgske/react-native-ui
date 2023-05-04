import { useTheme } from '@react-navigation/native';
import { FieldValues, useForm, Controller, FieldError } from 'react-hook-form';
import {
  TextInput,
  View,
  Text,
  Button,
  Alert,
  TextInputProps,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface InputProps extends TextInputProps {
  error: FieldError | undefined;
}

const Input = ({ error, ...props }: InputProps) => {
  const { colors } = useTheme();
  return (
    <View>
      <TextInput
        style={{
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: 10,
          padding: 10,
          marginBottom: 12,
        }}
        /* 대문자로 시작 방지 */
        autoCapitalize="none"
        autoCorrect={false}
        {...props}
      />
      {error?.message && (
        <Text style={{ fontSize: 12, color: 'red', paddingLeft: 5 }}>
          {error.message}
        </Text>
      )}
    </View>
  );
};

const defaultValues = {
  email: '',
  password: '',
};

const ProfileScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm();

  const onSubmit = (data: FieldValues) => Alert.alert(JSON.stringify(data));

  return (
    <SafeAreaView style={{ padding: 100, flex: 1, alignItems: 'center' }}>
      <Text style={{ marginBottom: 30, fontSize: 24, fontWeight: '700' }}>
        Login
      </Text>
      <View style={{ flex: 1, width: '100%', gap: 20 }}>
        <Controller
          name="email"
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="이메일"
              error={error}
            />
          )}
          rules={{
            required: { value: true, message: '필수 입력입니다.' },
            pattern: {
              // 정규표현식 -> / 로 열고 닫아줘야함
              value: /^[a-zA-Z0-9+-.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: '이메일 형식이 아닙니다.',
            },
          }}
        />
        <Controller
          name="password"
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Input
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="비밀번호"
              secureTextEntry={true}
              error={error}
            />
          )}
          rules={{
            required: { value: true, message: '필수 입력입니다.' },
            minLength: { value: 8, message: '8글자 이상 입력해주세요.' },
          }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Button
            onPress={() => reset(defaultValues)}
            title="Clear"
            color="red"
          />
          <Button
            disabled={isSubmitting} // 중복 제출 방지
            onPress={handleSubmit(onSubmit)}
            title="Submit"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
