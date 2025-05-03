import { PostStorage } from "@/data/datasources/local/postLocal/post_local";
import { PostApi } from "@/data/datasources/remote/postApi/post_api";
import { PostRepositoryImpl } from "@/data/repositories/post_repositories_impl";
import { PostRepository } from "@/domain/repositories/post/post_repositories";
import { configureStore } from "@reduxjs/toolkit";
import { container } from "tsyringe";
import postSlice from "./postSlice";

const postStorage = container.resolve<PostStorage>(PostStorage);
const postApi = container.resolve<PostApi>(PostApi); // Ambil instance PostStorage dari container


const store = configureStore({
  reducer: {
    post: postSlice, // Pastikan postSlice sudah diimport dengan benar
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { // ✅ Inject dependency di sini
          postRepository: new PostRepositoryImpl(postStorage, postApi),
        },
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type ThunkApiConfig = {
  extra: {
    postRepository: PostRepository; // Type untuk extraArgument
  };
};

export type RootState = ReturnType<typeof store.getState>;
export default store;