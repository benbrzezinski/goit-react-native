import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  Timestamp,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import {
  Post,
  GetUserPostsData,
  AddPostData,
  UpdatePostData,
  LikedUpdatePostPayloadAction,
  DislikedUpdatePostPayloadAction,
  CommentUpdatePostPayloadAction,
} from "../../types";

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, thunkAPI) => {
    try {
      const postsRef = collection(db, "posts");
      const q = query(postsRef, orderBy("createdAt", "desc"));
      const { docs } = await getDocs(q);
      const posts = docs.map(doc => doc.data()) as Post[];
      return posts;
    } catch {
      return thunkAPI.rejectWithValue(
        "There was an error while getting the posts"
      );
    }
  }
);

export const getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async (owner: GetUserPostsData, thunkAPI) => {
    try {
      const postsRef = collection(db, "posts");
      const q = query(
        postsRef,
        where("createdBy", "==", owner),
        orderBy("createdAt", "desc")
      );
      const { docs } = await getDocs(q);
      const posts = docs.map(doc => doc.data()) as Post[];
      return posts;
    } catch {
      return thunkAPI.rejectWithValue(
        "There was an error while getting the user posts"
      );
    }
  }
);

export const addPost = createAsyncThunk(
  "posts/addPost",
  async ({ image, name, locationName }: AddPostData, thunkAPI) => {
    try {
      const owner = auth.currentUser?.uid;

      if (owner) {
        const post = {
          image,
          name,
          locationName,
          usersLikes: [],
          comments: [],
          createdBy: owner,
          createdAt: Timestamp.fromDate(new Date()),
        };

        const postRef = await addDoc(collection(db, "posts"), post);
        await updateDoc(postRef, { id: postRef.id });
        return { ...post, id: postRef.id } as Post;
      }
    } catch {
      return thunkAPI.rejectWithValue(
        "There was an error while adding the post"
      );
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postID: string, thunkAPI) => {
    try {
      await deleteDoc(doc(db, "posts", postID));
      return postID;
    } catch {
      return thunkAPI.rejectWithValue(
        "There was an error while deleting the post"
      );
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ userID, postID, usersLikes, comment }: UpdatePostData, thunkAPI) => {
    try {
      const postRef = doc(db, "posts", postID);

      if (userID && usersLikes) {
        if (!usersLikes.includes(userID)) {
          await updateDoc(postRef, {
            usersLikes: arrayUnion(userID),
          });

          return {
            userID,
            postID,
            type: "liked",
          } as LikedUpdatePostPayloadAction;
        }

        if (usersLikes.includes(userID)) {
          await updateDoc(postRef, {
            usersLikes: arrayRemove(userID),
          });

          return {
            userID,
            postID,
            type: "disliked",
          } as DislikedUpdatePostPayloadAction;
        }
      }

      if (comment) {
        await updateDoc(postRef, {
          comments: arrayUnion(comment),
        });

        return {
          postID,
          type: "comment",
          comment,
        } as CommentUpdatePostPayloadAction;
      }
    } catch {
      return thunkAPI.rejectWithValue(
        "There was an error while updating the post"
      );
    }
  }
);
