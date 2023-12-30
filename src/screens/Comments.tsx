import {
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  ListRenderItemInfo,
} from "react-native";
import { useState, useRef, useCallback } from "react";
import { useRoute } from "@react-navigation/native";
import { Timestamp } from "firebase/firestore";
import { nanoid } from "nanoid";
import { UIActivityIndicator } from "react-native-indicators";
import { AntDesign } from "@expo/vector-icons";
import { CommentsRouteParams, Comment } from "../types";
import { updatePost } from "../redux/posts/actions";
import { useAppDispatch } from "../redux/store";
import { auth } from "../firebase";
import useInputFocused from "../hooks/useInputFocused";
import usePosts from "../hooks/usePosts";

const Comments = () => {
  const {
    params: { id },
  } = useRoute() as CommentsRouteParams;
  const { isCommentFocused, handleInputFocus, handleInputBlur } =
    useInputFocused();
  const [comment, setComment] = useState("");
  const { posts, isPostUpdateLoading } = usePosts();
  const flatListRef = useRef<FlatList>(null);
  const dispatch = useAppDispatch();
  const userID = auth.currentUser?.uid;
  const displayName = auth.currentUser?.displayName;
  const photoURL = auth.currentUser?.photoURL;
  const post = posts.find(post => post.id === id);
  const canBeSend = comment.trim() ? true : false;

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Comment>) => (
      <View
        style={[
          styles.item,
          item.createdBy === userID && { flexDirection: "row-reverse" },
        ]}
        onStartShouldSetResponder={() => true}
      >
        <Image
          source={{ uri: item.profileImg }}
          style={styles.profileImg}
          resizeMode="cover"
          alt="Profile picture"
        />
        <View
          style={[
            styles.comment,
            item.createdBy === userID && {
              borderTopLeftRadius: 6,
              borderTopRightRadius: 0,
            },
          ]}
        >
          <Text
            style={[
              styles.commentText,
              { fontFamily: "RobotoMedium", fontWeight: "500" },
              item.createdBy === userID && { alignSelf: "flex-end" },
            ]}
          >
            {item.username}
          </Text>
          <Text style={styles.commentText}>{item.text}</Text>
          <Text
            style={[
              styles.commentDate,
              item.createdBy === userID && { alignSelf: "flex-start" },
            ]}
          >
            {new Date(
              item.createdAt.seconds * 1000 +
                item.createdAt.nanoseconds / 1000000
            ).toLocaleString()}
          </Text>
        </View>
      </View>
    ),
    []
  );

  return post ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={64}
      style={styles.keyboardAvoidingView}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Image
            source={{ uri: post.image }}
            style={styles.photo}
            resizeMode="cover"
            alt="Place photography"
          />
          <FlatList
            data={post.comments}
            ref={flatListRef}
            renderItem={renderItem}
            keyExtractor={({ id }) => id}
            ListEmptyComponent={
              <Text style={styles.infoText}>There are no comments</Text>
            }
          />
          <View style={styles.inputBox}>
            <TextInput
              style={[
                styles.input,
                comment.length !== 0 && {
                  fontFamily: "RobotoRegular",
                  fontWeight: "400",
                },
                isCommentFocused && { backgroundColor: "#fff" },
              ]}
              placeholder="Comment..."
              placeholderTextColor="#bdbdbd"
              value={comment}
              onChangeText={setComment}
              onFocus={() => handleInputFocus("comment")}
              onBlur={() => handleInputBlur("comment")}
            />
            <TouchableOpacity
              style={[
                styles.sendBtn,
                { backgroundColor: canBeSend ? "#ff6c00" : "#ebebeb" },
              ]}
              activeOpacity={0.8}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              disabled={!canBeSend}
              onPress={async () => {
                await dispatch(
                  updatePost({
                    postID: post.id,
                    comment: {
                      id: nanoid(),
                      username: displayName!,
                      profileImg: photoURL!,
                      text: comment.trim(),
                      createdBy: userID!,
                      createdAt: Timestamp.fromDate(new Date()),
                    },
                  })
                );

                Keyboard.dismiss();
                setComment("");

                if (flatListRef.current) {
                  flatListRef.current.scrollToEnd({ animated: true });
                }
              }}
            >
              {isPostUpdateLoading ? (
                <UIActivityIndicator
                  size={20}
                  color={canBeSend ? "#fff" : "#bdbdbd"}
                  style={{ flex: 0 }}
                />
              ) : (
                <AntDesign
                  name="arrowup"
                  size={22}
                  color={canBeSend ? "#fff" : "#bdbdbd"}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  ) : null;
};

const styles = StyleSheet.create({
  keyboardAvoidingView: { flex: 1, backgroundColor: "#fff" },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 30,
    paddingHorizontal: 16,
  },
  photo: {
    width: "100%",
    aspectRatio: 3 / 2,
    borderRadius: 8,
    marginBottom: 30,
  },
  item: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  profileImg: {
    width: 31,
    height: 31,
    borderRadius: 9999,
  },
  comment: {
    flex: 1,
    gap: 8,
    backgroundColor: "#00000008",
    borderRadius: 6,
    borderTopLeftRadius: 0,
    padding: 16,
  },
  commentText: {
    fontFamily: "RobotoRegular",
    fontWeight: "400",
    fontSize: 13,
    color: "#212121",
  },
  commentDate: {
    alignSelf: "flex-end",
    fontFamily: "RobotoRegular",
    fontWeight: "400",
    fontSize: 10,
    color: "#bdbdbd",
  },
  inputBox: { position: "relative", marginTop: 6 },
  input: {
    fontFamily: "RobotoMedium",
    fontWeight: "500",
    fontSize: 16,
    color: "#212121",
    backgroundColor: "#f6f6f6",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#e8e8e8",
    borderRadius: 100,
    padding: 16,
    paddingRight: 53,
  },
  sendBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 37,
    height: 37,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9999,
  },
  infoText: {
    fontFamily: "RobotoMedium",
    fontWeight: "500",
    fontSize: 14,
    color: "#bdbdbd",
    textAlign: "center",
    marginTop: 15,
  },
});

export default Comments;
