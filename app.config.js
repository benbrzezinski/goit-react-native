export default {
  expo: {
    name: "Posts",
    slug: "posts",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/app-icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/images/app-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ff672a",
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
      package: "com.example.Posts",
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: "./assets/images/app-icon.png",
        backgroundColor: "#ff672a",
        softwareKeyboardLayoutMode: "pan",
      },
      config: {
        googleMaps: {
          apiKey: "",
        },
      },
    },
    web: {
      favicon: "./assets/images/app-icon.png",
    },
    extra: {
      eas: {
        projectId: "281850a9-8c9a-4a83-bd62-1f5685431f90",
      },
    },
  },
};
