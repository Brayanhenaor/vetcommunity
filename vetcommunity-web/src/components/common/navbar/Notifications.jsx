import { faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Badge, IconButton, Menu, MenuItem, styled } from '@mui/material'
import React, { useRef, useState } from 'react'
import { color } from '../../../utils/color';
import shortid from 'shortid';

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

const notificationsFake = [
    {
        message: 'Mensaje notificacion 1',
        viewed: false
    },
    {
        message: 'Mensaje notificacion 2',
        viewed: false
    },
    {
        message: 'Mensaje notificacion 3',
        viewed: false
    },
    {
        message: 'Mensaje notificacion 4',
        viewed: true
    },
    {
        message: 'Mensaje notificacion 5',
        viewed: true
    },
]

export const Notifications = () => {
    const [notifications, setNotifications] = useState(notificationsFake);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setNotifications(notifications.map(notification => ({ ...notification, viewed: true })));
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton onClick={handleClick}>
                <StyledBadge badgeContent={notifications.filter(notification => !notification.viewed)?.length}>
                    <FontAwesomeIcon icon={faBell} color={color.secondary} style={{ fontSize: 25, marginLeft: 10, transform: 'rotate(10deg)' }} />
                </StyledBadge>
            </IconButton>
            <Menu
                id="simple-menu"
                style={{ zIndex: '8000' }}
                anchorEl={anchorEl}
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
                onClick={handleClose}
                onClose={handleClose}
                PaperProps={{
                    sx: { borderRadius: '11px' },
                    elevation: 4,
                }}
            >
                {notifications.map(({ message, viewed }) => (
                    <MenuItem key={shortid.generate()}>
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
