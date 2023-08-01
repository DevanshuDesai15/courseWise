import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, TextField, Button, Card, Checkbox, FormControlLabel  } from "@mui/material";
import axios from "axios";
/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse() {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [image, setImage] = useState("");
    const [published, setPublished] = useState(true);

    const navigate = useNavigate();

    return <div>
            <div style={{display:'flex', justifyContent:'center',marginTop: 50}}>
                <Typography variant="h5"><b>Add Course</b></Typography>
            </div>
        <div style={{display:'flex', justifyContent:'center'}}>
            <Card sx={{ minWidth: 275 }} style={{width: 400, padding: 20}}>
                <div>
                    <TextField fullWidth={true} variant="outlined" label="Title" type={"text"} onChange={e => setTitle(e.target.value)} />
                    <br /><br />
                    <TextField fullWidth={true} variant="outlined" label="Description" type={"text"} onChange={e => setDescription(e.target.value)} />
                    <br /> <br />
                    <TextField fullWidth={true} variant="outlined" label="Price" type={"number"} onChange={e => setPrice(e.target.value)} />
                    <br /> <br />
                    <TextField fullWidth={true} variant="outlined" label="Image Link" type={"url"} onChange={e => setImage(e.target.value)}/>
                    <br /> <br />
                    <FormControlLabel label="Publish" control={<Checkbox checked={published} onChange={e => setPublished(e.target.value)}/>} /> 
                    <br /> <br />
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <Button variant="contained" onClick={ async () => {
                            await axios.post("http://localhost:3000/admin/courses", {
                                title,
                                description,
                                price,
                                image,
                                published
                            }, {
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": "Bearer " + localStorage.getItem("token")
                                }
                            });
                            alert("Added Course!")
                        }}>
                            Upload
                        </Button>
                        <Button variant="outlined" onClick={() => {
                            navigate("/courses");
                        }}>
                            All Courses
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    </div>
}
export default CreateCourse;