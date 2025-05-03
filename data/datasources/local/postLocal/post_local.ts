//? 3. kita memuat postApi dari remote dan postLocal dari local

import { Post } from "@/domain/entities/post/posts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { injectable } from "tsyringe";

const KEY = 'POSTS';
@injectable()
export class PostStorage {
  async getAll(): Promise<Post[]> {
    const data = await AsyncStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];

  }

  async saveAll(posts: Post[]) {
    await AsyncStorage.setItem(KEY, JSON.stringify(posts));
  }
}