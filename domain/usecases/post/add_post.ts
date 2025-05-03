import { PostRepository } from "../../repositories/post/post_repositories";
//! disini kita menggunakna class dari interface PostRepository, karena nanti kita inject class spesifik repository nya di dalam state management
export class AddPost {
  // bentuk dari constructor(private repo: PostRepository) {} sama dengna di bawah ini
  private repo: PostRepository;
  constructor(repo: PostRepository) {
    this.repo = repo;
  }
  async execute(title: string, body: string) {
    await this.repo.addPost(title, body);
  }
}