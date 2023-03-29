import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Home from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import EmailIcon from "@mui/icons-material/Email";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ChatIcon from '@mui/icons-material/Chat';
import { setLogout } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const Leftbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Box
      flex={1}
      sx={{
        display: { xs: "none", md: "block" },
        paddingRight: "3rem",
      }}
    >
      <Box position="fixed">
        <List>
          <ListItem
            sx={{ backgroundColor: activeTab === "profile" ? "#b4c4d9" : "" }}
          >
            <ListItemButton
              onClick={() => {
                navigate(`/profile/${user?._id}`);
                handleTabClick("profile");
              }}
            >
              <ListItemIcon>
                <Avatar src={user?.profilePic} sx={{ width: 30, height: 30 }} />
              </ListItemIcon>
              <ListItemText primary={user?.username} />
            </ListItemButton>
          </ListItem>
          {/* <ListItem> */}
          <ListItem
            sx={{ backgroundColor: activeTab === "Homepage" ? "#b4c4d9" : "" }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <ListItemButton onClick={() => handleTabClick("Homepage")}>
                <ListItemIcon>
                  <Home sx={{ color: "blue" }} />
                </ListItemIcon>
                <ListItemText primary="Feed" />
              </ListItemButton>
            </Link>
          </ListItem>
          {/* <ListItem > */}
          <ListItem
            sx={{ backgroundColor: activeTab === "Chats" ? "#b4c4d9" : "" }}
          >
            <Link
              to="/chats"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton onClick={() => handleTabClick("Chats")}>
                <ListItemIcon>
                  <ChatIcon sx={{ color: "rgb(219, 63, 24)" }} />
                </ListItemIcon>
                <ListItemText primary="Chats" />
              </ListItemButton>
            </Link>
          </ListItem>
          {/* <ListItem> */}
          <ListItem
            sx={{ backgroundColor: activeTab === "Friends" ? "#b4c4d9" : "" }}
          >
            <Link
              to="/notifications"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton onClick={() => handleTabClick("Friends")}>
                <ListItemIcon>
                  <NotificationsActiveIcon sx={{ color: "rgb(4, 191, 4)" }} />
                
                </ListItemIcon>
                <ListItemText primary="Notification" />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => dispatch(setLogout())}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: "rgb(176, 19, 11)" }} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Leftbar;
