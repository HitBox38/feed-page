import HomeIcon from "@/assets/icons/home.svg";
import MessagingIcon from "@/assets/icons/message-circle.svg";
import NotificationsIcon from "@/assets/icons/bell.svg";
import ProfileImage from "@/assets/images/ProfilePic.png";
import SearchIcon from "@/assets/icons/search.svg";
import TedooLogo from "@/assets/images/TEDOOO LOGO.png";
import "./app-bar.css";

export const AppBar = () => {
  return (
    <div className="app-bar">
      <div className="container">
        <div className="logo-search">
          <img src={TedooLogo} alt="logo" />
          <div className="search">
            <SearchIcon />
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div className="app-bar-buttons">
          <button className="selected">
            <HomeIcon /> Home
          </button>
          <button>
            <MessagingIcon /> Messaging
          </button>
          <button>
            <NotificationsIcon /> Notifications
          </button>
          <img src={ProfileImage} alt="profile" />
        </div>
      </div>
    </div>
  );
};
