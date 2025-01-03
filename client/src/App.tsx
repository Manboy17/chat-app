import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import useAuth from "./store/useAuth.ts";
import {useEffect} from "react";
import ProfilePage from "./pages/ProfilePage.tsx";

const App = () => {
    const {checkToken} = useAuth();

    useEffect(() => {
        checkToken();
    }, [checkToken]);
    return (
        <>
            <Routes>
                <Route element={<ProtectedRoute/>}>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/users/:id" element={<ProfilePage/>}/>
                </Route>

                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
            </Routes>
        </>
    );
};

export default App;
