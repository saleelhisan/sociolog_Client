import {
    Avatar,
    Box,
    Button,
    Card,
    Divider,
    List,
    ListItem,
    ListItemButton,
    Stack,
    Typography
} from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Friend from '../Friend/Friend'




const FirendList = () => {

    const user = useSelector(state => state.user);

    const [open, setOpen] = useState(true);

    return (
        <Box flex={4}>
            <Card sx={{
                boxShadow: `-1px 6px 5px 3px rgba(0,0,0,0.25)`,
                height: "90vh",
                width: "98%"
            }} >
                <Box sx={{
                    textAlign: "center"
                }}>
                  
                    <List >
                        <Stack direction="row">
                            <ListItem sx={{ justifyContent: "center" }} disablePadding>
                                <ListItemButton onClick={()=>setOpen(true)}>
                                <Typography variant='h6'>
                                    Followers
                                    </Typography>
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem sx={{ justifyContent: "center" }} disablePadding>
                                <ListItemButton onClick={() => setOpen(false)}>
                                    <Typography variant='h6'>
                                        Followings
                                    </Typography>
                                </ListItemButton>
                            </ListItem>
                        </Stack>
                    </List>
                </Box>
                <Box >
                    <Stack direction="row" justifyContent="flex-start">
                        {
                            open &&
                            <Box sx={{
                                width: "100%", margin: "1rem", maxHeight: "80vh",
                                overflowY: "scroll",
                                "&::-webkit-scrollbar": {
                                    display: "none"
                                }
                            }}>
                                {
                                    user?.followers.map((userId,i) => (
                                        <Friend key={i} userId={userId} value="followers" />
                                    ))
                                }
                            </Box>
                        }
                        {
                            !open &&
                            <Box sx={{
                                width: "100%", margin: "1rem", maxHeight: "80vh",
                                overflowY: "scroll",
                                "&::-webkit-scrollbar": {
                                    display: "none"
                                }
                            }}>
                                {
                                    user?.followings.map((userId,i) => (
                                        <Friend key={i} userId={userId} value="followings" />
                                    ))
                                }
                            </Box>
                        }
                    </Stack>
                </Box>
            </Card>
        </Box>
    )
};

export default FirendList
