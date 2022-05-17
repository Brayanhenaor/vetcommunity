import { faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Badge, IconButton, Menu, MenuItem, styled } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { color } from '../../../utils/color';
import shortid from 'shortid';
import { useNavigate } from 'react-router-dom';
import { route } from '../../../router/routes';
import { endpoints } from '../../../api/endpoint';
import { useFetch } from '../../../hooks/useFetch';
import nodata from '../../../img/nodata.jpeg';
import { Box } from '@mui/system';

const StyledBadge = styled(Badge)({
    '& .MuiBadge-badge': {
        right: -3,
        top: 6,
        color: color.primary,
        backgroundColor: color.red,
        border: `2px solid white`,
        padding: '0 4px',
    },
});

export const Notifications = ({ userNotifications }) => {
    const [notifications, setNotifications] = useState(userNotifications);

    const { data, loading } = useFetch(endpoints.notifications);

    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleTap = (postId) => {
        navigate(route.post.replace(':id', postId));
        handleClose();
    };

    const handleViewed = (id) => {

    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if (data !== null)
            setNotifications(data.result)
    }, [data])

    useEffect(() => {
        if (userNotifications !== null)
            setNotifications(userNotifications)
    }, [userNotifications])


    return (
        <div>
            <IconButton onClick={handleClick}>
                <StyledBadge badgeContent={notifications?.filter(notification => !notification.viewed)?.length}>
                    <FontAwesomeIcon icon={faBell} color={color.secondary} style={{ fontSize: 25, marginLeft: 10, transform: 'rotate(10deg)' }} />
                </StyledBadge>
            </IconButton>
            <Menu
                id="simple-menu"
                style={{ zIndex: '8000' }}
                anchorEl={anchorEl}
                onClose={handleClose}
                keepMounted
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                open={Boolean(anchorEl)}
                PaperProps={{
                    sx: { borderRadius: '11px' },
                    elevation: 4,
                }}
            >
                {notifications?.length === 0 && (
                    <Box 
                    sx={{
                        display:'flex',
                        alignItems:'center',
                        flexDirection:'column'
                    }}>
                        <img src={nodata} alt="" style={{width:220}} />
                        <span style={{ textAlign: 'center', margin: 6, fontFamily: 'Raleway', color: color.gray }}>No tienes notificaciones</span>
                    </Box>
                )}
                {notifications?.map(({ message, viewed, postId }) => (
                    <MenuItem key={shortid.generate()} onClick={() => handleTap(postId)}>
                        <span>
                            {message}
                        </span>
                        {
                            !viewed && (
                                <div style={{ backgroundColor: color.red, borderRadius: '50%', height: 10, width: 10, marginLeft: 2 }} />
                            )
                        }
                    </MenuItem>
                ))}

            </Menu>
        </div>

    )
}
