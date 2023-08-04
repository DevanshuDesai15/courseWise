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
import { RecoilRoot } from 'recoil';


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

export default App;