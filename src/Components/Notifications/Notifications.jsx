import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import List from '@mui/material/List';
import axios from '../../utils/axios';
import React, { useEffect, useState } from 'react';
import NotificationItem from "../NotificationItem/NotificationItem";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "@mui/material";
import {setNotification} from '../../state/index.js'

const Notifications = () => {
    const dispatch = useDispatch()

    // const [notifications, setNotifications] = useState([]);

    const Notification = useSelector(state => state.Notification);
    


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
                    <Typography variant="h6" component="h1" >
                        Notifications
                    </Typography>
                </Box>
                <Box>
                    <Box >
                        <Box sx={{
                            width: "90%", margin: "1rem", maxHeight: "80vh",
                            overflowY: "scroll",
                            "&::-webkit-scrollbar": {
                                display: "none"
                            }
                        }}>
                            {Notification?.map((item,i) => {
                                return (
                                    <>
                                        <NotificationItem key={i} notification={item} />
                                        <Divider/>
                                    </>
                                );
                            })}
                        </Box>
                    </Box>
                </Box>
            </Card>
        </Box>
    )
}

export default Notifications
