import { db } from "@/lib/db.js";
import Link from "next/link";
export default async function Home() {
  const result = await db.query(`SELECT * FROM all_data_view`);
  const posts = result.rows;

  return (
    <div>
      <h2>Home</h2>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/posts">Posts</Link>
      </nav>
      {posts.map(function (post) {
        return (
          <div key={post.id}>
            <h2>{post.category}</h2>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p> Tags: {post.tags}</p>
          </div>
        );
      })}
    </div>
  );
}
