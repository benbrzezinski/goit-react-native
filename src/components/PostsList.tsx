import {
  StyleSheet,
  FlatList,
  View,
  Image,
  Text,
  Pressable,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { UIActivityIndicator } from "react-native-indicators";
import { getPosts, updatePost } from "../redux/posts/actions";
import { useAppDispatch } from "../redux/store";
import { auth } from "../firebase";
import usePosts from "../hooks/usePosts";

const PostsList = () => {
  const [updatingPostID, setUpdatingPostID] = useState("");
  const { posts, isPostsLoading, isPostUpdateLoading } = usePosts();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const userID = auth.currentUser?.uid;

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return posts.length > 0 || isPostsLoading ? (
    <FlatList
      data={posts}
      style={styles.list}
      refreshControl={
        <RefreshControl
          refreshing={isPostsLoading}
          onRefresh={() => dispatch(getPosts())}
        />
      }
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Pressable
            onPress={() => {
              if (userID === item.createdBy) {
                navigation.navigate("DeletePost", {
                  id: item.id,
                  imageParam: item.image,
                  nameParam: item.name,
                  locationNameParam: item.locationName,
                });
              }
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.photo}
              resizeMode="cover"
              alt="Place photography"
            />
          </Pressable>
          <Text
            style={[
              styles.text,
              { fontFamily: "RobotoMedium", fontWeight: "500" },
            ]}
          >
            {item.name}
          </Text>
          <View style={styles.infoBox}>
            <View style={styles.btnBox}>
              <Pressable
                style={styles.btn}
                hitSlop={{ top: 10, bottom: 10, left: 5, right: 5 }}
                onPress={() => {
                  setUpdatingPostID(item.id);
                  dispatch(
                    updatePost({
                      userID,
                      postID: item.id,
                      usersLikes: item.usersLikes,
                    })
                  );
                }}
              >
                {isPostUpdateLoading && item.id === updatingPostID ? (
                  <UIActivityIndicator
                    size={24}
                    color="#ff6c00"
                    style={{ flex: 0 }}
                  />
                ) : item.usersLikes.length === 0 ? (
                  <AntDesign name="like2" size={24} color="#bdbdbd" />
                ) : item.usersLikes.includes(userID!) ? (
                  <AntDesign name="like1" size={24} color="#ff6c00" />
                ) : (
                  <AntDesign name="like2" size={24} color="#ff6c00" />
                )}
                <Text
                  style={[
                    styles.text,
                    item.usersLikes.length === 0 ? { color: "#bdbdbd" } : {},
                  ]}
                >
                  {item.usersLikes.length}
                </Text>
              </Pressable>
              <Pressable
                style={styles.btn}
                hitSlop={{ top: 10, bottom: 10, left: 5, right: 5 }}
              >
                {item.comments.length === 0 ? (
                  <FontAwesome name="comments-o" size={26} color="#bdbdbd" />
                ) : (
                  <FontAwesome name="comments-o" size={26} color="#ff6c00" />
                )}
                <Text
                  style={[
                    styles.text,
                    item.comments.length === 0 ? { color: "#bdbdbd" } : {},
                  ]}
                >
                  {item.comments.length}
                </Text>
              </Pressable>
            </View>
            <Pressable
              style={styles.btn}
              hitSlop={{ top: 10, bottom: 10, left: 5, right: 5 }}
              onPress={() =>
                navigation.navigate("Map", {
                  type: "photo",
                  address: item.locationName,
                })
              }
            >
              <Ionicons name="location-outline" size={24} color="#ff6c00" />
              <Text style={[styles.text, { textDecorationLine: "underline" }]}>
                {item.locationName}
              </Text>
            </Pressable>
          </View>
        </View>
      )}
      keyExtractor={item => item.id}
    />
  ) : null;
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  item: {
    gap: 8,
    marginBottom: 30,
  },
  photo: {
    width: "100%",
    aspectRatio: 3 / 2,
    backgroundColor: "#f6f6f6",
    borderRadius: 8,
  },
  text: {
    fontFamily: "RobotoRegular",
    fontWeight: "400",
    fontSize: 16,
    color: "#212121",
  },
  infoBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 15,
  },
  btnBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});

export default PostsList;
