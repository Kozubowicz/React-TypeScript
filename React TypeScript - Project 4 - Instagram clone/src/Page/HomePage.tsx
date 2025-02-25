import { HomePageUserHeader } from '../Components/HomePageUserHeader';
import { PostItem } from '../Components/PostItem';
import { useInstaContext } from '../Context/InstaContext';
import { useState, useEffect, useRef } from 'react';
import { PostType } from '../utils/Types';
import { Loader } from '../Components/Loader';

export function HomePage() {
  const { getPostsPage } = useInstaContext();
  const [posts, setPosts] = useState<PostType[] | undefined>(undefined);
  const [pagesNumber, setPagesNumber] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [success, setSuccess] = useState<boolean | undefined>(undefined);

  const isFetching = useRef(false);

  const fetchMorePosts = async () => {
    if (currentPage < pagesNumber) {
      try {
        isFetching.current = true;
        const tmp = await getPostsPage(currentPage + 1);

        if (typeof tmp === 'boolean') {
          throw new Error();
        }

        setSuccess(true);
        setPosts((prevPosts) => [...(prevPosts || []), ...tmp.posts]);
        setCurrentPage((prevPage) => prevPage + 1);
      } catch (error) {
        setSuccess(false);
        console.error('Error');
      } finally {
        isFetching.current = false;
      }
    }
  };

  const handleScroll = () => {
    const scrollPosition =
      window.innerHeight + document.documentElement.scrollTop;
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
        const tmp = await getPostsPage(0);

        if (typeof tmp === 'boolean') {
          throw new Error();
        }

        setSuccess(true);
        setPosts(tmp.posts);
        setPagesNumber(tmp.pagesNumber);
      } catch (error) {
        setSuccess(false);
        console.error('Error');
      }
    };
    fetachPost();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage, pagesNumber]);

  return (
    <>
      <div className='HomePage'>
        <div className='HomePage-item HomePage-item-site' />
        <div className='HomePage-item'>
          {success === false && <div>Error during Featching</div>}
          {!!success && posts ? (
            <div className='HomePage-item-postsList'>
              {posts.map((e) => (
                <PostItem post={e} key={e._id} />
              ))}
            </div>
          ) : (
            <Loader />
          )}
        </div>

        <div className='HomePage-item HomePage-item-site'>
          <HomePageUserHeader />
        </div>
      </div>
    </>
  );
}
