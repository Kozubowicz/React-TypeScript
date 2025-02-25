import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  PostsPageType,
  PostType,
  ProfilePageType,
  ProfileType,
  searchUserResultType,
} from '../utils/Types';

type InstaContextProvider = {
  children: ReactNode;
};

type InstaContext = {
  tokenId: string | undefined;
  myProfile: ProfileType | undefined;
  LogIn: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  SignOut: () => void;
  SignUp: (
    userName: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;

  DarkMode: boolean;
  LightDarkModeChanger: (e: void) => void;
  showNavBar: boolean;
  setShowNavBar: (show: boolean) => void;

  getUserProfile: (_id: string) => Promise<ProfilePageType | boolean>;

  getPostsPage: (page: number) => Promise<PostsPageType | boolean>;

  serachUser: (userName: string) => Promise<void>;

  getPost: (postId: string) => Promise<PostType | boolean>;

  hasLiked: (postId: string, userId: string) => Promise<boolean>;
  addRemoveLike: (postId: string, userId: string) => Promise<boolean>;
  searchUserResult: searchUserResultType[];
};

const InstaContext = createContext({} as InstaContext);
export function useInstaContext() {
  return useContext(InstaContext);
}
export function InstaContextProvider({ children }: InstaContextProvider) {
  const [tokenId, setTokenId] = useLocalStorage<string>('tokenId', '');
  const [myProfile, setMyProfile] = useState<ProfileType | undefined>();

  const [DarkMode, setDarkMode] = useLocalStorage<boolean>('DarkMode', true);

  const [showNavBar, setShowNavBar] = useState<boolean>(false);

  const [searchUserResult, setSearchUserResult] = useState<
    searchUserResultType[]
  >([]);

  // toggle light/dark mode
  function LightDarkModeChanger() {
    setDarkMode(!DarkMode);
  }

  // Light dark mode
  useEffect(() => {
    if (DarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [DarkMode]);

  // downloading user data from db, base on token in storage
  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const response = await fetch(
          `https://us-east-1.aws.data.mongodb-api.com/app/instacloneapi-phjfx/endpoint/getMyProfile`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: tokenId }),
          }
        );

        const jsonData = await response.json();
        if (!response.ok) {
          throw new Error();
        }

        setMyProfile(jsonData);
      } catch (error) {
        setTokenId('');
        console.error('Error', error);
        throw error;
      }
    };

    if (tokenId && tokenId?.length > 5) {
      getMyProfile();
    }
  }, [tokenId]);

  // cleaning user token from storage
  const SignOut = () => setTokenId('');

  // handling user log in
  async function LogIn(
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(
        `https://us-east-1.aws.data.mongodb-api.com/app/instacloneapi-phjfx/endpoint/LogIn?email=${email}&password=${password}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }
      );

      const jsonData = await response.json();

      if (jsonData.success) {
        console.log(jsonData.id);
        setTokenId(jsonData.id);
      }
      return jsonData;
    } catch (error) {
      console.error('Error Logn In');
      return { success: false, message: 'Internal Error' };
    }
  }

  // handling user sign up
  async function SignUp(
    userName: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(
        `https://us-east-1.aws.data.mongodb-api.com/app/instacloneapi-phjfx/endpoint/SingUp`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userName, email, password }),
        }
      );

      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error('Error', error);
      return { success: false, message: 'Internal server error' };
    }
  }

  // downloading page of posts
  async function getPostsPage(page: number): Promise<PostsPageType | boolean> {
    try {
      const response = await fetch(
        `https://us-east-1.aws.data.mongodb-api.com/app/instacloneapi-phjfx/endpoint/getPostsPage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ page }),
        }
      );
      if (!response.ok) {
        throw new Error();
      }
      const jsonData = await response.json();

      return {
        posts: jsonData.posts,
        pagesNumber: jsonData.pagesNumber,
      };
    } catch (error) {
      console.error('Error', error);
      return false;
    }
  }

  // downloading chosen user profile
  async function getUserProfile(
    _id: string
  ): Promise<ProfilePageType | boolean> {
    try {
      const response = await fetch(
        `https://us-east-1.aws.data.mongodb-api.com/app/instacloneapi-phjfx/endpoint/getProfile`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: _id }),
        }
      );

      if (!response.ok) {
        throw new Error();
      }
      const jsonData = await response.json();

      return jsonData;
    } catch (error) {
      console.error('Error');
      return false;
    }
  }

  // searching users
  async function serachUser(userName: string): Promise<void> {
    if (userName.length > 0) {
      try {
        const response = await fetch(
          `https://us-east-1.aws.data.mongodb-api.com/app/instacloneapi-phjfx/endpoint/SearchUsers`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ searchPhrase: userName }),
          }
        );
        if (!response.ok) {
          throw new Error();
        }
        const jsonData = await response.json();

        setSearchUserResult(jsonData);
      } catch (error) {
        console.error('Error');
      }
    } else setSearchUserResult([]);
  }

  const getPost = async (postId: string): Promise<PostType | boolean> => {
    try {
      const response = await fetch(
        'https://us-east-1.aws.data.mongodb-api.com/app/instacloneapi-phjfx/endpoint/getPost',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId }),
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error('Error');
      return false;
    }
  };

  const hasLiked = async (postId: string, userId: string): Promise<boolean> => {
    try {
      const response = await fetch(
        'https://us-east-1.aws.data.mongodb-api.com/app/instacloneapi-phjfx/endpoint/hasLiked',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId, userId }),
        }
      );

      if (!response.ok) {
        throw new Error();
      }
      const jsonData = await response.json();

      console.log(jsonData);

      return jsonData.hasLiked;
    } catch (error) {
      console.error('Error');
      return false;
    }
  };

  const addRemoveLike = async (
    postId: string,
    userId: string
  ): Promise<boolean> => {
    try {
      const response = await fetch(
        'https://us-east-1.aws.data.mongodb-api.com/app/instacloneapi-phjfx/endpoint/addRemoveLike',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId, userId }),
        }
      );

      if (!response.ok) {
        throw new Error();
      }
      const jsonData = await response.json();

      console.log(jsonData);

      return jsonData.hasLiked;
    } catch (error) {
      console.error('Error');
      return false;
    }
  };

  return (
    <>
      <InstaContext.Provider
        value={{
          tokenId,
          myProfile,
          LogIn,
          SignOut,
          SignUp,

          LightDarkModeChanger,
          DarkMode,
          setShowNavBar,
          showNavBar,

          getPostsPage,
          getUserProfile,

          getPost,
          hasLiked,
          addRemoveLike,

          serachUser,
          searchUserResult,
        }}
      >
        {children}
      </InstaContext.Provider>
    </>
  );
}
