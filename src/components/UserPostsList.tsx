import {
  StyleSheet,
  FlatList,
  View,
  Image,
  Text,
  Pressable,
  RefreshControl,
  ListRenderItemInfo,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { UIActivityIndicator } from "react-native-indicators";
import { getUserPosts, updatePost } from "../redux/posts/actions";
import { useAppDispatch } from "../redux/store";
import { Post } from "../types";
import { auth } from "../firebase";
import ListEmpty from "./ListEmpty";
import usePosts from "../hooks/usePosts";

const UserPostsList = () => {
  const [updatingPostID, setUpdatingPostID] = useState("");
  const { userPosts, isPostsLoading, isPostUpdateLoading } = usePosts();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const userID = auth.currentUser?.uid;

  useEffect(() => {
    dispatch(getUserPosts(userID!));
  }, [dispatch]);

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<Post>) => (
      <View
        style={[
          styles.item,
          { marginBottom: index === userPosts.length - 1 ? 40 : 30 },
        ]}
      >
        <Pressable
          onPress={() =>
            navigation.navigate("DeletePost", {
              id: item.id,
              imageParam: item.image,
              nameParam: item.name,
              locationNameParam: item.locationName,
            })
          }
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
        <View style={styles.box}>
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
                  item.usersLikes.length === 0 && { color: "#bdbdbd" },
                ]}
              >
                {item.usersLikes.length}
              </Text>
            </Pressable>
            <Pressable
              style={styles.btn}
              hitSlop={{ top: 10, bottom: 10, left: 5, right: 5 }}
              onPress={() =>
                navigation.navigate("Comments", {
                  id: item.id,
                })
              }
            >
              {item.comments.length === 0 ? (
                <FontAwesome name="comments-o" size={26} color="#bdbdbd" />
              ) : (
                <FontAwesome name="comments-o" size={26} color="#ff6c00" />
              )}
              <Text
                style={[
                  styles.text,
                  item.comments.length === 0 && { color: "#bdbdbd" },
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
    ),
    [isPostUpdateLoading]
  );

  return (
    <FlatList
      data={userPosts}
      style={styles.list}
      refreshControl={
        <RefreshControl
          refreshing={isPostsLoading}
          onRefresh={() => dispatch(getUserPosts(userID!))}
        />
      }
      renderItem={renderItem}
      keyExtractor={({ id }) => id}
      ListEmptyComponent={<ListEmpty text="You have no posts" />}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  item: {
    gap: 8,
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
  box: {
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

export default UserPostsList;
