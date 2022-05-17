import PersonIcon from '@mui/icons-material/Person';
import { Avatar, ListItemIcon, Menu, MenuItem, styled } from '@mui/material'
import React from 'react'
import { color } from '../../../utils/color';
import LogoutIcon from '@mui/icons-material/Logout';
import { route } from '../../../router/routes';
import { useDispatch } from 'react-redux';
import { logout } from '../../../actions/auth';
import shortid from 'shortid';

const Option = styled('span')({
    color: '#000000',
    fontFamily: 'Source Sans Pro',
    marginLeft: '2px',
    fontSize: '14px',
    fontWeight: 300
});

const menu = [
    {
        title: 'Perfil',
        route: route.profile,
        icon: PersonIcon
    }
]

export const UserMenu = ({ urlPhoto }) => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleOptionSelected = (option) => {
        handleClose();
    }

    const handleLogout = () => {
        handleClose();
        dispatch(logout());
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Avatar alt="Brayan" style={{ cursor: 'pointer' }} onClick={handleClick} src={urlPhoto} />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                PaperProps={{
                    sx: { borderRadius: '11px' },
                    elevation: 4,
                }}
            >
                {
                    menu?.map(({ title, icon: Icon }) => (
                        <MenuItem key={shortid.generate()} onClick={handleOptionSelected}>
                            <ListItemIcon>
                                <Icon fontSize="small" />
                            </ListItemIcon>
                            <Option>{title}</Option>
                        </MenuItem>
                    ))
                }

                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <Option>Cerrar sesion</Option>
                </MenuItem>
            </Menu>
        </>
    )
}
