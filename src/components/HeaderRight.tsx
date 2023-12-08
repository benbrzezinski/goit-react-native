import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { HeaderRightTypes } from "../types";

const HeaderRight = ({ style }: HeaderRightTypes) => {
  const navigation = useNavigation();

  const handleLogOut = () => {
    navigation.navigate("Login");
  };

  return (
    <Pressable
      style={style}
      onPress={handleLogOut}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Feather name="log-out" size={24} color="#bdbdbd" />
    </Pressable>
  );
};

export default HeaderRight;
