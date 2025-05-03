import { PostRepository } from "../../repositories/post/post_repositories";

export class SyncPosts {
  constructor(private repo: PostRepository) {}
  async execute() {
    await this.repo.sync();
  }
}
