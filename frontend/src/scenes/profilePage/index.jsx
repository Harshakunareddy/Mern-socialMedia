import { Box,useMediaQuery } from "@mui/material";
import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "scenes/navbar";
import FriendListsWidget from "scenes/widgets/FriendListsWidget";
// import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";



const ProfilePage = ()=>{
    const [user,setUser] = useState(null);
    const {userId} = useParams();
    const token = useSelector((state)=> state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const getUser = async ()=>{
        const response = await fetch(`http://localhost:3001/users/${userId}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // formatting the response
        const data = await response.json();
        setUser(data);
    }
    useEffect(()=>{
        getUser();
    },[]);

    if(!user) return null;
    return (
        <Box>
            <NavBar />
            <Box
            width="100%"
            padding="2rem 6%"
            justifyContent="center"
            display={isNonMobileScreens ? "flex" : "block"}
            >

                <Box
                flexBasis={isNonMobileScreens ? "26%" : undefined}
                >

                    <UserWidget userId={userId} picturePath={user.picturePath} />
                    <Box m="2rem 0"></Box>
                    <FriendListsWidget userId={userId} />

                </Box>



                <Box
                flexBasis={isNonMobileScreens ? "42%" : undefined}
                mt = {isNonMobileScreens ? undefined : "2rem"}
                ml = {isNonMobileScreens ? "2rem" : undefined }
                >

                    {/* <MyPostWidget picturePath={user.picturePath} /> */}
                    {/* <Box m="1rem 0"></Box> */}
                    <PostsWidget userId={userId} isProfile />
                    {/* <PostsWidget userId={userId} /> */}

                </Box>



            </Box>
        </Box>
    )
}
export default ProfilePage;