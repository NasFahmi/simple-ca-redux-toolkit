// ==========================
// domain/repositories/PostRepository.ts
// ==========================

import { Post } from "../../entities/post/posts";

//kita membuat interface PostRepository untuk memastikan bahwa postRepositoryImpl nanti akan memiliki method-method ini
//? 4. kita membuat interface PostRepository
//?kita membuat interface PostRepository untuk memastikan bahwa postRepositoryImpl nanti akan memiliki method-method ini

export interface PostRepository {
  getPosts(): Promise<Post[]>;
  addPost(title: string, body: string): Promise<void>;
  deletePost(id: string): Promise<void>;
  sync(): Promise<void>;
  fetchAndCacheFromApi(): Promise<void>;
}