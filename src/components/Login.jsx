import React from "react";
import { Typography, TextField, Button, Card } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import { BASE_URL } from "../config";

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const navigate = useNavigate();
    const setUser = useSetRecoilState(userState);

    return <div>
    <center style={{marginTop: 150}}>
        <Typography variant="h5">Login to Admin Dashboard!</Typography>
        <br />
        <Card variant="outlined" style={{width: 400, padding: 20}}>
            <div>
                <TextField fullWidth={true} variant="outlined" label="Username" type={"text"} onChange={e => setUsername(e.target.value)} />
                <br />
                <br />
                <TextField fullWidth={true} variant="outlined" label="Password" type={"password"} onChange={e => setPassword(e.target.value)} />
                <br /> <br />
                <Button variant="contained" onClick={ async () => {
                        const res = await axios.post(`${BASE_URL}/admin/login`, {
                            username,
                            password
                        }, {
                            headers: {
                                "Content-type": "application/json"
                            }
                        })
                        let data = res.data;
                        localStorage.setItem("token", data.token);
                        // window.location = "/"
                        setUser({
                            isLoading: false,
                            username: username
                        })
                        navigate("/courses")
                    }}>Sign In</Button>
            </div>
            <div>
                <br />
                <Typography> Are you a new user? <a href="/register">Register</a> </Typography>
            </div>
        </Card>
    </center>
</div>
}

export default Login;