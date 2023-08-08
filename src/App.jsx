import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from "./components/Landing";
import CreateCourse from './components/CreateCourse';
import Register from './components/Register';
import ShowCourses from './components/ShowCourses';
import Profile from './components/Profile';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import Header from './sub-components/Header';
import Course from './components/Course';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { userState } from './store/atoms/user';
import axios from 'axios';
import { BASE_URL } from './config';
import { useEffect } from 'react';


const theme = createTheme({
    typography: {
        fontFamily: 'Ubuntu',
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <RecoilRoot>
                <Router>
                    <Header/>
                    <InitUser />
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/createcourse" element={<CreateCourse />} />
                        <Route path="/courses" element={<ShowCourses />} />
                        <Route path="/course/:courseId" element={<Course />} />
                        <Route path="/profile/:profileId" element={<Profile />} />
                    </Routes>
                </Router>
            </RecoilRoot>
        </ThemeProvider>
    );
}

// this function will get the username from the backend and pass through out the app
function InitUser() {
    const setUser = useSetRecoilState(userState);

    const init = async() => {
        try {
            const resp = await axios.get(`${BASE_URL}/admin/profile`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })

            if(resp.data.username) {
                setUser({
                    isLoading: false,
                    username: resp.data.username
                })
            } else {
                setUser({
                    isLoading: false,
                    username: null
                })
            }
        } catch(e) {
            setUser({
                isLoading: false,
                username: null
            })
        }
    };

    useEffect(() => {
        init();
    }, []);

    return <></>
}

export default App;