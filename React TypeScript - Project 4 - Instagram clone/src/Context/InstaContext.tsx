import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  CommentType,
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

  searchUser: (userName: string) => Promise<void>;

  getPost: (postId: string) => Promise<PostType | boolean>;

  hasLiked: (postId: string, userId: string) => Promise<boolean>;
  addRemoveLike: (postId: string, userId: string) => Promise<boolean>;

  hasFollowed: (profileId: string) => Promise<boolean>;
  getFollows: (
    page: number
  ) => Promise<{ follows: ProfileType[]; isMore: boolean }>;
  addRemoveFollow: (
    profileId: string
  ) => Promise<{ isFollowing: boolean; result: string }>;

  getComments: (
    postId: string,
    page: number
  ) => Promise<{ comments: CommentType[]; isMore: boolean } | boolean>;

  addComment: (
    postId: string,
    commentBody: string
  ) => Promise<{ success: boolean; insertedId?: string }>;

  sendMessage: () => void;

  errorMessage: string | undefined;
  setErrorMessage: (message: string | undefined) => void;
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

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

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
  const SignOut = () => {
    setTokenId('');
    setMyProfile(undefined);
  };

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
  async function searchUser(userName: string): Promise<void> {
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

      return jsonData.hasLiked;
    } catch (error) {
      console.error('Error');
      return false;
    }
  };

  const addRemoveFollow = async (
    profileId: string
  ): Promise<{ isFollowing: boolean; result: string }> => {
    if (!tokenId) {
      setErrorMessage('You must be logged in to follow');
      return { isFollowing: false, result: 'Error' };
    } else if (profileId === tokenId) {
      setErrorMessage('You can not follow yourself');
      return { isFollowing: false, result: 'Error' };
    } else {
      try {
        const response = await fetch(
          'https://us-east-1.aws.data.mongodb-api.com/app/instacloneapi-phjfx/endpoint/addRemoveFollow',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: tokenId, profileId }),
          }
        );

        if (!response.ok) {
          throw new Error();
        }
        const jsonData = await response.json();

        console.log(jsonData);

        return jsonData;
      } catch (error) {
        console.error('Error');
        return { isFollowing: false, result: 'Error' };
      }
    }
  };

  const hasFollowed = async (profileId: string): Promise<boolean> => {
    if (tokenId) {
      try {
        const response = await fetch(
          'https://us-east-1.aws.data.mongodb-api.com/app/instacloneapi-phjfx/endpoint/hasFollowed',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: tokenId, profileId }),
          }
        );

        if (!response.ok) {
          throw new Error();
        }

        const jsonData = await response.json();

        return jsonData;
      } catch (error) {
        console.error(error);
        return false;
      }
    } else {
      return false;
    }
  };

  const getComments = async (
    postId: string,
    page = 1
  ): Promise<{ comments: CommentType[]; isMore: boolean } | boolean> => {
    try {
      const response = await fetch(
        'https://us-east-1.aws.data.mongodb-api.com/app/instacloneapi-phjfx/endpoint/getComments',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId, page }),
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      const jsonData = await response.json();

      return jsonData;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const addComment = async (
    postId: string,
    commentBody: string
  ): Promise<{ success: boolean; insertedId?: string }> => {
    try {
      const response = await fetch(
        'https://us-east-1.aws.data.mongodb-api.com/app/instacloneapi-phjfx/endpoint/addComment',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId, userId: tokenId, commentBody }),
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      const jsonData = await response.json();

      return jsonData;
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  };

  const getFollows = async (
    page: number
  ): Promise<{ follows: ProfileType[]; isMore: boolean }> => {
    if (tokenId) {
      try {
        const response = await fetch(
          'https://us-east-1.aws.data.mongodb-api.com/app/instacloneapi-phjfx/endpoint/getFollows',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: tokenId, page }),
          }
        );

        if (!response.ok) {
          throw new Error();
        }

        const jsonData = await response.json();

        console.log(jsonData);

        return jsonData;
      } catch (error) {
        console.error(error);
        return { follows: [], isMore: false };
      }
    } else {
      setErrorMessage('You must be logged in to get list of follows');
      return { follows: [], isMore: false };
    }
  };

  const sendMessage = () => {
    setErrorMessage('Function not yet implemented');
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setErrorMessage(undefined);
    }, 2000);

    return () => clearTimeout(timeOut);
  }, [errorMessage]);

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

          hasFollowed,
          getFollows,
          addRemoveFollow,

          getComments,
          addComment,

          sendMessage,

          errorMessage,
          setErrorMessage,

          searchUser,
          searchUserResult,
        }}
      >
        {children}
      </InstaContext.Provider>
    </>
  );
}
