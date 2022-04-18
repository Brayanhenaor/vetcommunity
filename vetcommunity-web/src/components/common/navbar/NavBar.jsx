import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell, faClipboardQuestion, faHouse, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import { color } from '../../../utils/color';
import { Avatar, Badge, BottomNavigation, BottomNavigationAction, colors, InputBase, Paper, styled, TextField } from '@mui/material';
import './nav.css';
import { route } from '../../../router/routes';
import { NavLink } from './NavLink';
import { Notifications } from './Notifications';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Li = styled('li')({
    textDecoration: 'none',
    height: '100%',
    textAlign: 'center',
    position: 'relative',
    listStyle: 'none'
});

const Ul = styled('ul')({
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 0,
    height: '100%'
});

const StyledNavLink = styled(NavLink)({
    textDecoration: 'none',
    textAlign: 'center',
    color: color.gray,
});

const StyledInputBase = styled(InputBase)({
    color: color.lightGray,
    '& .MuiInputBase-input': {
        // vertical padding + font size from searchIcon
        width: '100%',
        width: '12ch',
        transition: 'width 0.5s',
        '&:focus': {
            width: '20ch',
            transition: 'width 1s'
        },
    },
});

const menu = [
    {
        title: 'Inicio',
        to: route.home
    },
    {
        title: 'Mis preguntas',
        to: 'about'
    },
    {
        title: 'Perfil',
        to: 'profile'
    },
]

export const Navbar = () => {
    const [value, setValue] = useState(route.home);
    const navigate = useNavigate();

    const { isLogued } = useSelector(state => state.auth);

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" elevation={0}>
                    <Toolbar sx={{ bgcolor: 'white', display: 'flex', justifyContent: 'space-between' }} >

                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                        >
                            <FontAwesomeIcon icon={faBars} beat color={color.secondary} />
                        </IconButton>


                        <Ul
                            sx={{
                                display: { xs: 'none', md: 'flex' }
                            }}>
                            {menu.map(({ title, to }) => (
                                <Box component="div" sx={{ p: { md: '0px 22px', xs: '0px 10px' } }}
                                    key={to}>
                                    <Li>
                                        <StyledNavLink
                                            activeClassName="activated"
                                            to={to}>
                                            {title}
                                        </StyledNavLink>
                                    </Li>
                                </Box>
                            ))}
                        </Ul>


                        <div
                            style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{
                                border: `0.5px solid ${color.lightGray}`,
                                borderRadius: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                marginLeft: 20,
                                marginRight: 10,
                                padding: '6px 15px'
                            }}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} color={color.lightGray} style={{ paddingRight: 10 }} />
                                <StyledInputBase placeholder='Buscar...' />
                            </div>

                            {
                                isLogued ? (
                                    <>
                                        <Avatar alt="Brayan" src="https://caricom.org/wp-content/uploads/Floyd-Morris-Remake-1024x879-1.jpg" />
                                        <Notifications />
                                    </>

                                ) : (
                                    <>
                                        <Button style={{ color: color.gray }} size="small" onClick={() => navigate(route.login)}>Iniciar sesion</Button>
                                    </>
                                )
                            }
                        </div>

                    </Toolbar>
                </AppBar>
            </Box>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: { md: 'none' } }} elevation={3}>
                <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                        navigate(newValue);
                    }}
                >
                    <BottomNavigationAction style={{ color: color.secondary }} value={route.home} label="Inicio" icon={<FontAwesomeIcon icon={faHouse} size='lg' />} />
                    <BottomNavigationAction style={{ color: color.secondary }} value={route.myQuestions} label="Mis preguntas" icon={<FontAwesomeIcon icon={faClipboardQuestion} size='lg' />} />
                    <BottomNavigationAction style={{ color: color.secondary }} value={route.profile} label="Perfil" icon={<FontAwesomeIcon icon={faUser} size='lg' />} />
                </BottomNavigation>
            </Paper>
        </>
    )
}
