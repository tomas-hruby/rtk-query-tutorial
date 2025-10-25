import { useState } from "react";
import "./App.css";
import {
  useGetPostsQuery,
  useCreatePostsMutation,
} from "./servicers/jsonPlaceholderApi";
import { Post } from "./types";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [newPost, setNewPost] = useState<Post>({
    title: "",
    body: "",
    id: uuidv4() as unknown as number,
  });
  const { data, error, isLoading } = useGetPostsQuery(null);
  const [createPost, { isLoading: isCreating, error: createError }] =
    useCreatePostsMutation();

  const handleCreatePost = async () => {
    await createPost(newPost);
    setNewPost({
      title: "",
      body: "",
      id: uuidv4() as unknown as number,
    });
  };

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  if (createError) {
    return <div className="App">There was error creating a post/</div>;
  }
  if (error) {
    return <div className="App">Error occurred</div>;
  }
  console.log(data);
  return (
    <div className="App">
      <div>
        <input
          type="text"
          id="title"
          placeholder="Title"
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <br />
        <textarea
          id="body"
          placeholder="Body"
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
        ></textarea>
        <br />
        <button onClick={handleCreatePost} disabled={isCreating}>
          {isCreating ? "Creating..." : "Create Post"}
        </button>
      </div>
      {data?.map((post: Post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
