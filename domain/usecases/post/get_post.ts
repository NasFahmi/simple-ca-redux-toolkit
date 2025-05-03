// ==========================
// domain/usecases/GetPosts.ts
// ==========================

import { PostRepository } from "../../repositories/post/post_repositories";

export class GetPosts {
  constructor(private repo: PostRepository) {}
  async execute() {
    return await this.repo.getPosts();
  }
}