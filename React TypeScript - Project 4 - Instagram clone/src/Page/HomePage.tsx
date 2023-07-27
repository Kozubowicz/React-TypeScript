import { Post } from "../Components/Post";
import { useInstaContext } from "../Context/InstaContext";
import { useState, useEffect } from "react";

type PostType = {
  _id: string;
  userId: string;
  name: string;
  description: string;
  imgUrl: string;
  userName: string;
  profileImg: string;
};

export function HomePage() {
  const { getPosts } = useInstaContext();
  const [posts, setPosts] = useState<PostType[]>();

  useEffect(() => {
    const fetachPost = async () => {
      try {
        const tmp = await getPosts();
        setPosts(tmp);
      } catch (error) {
        console.error("Error");
        return [];
      }
    };
    fetachPost();
  }, []);

  getPosts();
  return (
    <>
      <div className="HomePage">
        {posts?.map((e) => (
          <Post post={e} key={e._id} />
        ))}
      </div>
    </>
  );
}
