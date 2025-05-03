import { PostRepository } from "../../repositories/post/post_repositories";

export class DeletePost {
    constructor(private repo: PostRepository) {}
    async execute(id: string) {
      await this.repo.deletePost(id);
    }
  }
  