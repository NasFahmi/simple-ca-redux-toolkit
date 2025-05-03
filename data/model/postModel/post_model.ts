import { Post } from "@/domain/entities/post/posts";

//? 2. buat post model dari interface entity yang sudah kita buat
//? kita membuat implements Post dari entity agar PostModel memiliki struktur yang sama dengan Post
// class ini digunakna untuk mengkonversi dari json ke model dan sebaliknya, namun untuk tipe data masih tetap menggunakn interface Post
// jadi cllass ini nanti akan berhadapan lansung dengan json dari api atau local storage
export class PostModel implements Post {
  constructor(
    public id: string,
    public title: string,
    public body: string,
    public synced: boolean = false
  ) { }

  // function konversi dari api ke model
  static fromJson(json: any): PostModel {
    return new PostModel(
      json.id?.toString() ?? Date.now().toString(),
      json.title,
      json.body,
      true
    );
  }

  toJson() {
    return {
      id: this.id,
      title: this.title,
      body: this.body,
    };
  }
}