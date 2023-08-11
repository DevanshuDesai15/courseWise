import React from "react";
import { Typography, TextField, Button, Card } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import { BASE_URL } from "../config";

/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const navigate = useNavigate();
    const setUser = useSetRecoilState(userState);

    return <div>
        
        <center style={{marginTop: 150}}>
            <Typography variant="h5">Welcome to CourseWise, Signup Below</Typography>
            <br />
            <Card variant="outlined" style={{width: 400, padding: 20}}>
                <div>
                    <TextField fullWidth={true} variant="outlined" label="Username" type={"text"} onChange={e => setUsername(e.target.value)} />
                    <br />
                    <br />
                    <TextField fullWidth={true} variant="outlined" label="Password" type={"password"} onChange={e => setPassword(e.target.value)} />
                    <br /> <br />
                    <Button variant="contained" onClick={ async () => {
                        const response = await axios.post(`${BASE_URL}/admin/signup`, {
                            username,
                            password
                        })
                        let data = response.data;
                        localStorage.setItem("token", data.token);
                        setUser({
                            username: username,
                            isLoading: false
                        });
                        // window.location = "/courses"
                        navigate("/courses");
                    }}>
                        Sign Up
                    </Button>
                </div>
                <div>
                    <br />
                    <Typography> Already a user? <a href="/login">Login</a> </Typography>
                </div>
            </Card>
        </center>
    </div>
}

export default Register;