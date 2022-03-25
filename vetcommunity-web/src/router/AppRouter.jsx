import { Navigate, Route, Routes } from "react-router-dom"
import { HomePage } from '../components/pages/home/HomePage';
import { Navbar } from '../components/common/navbar/NavBar';
import { route } from "./routes";

export const AppRouter = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path={route.home} element={<HomePage />} />


                <Route path="*" element={<Navigate to={route.home} />} />
            </Routes>
        </div>
    )
}
