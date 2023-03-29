import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Post from "../Post/Post";
import EditProfile from "../EditProfile/EditProfile";
import AddPost from "../AddPost/AddPost";
import Edit from "@mui/icons-material/Edit";
import UploadImage from "../UploadImage/UploadImage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../utils/axios";
import { addFriend, unfollow } from "../../utils/Constants";
import { setSuggestedUsers, setUser } from "../../state";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
} from "@mui/material";


const LinkWithoutProps = ({ to, children }) => {
  return <Link to={to}>{children}</Link>;
};

const modalstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height:400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  overflowY: "auto", 
};

const CoverPhoto = styled("img")({
  width: "95%",
  height: "100%",
  objectFit: "cover",
});
const ProfilePic = styled("img")({
  width: "10rem",
  height: "10rem",
  borderRadius: "50%",
  objectFit: "cover",
  position: "absolute",
  left: 0,
  right: 0,
  margin: "auto",
  top: "10rem",
});
const EditCover = styled(Fab)(({ theme }) => ({
  position: "absolute",
  right: 20,
  bottom: 0,
  [theme.breakpoints.up("md")]: {
    right: 40,
  },
}));
const EditProfilepic = styled(Fab)(({ theme }) => ({
  position: "absolute",
  left: "65%",
  [theme.breakpoints.up("sm")]: {
    left: "57%",
  },
  [theme.breakpoints.up("xl")]: {
    left: "53%",
  },
}));
const UserInfoBox = styled(Box)({
  "&::WebkitBoxShadow": `0px 0px 25px -10px rgba(0, 0, 0, 0.38)`,
  "&::MozBoxShadow": `0px 0px 25px -10px rgba(0, 0, 0, 0.38)`,
  boxShadow: `0px 0px 25px -10px rgba(0, 0, 0, 0.38)`,
  borderRadius: "5%",
  margin: "2rem",
  padding: "1em 2rem",
});

const ProfileComponent = ({ user }) => {
  const [editProfile, setEditProfile] = useState(false);
  const [openImageUpload, setImageUpload] = useState(false);
  const currentUser = useSelector((state) => state.user);
  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);
  const token = useSelector((state) => state.token);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [followersList,setFollowersList] = useState([])
  const [followingsList,setFollowingsList] = useState([])
  const [modalType,setModalType] = useState("")


  const setModalTypefunction = (modale) =>{
    setModalType(modale)
    handleOpen()
  }
  const getFollowersData = async () => {

    try {
      const response = await axios.get(`/api/followers/${user._id}`,{
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }) // replace with your actual API endpoint

      setFollowersList(response.data)
    } catch (error) {
      console.error(error);
      // handle error appropriately (e.g. show error message to user)
    }
  };


  const getFollowingsData = async () => {

    try {
      const response = await axios.get(`/api/followings/${user._id}`,{
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }) // replace with your actual API endpoint
      setFollowingsList(response.data)
    } catch (error) {
      console.error(error);
      // handle error appropriately (e.g. show error message to user)
    }
  };

  const getUserPost = async () => {
    try {
      const { data } = await axios.get(`api/user-post/${user._id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleFollow = async (friendId) => {
    try {
      const { data } = await axios.patch(
        addFriend,
        { friendId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFollowings(data.updatedUser.followings);
      dispatch(setUser({ user: data.updatedUser }));
      dispatch(setSuggestedUsers({ suggestUsers: data.sugesstions }));
    } catch (err) {
      console.log(err);
    }
  };
  const handleUnfollow = async (friendId) => {
    try {
      const { data } = await axios.patch(
        unfollow,
        { friendId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFollowings(data.updatedUser.followings);
      dispatch(setUser({ user: data.updatedUser }));
      dispatch(setSuggestedUsers({ suggestUsers: data.sugesstions }));
    } catch (err) {
      console.log(err);
    }
  };

  
  
  const getUser = async () => {
    try {
      const { data } = await axios.get(`api/user/${currentUser._id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setUser({ user: data }));
      setFollowers(data.followers);
      setFollowings(data.followings);
    } catch (err) {}
  };

  const createConverStation = async (friendId) => {
    const { data } = await axios.post(
      "/api/converstation",
      { friendId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const member = data.members;
    navigate(`/chat/${data._id}/${member[1]}`);
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user._id) {
      getUserPost();
    getFollowersData()
    getFollowingsData()
    }
  }, [user._id]);

  return (
    <Box flex={4}>
      <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={modalstyle}>
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      {modalType === "followers"
        ? followersList.map((user) => (
            <>
            <Link to={`/profile/${user._id}`} onClick={()=>handleClose()} style={{textDecoration :"none",color:"inherit"}}> 
              
              
              <ListItem alignItems="flex-start" key={user._id}>  
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={user.profilePic} />
                </ListItemAvatar>
                <ListItemText
                  primary={user.username}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {user.email}
                      </Typography>
                    </>
                  }
                />
              </ListItem>

              </Link>
              <Divider variant="inset" component="li" />
            </>
          ))
        : followingsList.map((user) => (
            <>

<Link to={`/profile/${user._id}`} onClick={()=>handleClose()} style={{textDecoration :"none",color:"inherit"}}> 
              <ListItem alignItems="flex-start" key={user._id}>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={user.profilePic} />
                </ListItemAvatar>
                <ListItemText
                  primary={user.username}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {user.email}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              </Link>
              <Divider variant="inset" component="li" />
            </>
          ))}
    </List>
  </Box>
</Modal>

      <Box
        sx={{
          width: "100%",
          height: "15rem",
          position: "relative",
        }}
      >
        <CoverPhoto
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="cover"
        />
        {currentUser._id === user._id && (
          <EditCover onClick={(e) => setImageUpload(true)} size="small">
            <Edit />
          </EditCover>
        )}
        <ProfilePic src={user?.profilePic} alt="profile" />
        <Box
          sx={{
            position: "relative",
          }}
        >
          {currentUser._id === user._id && (
            <EditProfilepic onClick={(e) => setImageUpload(true)} size="small">
              <Edit />
            </EditProfilepic>
          )}
          <UploadImage open={openImageUpload} setOpen={setImageUpload} />
        </Box>
      </Box>
      <Box>
        <UserInfoBox minHeight="max-content">
          <Box sx={{ textAlign: "center", marginTop: "2rem" }}>
            <Box>
              <Typography component="h1" fontWeight={600}>
                {user?.username}
              </Typography>
            </Box>
            <Stack direction="row" justifyContent="center" spacing={2}>
              <Typography component="h1" fontWeight={500}>
                {posts.length} Posts
              </Typography>
              <Typography component="h1" onClick={() => setModalTypefunction("followers")} fontWeight={500}>
                {user?.followers?.length} Followers
              </Typography>
              <Typography component="h1" onClick={() => setModalTypefunction("followings")} fontWeight={500}>
                {user?.followings?.length} Following
              </Typography>
            </Stack>
            <Box sx={{ marginTop: "1rem" }}>
              {currentUser?._id === user?._id ? (
                <Typography variant="p">{currentUser?.bio}</Typography>
              ) : (
                <Typography variant="p">{user?.bio}</Typography>
              )}
            </Box>
            {currentUser?._id === user?._id && (
              <Button
                sx={{ margin: "1rem" }}
                onClick={(e) => setEditProfile(true)}
                variant="contained"
                size="small"
              >
                Edit
              </Button>
            )}
            {currentUser?._id !== user?._id &&
              followings?.includes(user._id) && (
                <>
                  <Button
                    sx={{ margin: "1rem" }}
                    onClick={() => handleUnfollow(user._id)}
                    variant="contained"
                    size="small"
                  >
                    Unfollow
                  </Button>
                  <Button
                    sx={{ margin: "1rem" }}
                    onClick={() => createConverStation(user._id)}
                    variant="contained"
                    size="small"
                  >
                    Message
                  </Button>
                </>
              )}
            {currentUser?._id !== user?._id &&
              !followings?.includes(user._id) && (
                <>
                  <Button
                    sx={{ margin: "1rem" }}
                    onClick={() => handleFollow(user._id)}
                    variant="contained"
                    size="small"
                  >
                    follow
                  </Button>
                  <Button
                    sx={{ margin: "1rem" }}
                    onClick={() => createConverStation(user._id)}
                    variant="contained"
                    size="small"
                  >
                    Message
                  </Button>
                </>
              )}
            <EditProfile open={editProfile} setOpen={setEditProfile} />
          </Box>
        </UserInfoBox>
      </Box>
      {posts.map(
        ({ _id, content, author, image, likes, comments, createdAt }) => (
          <Post
            key={_id}
            postId={_id}
            content={content}
            author={author}
            image={image}
            likes={likes}
            comments={comments}
            createdAt={createdAt}
          />
        )
      )}

      <AddPost />
    </Box>
  );
};

export default ProfileComponent;
