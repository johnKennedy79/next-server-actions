import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function AddPostPage() {
  const result = await db.query(`SELECT * FROM categories`);
  const cats = result.rows;
  const TagResult = await db.query(`SELECT * FROM tags`);
  const tags = TagResult.rows;
  async function handleAddPost(formData) {
    "use server";
    console.log("form action complete");
    const title = formData.get("title");
    const category = formData.get("category");
    const content = formData.get("content");
    const tag = formData.get("tag");

    const newPost = await db.query(
      `INSERT INTO posts (title, content, category_id ) VALUES ($1, $2, $3) RETURNING id`,
      [title, content, category]
    );
    console.log(newPost);
    await db.query(`INSERT INTO posts_tags (post_id, tag_id) VALUES ($1, $2)`, [
      newPost.rows[0].id,
      tag,
    ]);

    revalidatePath("/");
    redirect("/");
  }
  return (
    <>
      <h2>Add a new post</h2>
      <form action={handleAddPost}>
        <input type="text" name="title" />
        <textarea name="content" />
        <select name="category">
          <option>Select Category</option>
          {cats.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <select name="tag">
          <option>Select Category</option>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
        <button></button>
      </form>
    </>
  );
}
