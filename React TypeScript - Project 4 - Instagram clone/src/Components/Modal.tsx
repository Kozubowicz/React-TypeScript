import { useState } from "react";
import { useInstaContext } from "../Context/InstaContext";
import { FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa";
import { MyProfile } from "./MyProfile";

export function Modal() {
  const { aspectRatio, setModalOn, modalImg, modalUser } = useInstaContext();
  const [isLiked, setIsLiked] = useState(false);

  return (
    <>
      <div className="ModalWindow">
        <div className="closeButtonContainer">
          <button onClick={() => setModalOn(false)} className="closeButton">
            X
          </button>
        </div>
        <div className={`ModaImgCommentsContainer ${aspectRatio < 0.9 && "mobile"}`}>
          <div className="ModalUserCommentsReactionsContainer">
            <div className="ModalUserCommentsContainer">
              <div className="ModalUserProfileName">
                <MyProfile
                  profileImgSize={"40px"}
                  profileImgUrl={modalUser.profileImg}
                  profileId={modalUser.userId}
                  profileName={modalUser.userName}
                  profile={false}
                />
              </div>
            </div>
            <div className={`ReactionButtonsContainer ${aspectRatio < 0.9 && "mobile"}`}>
              <button className="ReactionButtonContainer" onClick={() => setIsLiked(!isLiked)}>
                {isLiked ? (
                  <FaHeart color={"red"} size={22} />
                ) : (
                  <FaRegHeart color={"white"} size={22} />
                )}
              </button>
              <button className="ReactionButtonContainer">
                <FaRegComment size={22} />
              </button>
            </div>
          </div>
          <div className="ModalImgContainer">
            <img src={modalImg} className="ModalImg" />
          </div>
        </div>
      </div>
    </>
  );
}
