import classNames from "classnames";
import { formatTimeAgo } from "@/functions/formatTimeAgo";
import LikesIcon from "@/assets/icons/likes.svg";
import CommentsIcon from "@/assets/icons/comment.svg";
import LikeIcon from "@/assets/icons/like.svg";
import "./post.css";
import { useState } from "react";

export interface PostData {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  shopName: string;
  shopId: string;
  images: string[];
  comments: number;
  date: string;
  text: string;
  likes: number;
  didLike: boolean;
  premium: boolean;
}

export const Post = ({
  avatar,
  username,
  shopName,
  date,
  comments,
  didLike,
  images,
  likes,
  text,
}: PostData) => {
  const [liked, setLiked] = useState(didLike);
  const [amountOfLikes, setAmountOfLikes] = useState(likes);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setAmountOfLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="post-container">
      <div className="post-avatar">
        <img src={avatar} alt="avatar" />
        <div className="post-username">
          <span>{username}</span>
          <span>
            <span className="shop-link">{shopName}</span> · {formatTimeAgo(date)}
          </span>
        </div>
      </div>
      <div className="post-content">
        <div className="post-text">{text}</div>
        <div className={classNames("post-images", { "two-images": images.length > 1 })}>
          {images.slice(0, 2).map((image, index) => (
            <img key={index} src={image} alt="image" />
          ))}
        </div>
        <div className="impressions">
          <div className="post-likes">
            <LikesIcon />
            <span>{amountOfLikes} Likes</span>
          </div>
          <div className="post-comments">
            <span>
              {comments} {comments === 1 ? "Comment" : "Comments"}
            </span>
          </div>
        </div>
      </div>
      <div className="post-actions">
        <button className={classNames("post-like", { liked: liked })} onClick={handleLike}>
          <LikeIcon />
          <span>Like</span>
        </button>
        <button className="post-comment">
          <CommentsIcon />
          <span>Comment</span>
        </button>
      </div>
    </div>
  );
};
