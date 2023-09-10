import { Post } from "../Components/Post";
import { useInstaContext } from "../Context/InstaContext";
import { useState, useEffect, useRef } from "react";

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
  const [posts, setPosts] = useState<PostType[]>([]);
  const [pagesNumber, setPagesNumber] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const isFetching = useRef(false);

  const fetchMorePosts = async () => {
    if (currentPage < pagesNumber) {
      try {
        isFetching.current = true;
        const tmp = await getPosts(currentPage + 1);
        setPosts((prevPosts) => [...prevPosts, ...tmp.posts]);
        setCurrentPage((prevPage) => prevPage + 1);
      } catch (error) {
        console.error("Error");
      } finally {
        isFetching.current = false;
      }
    }
  };

  const handleScroll = () => {
    const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
    const bottomPosition = document.documentElement.offsetHeight * 0.9;
    if (scrollPosition >= bottomPosition && !isFetching.current) {
      isFetching.current = true;
      setTimeout(() => {
        fetchMorePosts();
      }, 200);
    }
  };

  useEffect(() => {
    const fetachPost = async () => {
      try {
        const tmp = await getPosts(0);
        setPosts(tmp.posts);
        setPagesNumber(tmp.pagesNumber);
      } catch (error) {
        console.error("Error");
        return [];
      }
    };
    fetachPost();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage, pagesNumber]);

  return (
    <>
      <div className="HomePage">
        {posts.map((e) => (
          <Post post={e} key={e._id} />
        ))}
      </div>
    </>
  );
}
