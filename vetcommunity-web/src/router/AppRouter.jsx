import { Navigate, Route, Routes } from "react-router-dom"
import { HomePage } from '../components/pages/home/HomePage';
import { Navbar } from '../components/common/navbar/NavBar';
import { route } from "./routes";
import { ProfilePage } from "../components/pages/profile/ProfilePage";
import { LoginPage } from "../components/pages/login/LoginPage";
import { FullPageSpinner } from "../components/common/loader/FullPageSpinner";
import { useSelector } from "react-redux";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
    console.log('Ambiente', process.env.REACT_APP_API_BASE_URL);

    const { ui: { loading }, auth: { isLogued } } = useSelector(state => state);
    return (
        <div>
            {
                loading && (
                    <FullPageSpinner />
                )
            }
            <Routes>
                <Route
                    path={route.home}
                    element={
                        <PublicRoute
                            component={HomePage} />
                    } />

                <Route
                    path={route.login}
                    element={
                        <PublicRoute
                            restricted
                            navBar={false}
                            isLogued={isLogued}
                            component={LoginPage} />
                    } />

                <Route path="*" element={<Navigate to={route.home} />} />
            </Routes>
        </div>
    )
}
