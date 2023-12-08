import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const HeaderLeft = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <Pressable
      style={{ paddingLeft: 16 }}
      onPress={handleGoBack}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <AntDesign name="arrowleft" size={24} color="#bdbdbd" />
    </Pressable>
  );
};

export default HeaderLeft;
