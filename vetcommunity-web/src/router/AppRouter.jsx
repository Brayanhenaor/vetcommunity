import { Navigate, Route, Routes } from "react-router-dom"
import { HomePage } from '../components/pages/home/HomePage';
import { Navbar } from '../components/common/navbar/NavBar';
import { route } from "./routes";
import { ProfilePage } from "../components/pages/profile/ProfilePage";
import { LoginPage } from "../components/pages/login/LoginPage";

export const AppRouter = () => {
    console.log('Ambiente', process.env.REACT_APP_API_BASE_URL);
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path={route.home} element={<HomePage />} />
                <Route path={route.profile} element={<ProfilePage />} />
                <Route path={route.login} element={<LoginPage />} />


                <Route path="*" element={<Navigate to={route.home} />} />
            </Routes>
        </div>
    )
}
