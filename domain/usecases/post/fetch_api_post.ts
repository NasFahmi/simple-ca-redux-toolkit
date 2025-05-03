import { PostRepository } from "../../repositories/post/post_repositories";

export class FetchApiPosts {
  constructor(private repo: PostRepository) {}
  async execute() {
    await this.repo.fetchAndCacheFromApi();
  }
}
