//? 3. kita memuat postApi dari remote dan postLocal dari local

import { Post } from '@/domain/entities/post/posts';
import { POST_API } from '@/utils/api/api_utils';
import axios from 'axios';
import { injectable } from 'tsyringe';
@injectable()
export class PostApi {

  async fetchPosts(): Promise<Post[]> { //return post model di datasources
    const res = await axios.get(`${POST_API}/posts?_limit=5`);
    return res.data.map((e: any) => ({
      id: e.id.toString(),
      title: e.title,
      body: e.body,
      synced: true // Default value
    }));
  }

  async createPost(post: Post) {
    return axios.post(`${POST_API}/posts`, post); // Langsung kirim plain object
  }
}