import { useState } from "react";
import { useInstaContext } from "../Context/InstaContext";
import { FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa";

export function Modal() {
  const { aspectRatio, setModalOn, modalImg, modalUser, setUserId } = useInstaContext();
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
                <img
                  src={modalUser.profileImg}
                  onClick={() => {
                    setUserId(modalUser.profileImg);
                    setModalOn(false);
                  }}
                  className="PostProfilePicture"
                />
                <div
                  key={modalUser.userName}
                  onClick={() => {
                    setUserId(modalUser.userId);
                    setModalOn(false);
                  }}
                  className="PostUserName"
                >
                  {modalUser.userName}
                </div>
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
