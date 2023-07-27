import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type InstaContextProvider = {
  children: ReactNode;
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

  getUserProfile: () => Promise<UserProfile>;

  getPosts: () => Promise<PostType[]>;

  serachUser: (userName: string) => Promise<void>;

  searchUserResult: searchUserResult[];
};

const InstaContext = createContext({} as InstaContext);
export function useInstaContext() {
  return useContext(InstaContext);
}
export function InstaContextProvider({ children }: InstaContextProvider) {
  const [userId, setUserId] = useState<string>("");
  const [DarkMode, setDarkMode] = useState<boolean>(true);
  const [aspectRatio, setAspectRatio] = useState<number>(0);
  const [showNavBar, setShowNavBar] = useState<boolean>(false);
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [modalImg, setModalImg] = useState<string>("");
  const [modalUser, setModalUser] = useState<ModalUser>({} as ModalUser);

  const [searchUserResult, setSearchUserResult] = useState<searchUserResult[]>([]);

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

  async function getPosts(): Promise<PostType[]> {
    try {
      const response = await fetch(
        "https://us-east-1.aws.data.mongodb-api.com/app/instacloneapi-phjfx/endpoint/getPosts"
      );
      if (!response.ok) {
        throw new Error();
      }
      const jsonData = await response.json();

      return jsonData;
    } catch (error) {
      console.error("Error");
      throw error;
    }
  }

  async function getUserProfile(): Promise<UserProfile> {
    try {
      const response = await fetch(
        `https://us-east-1.aws.data.mongodb-api.com/app/instacloneapi-phjfx/endpoint/getProfile?userId=${userId}`
      );

      if (!response.ok) {
        throw new Error();
      }
      const jsonData = await response.json();

      return jsonData;
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
        console.log(jsonData);

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
