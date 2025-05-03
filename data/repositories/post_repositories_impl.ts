// ==========================
// data/repositories/PostRepositoryImpl.ts
// ==========================
import { Post } from "@/domain/entities/post/posts";
import { PostRepository } from "@/domain/repositories/post/post_repositories";
import { PostStorage } from "../datasources/local/postLocal/post_local";
import { PostApi } from "../datasources/remote/postApi/post_api";

//? 5. kita membuat class PostRepositoryImpl yang mengimplementasikan PostRepository

export class PostRepositoryImpl implements PostRepository {
  private local: PostStorage
  private remote: PostApi
  constructor(
    local: PostStorage, remote: PostApi

  ) {
    this.local = local;
    this.remote = remote;
  }
  //ketika kita menghapus salah satu function dibawah ini, maka class ini nanti akan error karena kita sudah engimplements PostRepository
  //jadi kita harus mengimplementasikan semua function yang ada di PostRepositorys
  async getPosts(): Promise<Post[]> {
    return this.local.getAll(); // ✅ Sudah plain object
  }

  async addPost(title: string, body: string) {
    const newPost: Post = { // ✅ Buat plain object
      id: Date.now().toString(),
      title,
      body,
      synced: false
    };
    const all = await this.local.getAll();
    all.push(newPost);
    await this.local.saveAll(all);
  }

  async deletePost(id: string) {
    const all = await this.local.getAll();
    const filtered = all.filter(p => p.id !== id);
    await this.local.saveAll(filtered);
  }

  async sync() {
    const all = await this.local.getAll();
    const unsynced = all.filter(p => !p.synced);

    for (const post of unsynced) {
      await this.remote.createPost(post);
      post.synced = true;
    }

    await this.local.saveAll(all);
  }

  async fetchAndCacheFromApi() {
    const posts = await this.remote.fetchPosts();
    await this.local.saveAll(posts);
  }
}