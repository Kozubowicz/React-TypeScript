import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type InstaContextProvider = {
  children: ReactNode;
};
type MyProfile = {
  _id: string;
  userName: string;
  profileImg: string;
  description: string;
};
type getPostsType = {
  posts: PostType[];
  pagesNumber: number;
};
type PostType = {
  _id: string;
  userId: string;
  name: string;
  description: string;
  imgUrl: string;
  userName: string;
  profileImg: string;
};
type UserProfile = {
  _id: string;
  userName: string;
  profileImg: string;
  description: string;
  posts: UserPosts[];
};
type UserPosts = {
  _id: string;
  userId: string;
  name: string;
  description: string;
  imgUrl: string;
};
type ModalUser = {
  userId: string;
  userName: string;
  profileImg: string;
};

type searchUserResult = {
  _id: string;
  userName: string;
  profileImg: string;
  description: string;
};

type InstaContext = {
  setSucess: (e: boolean | undefined) => void;
  sucess: boolean | undefined;
  tokenId: string;
  myProfile: MyProfile;
  LogIn: (email: string, password: string) => void;
  SignOut: () => void;
  SignUp: (userName: string, email: string, password: string) => Promise<string>;

  DarkMode: boolean;
  LightDarkModeChanger: (e: void) => void;
  aspectRatio: number;
  showNavBar: boolean;
  setShowNavBar: (show: boolean) => void;
  modalOn: boolean;
  setModalOn: (show: boolean) => void;
  modalImg: string;
  setModalImg: (img: string) => void;
  modalUser: ModalUser;
  setModalUser: (ModalUser: ModalUser) => void;

  userId: string;
  setUserId: (_id: string) => void;

  userProfile: UserProfile;
  getUserProfile: (_id: string) => Promise<void>;

  getPosts: (page: number) => Promise<getPostsType>;

  serachUser: (userName: string) => Promise<void>;

  searchUserResult: searchUserResult[];
};

const InstaContext = createContext({} as InstaContext);
export function useInstaContext() {
  return useContext(InstaContext);
}
export function InstaContextProvider({ children }: InstaContextProvider) {
  const [sucess, setSucess] = useState<boolean | undefined>();
  const [tokenId, setTokenId] = useLocalStorage<string>("tokenId", "");
  const [myProfile, setMyProfile] = useState<MyProfile>({} as MyProfile);

  const [userId, setUserId] = useState<string>("");
  const [DarkMode, setDarkMode] = useLocalStorage<boolean>("DarkMode", true);
  const [aspectRatio, setAspectRatio] = useState<number>(0);
  const [showNavBar, setShowNavBar] = useState<boolean>(false);
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [modalImg, setModalImg] = useState<string>("");
  const [modalUser, setModalUser] = useState<ModalUser>({} as ModalUser);

  const [searchUserResult, setSearchUserResult] = useState<searchUserResult[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({} as UserProfile);

  function handleResize(): void {
    const { innerWidth, innerHeight } = window;
    const tmp = innerWidth / innerHeight;
    setAspectRatio(tmp);
  }
  window.addEventListener("resize", handleResize);

  function LightDarkModeChanger() {
    setDarkMode(!DarkMode);
  }

  useEffect(() => {
    if (DarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    handleResize();
  }, [DarkMode]);

  useEffect(() => {
    const getMyProfile = async () => {
      if (tokenId.length > 5) {
        try {
          const response = await fetch(
            `https://us-east-1.aws.data.mongodb-api.com/app/instacloneapi-phjfx/endpoint/getMyProfile?userId=${tokenId}`
          );
          if (!response.ok) {
            throw new Error();
          }
          const jsonData = await response.json();
          setMyProfile(jsonData);
        } catch (error) {
          console.error("Error");
        }
      }
    };
    getMyProfile();
  }, [tokenId]);

  const SignOut = () => setTokenId("");

  async function LogIn(email: string, password: string): Promise<void> {
    try {
      const response = await fetch(
        `https://us-east-1.aws.data.mongodb-api.com/app/instacloneapi-phjfx/endpoint/LogIn?email=${email}&password=${password}`
      );
      if (!response.ok) {
        setSucess(false);
        throw new Error();
      }
      const jsonData = await response.json();
      setTokenId(jsonData);
    } catch (error) {
      console.error("Error Logn In");
      throw error;
    }
  }

  async function SignUp(userName: string, email: string, password: string): Promise<string> {
    try {
      const response = await fetch(
        `https://us-east-1.aws.data.mongodb-api.com/app/instacloneapi-phjfx/endpoint/SingUp?userName=${userName}&email=${email}&password=${password}`
      );
      if (!response.ok) {
        setSucess(false);
        throw new Error();
      }
      setSucess(true);
      const jsonData = await response.json();
      return jsonData as string;
    } catch (error) {
      console.error("Error");
      throw error;
    }
  }

  async function getPosts(page: number): Promise<getPostsType> {
    try {
      const response = await fetch(
        `https://us-east-1.aws.data.mongodb-api.com/app/instacloneapi-phjfx/endpoint/getPosts?page=${page}`
      );
      if (!response.ok) {
        throw new Error();
      }
      const jsonData = await response.json();
      console.log(jsonData);

      return {
        posts: jsonData.posts,
        pagesNumber: jsonData.pagesNumber,
      };
    } catch (error) {
      console.error("Error");
      throw error;
    }
  }

  async function getUserProfile(_id: String): Promise<void> {
    try {
      const response = await fetch(
        `https://us-east-1.aws.data.mongodb-api.com/app/instacloneapi-phjfx/endpoint/getProfile?userId=${_id}`
      );

      if (!response.ok) {
        throw new Error();
      }
      const jsonData = await response.json();
      setUserProfile(jsonData);
      //return jsonData;
    } catch (error) {
      console.error("Error");
      throw error;
    }
  }

  async function serachUser(userName: string): Promise<void> {
    if (userName.length > 0) {
      try {
        const response = await fetch(
          `https://us-east-1.aws.data.mongodb-api.com/app/instacloneapi-phjfx/endpoint/SearchUsers?searchPhrase=${userName}`
        );
        if (!response.ok) {
          throw new Error();
        }
        const jsonData = await response.json();

        setSearchUserResult(jsonData);
      } catch (error) {
        console.error("Error");
      }
    } else setSearchUserResult([]);
  }

  return (
    <>
      <InstaContext.Provider
        value={{
          setSucess,
          sucess,
          tokenId,
          myProfile,
          LogIn,
          SignOut,
          SignUp,

          LightDarkModeChanger,
          DarkMode,
          userId,
          setUserId,
          aspectRatio,
          setShowNavBar,
          showNavBar,
          setModalOn,
          modalOn,
          setModalImg,
          modalImg,
          setModalUser,
          modalUser,
          getPosts,

          userProfile,
          getUserProfile,

          serachUser,
          searchUserResult,
        }}
      >
        {children}
      </InstaContext.Provider>
    </>
  );
}
