export default {
  expo: {
    name: "Posts",
    slug: "posts",
    version: "1.0.0",
    orientation: "portrait",
    icon: "",
    userInterfaceStyle: "light",
    splash: {
      image: "",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.example.Posts",
      config: {
        googleMapsApiKey: "",
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "",
        backgroundColor: "#ffffff",
        softwareKeyboardLayoutMode: "pan",
      },
    },
    web: {
      favicon: "",
    },
  },
};