import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { ListEmptyTypes } from "../types";

const ListEmpty = ({ text }: ListEmptyTypes) => {
  const navigation = useNavigation();

  return (
    <View style={styles.infoContainer}>
      <Text style={styles.infoText}>{text}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("CreatePost")}
      >
        <MaterialIcons name="post-add" size={60} color="#ff6c00" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
    marginTop: 30,
  },
  infoText: {
    fontFamily: "RobotoMedium",
    fontWeight: "500",
    fontSize: 16,
    color: "#bdbdbd",
  },
});

export default ListEmpty;
