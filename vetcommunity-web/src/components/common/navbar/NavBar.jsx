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
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserMenu } from './UserMenu';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { getAsync } from '../../../api/apiService';
import { endpoints } from '../../../api/endpoint';

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
        to: route.myQuestions
    },
    {
        title: 'Perfil',
        to: route.profile
    },
]

export const Navbar = () => {
    const [value, setValue] = useState(route.home);
    const navigate = useNavigate();
    const [connection, setConnection] = useState(null);
    const [notifications, setNotifications] = useState(null);

    const { isLogued, token, user } = useSelector(state => state.auth);

    const handleSearch = (query) => {
        navigate(route.search.replace(':query', query));
    }

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_API_BASE_URL.replace('api', 'notificationHub'),
                {
                    accessTokenFactory: () => token,
                })
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');

                    connection.on('RefreshNotifications', async () => {
                        await handleGetNotifications();
                    });

                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const handleGetNotifications = async () => {
        const response = await getAsync(endpoints.notifications);

        if (response.success) {
            console.log(response)
            setNotifications(response.result)
        }
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" elevation={0}>
                    <Toolbar sx={{ bgcolor: 'white', display: 'flex', justifyContent: 'space-between' }} >


                        <div></div>
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
                                <StyledInputBase onKeyDown={e => e.key === 'Enter' && handleSearch(e.target.value)} placeholder='Buscar...' />
                            </div>

                            {
                                isLogued ? (
                                    <>
                                        <UserMenu urlPhoto={user?.urlPhoto} />
                                        <Notifications userNotifications={notifications} />
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
            <Paper sx={{ position: 'fixed', bottom: 0, zIndex: 999, left: 0, right: 0, display: { md: 'none' } }} elevation={3}>
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
