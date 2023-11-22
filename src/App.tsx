import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Open up App.tsx to start working on your app!?
      </Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
});

export default App;