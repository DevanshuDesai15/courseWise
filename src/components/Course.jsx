/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactLoading from 'react-loading';
import { Card, Grid, CardMedia, CardContent, Typography, TextField, Button, FormControlLabel, Checkbox } from "@mui/material";
import axios from "axios";

function Course () {
    let { courseId } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/admin/courses/${courseId}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => {
            setCourse(res.data.course);
        });
    }, [])

    if(!course) {
        return (
            <div style={{ display: 'flex', justifyContent: "center", marginTop:150}}>
                <ReactLoading type="spin" color="#1c8fed"/>
            </div>
        )
    }

    return (
        <>
            <EditTopper title={course.title}/>
            <Grid container>
                <Grid item lg={8} md={12} sm={12}>
                    <UpdateCard course = {course} setCourse = {setCourse} />
                </Grid>
                <Grid item lg={4} md={12} sm={12}>
                    <CourseCard course = {course}/>
                </Grid>
            </Grid>
        </>
    )
}

function EditTopper({ title }) {
    return (
        <div style={{height: 250, background:"#04068d", top: 0, width: "100vw", zIndex: 0, marginBottom: -250}}>
            <div style={{ height: 250, display: "flex", justifyContent:"center", flexDirection: "column"}}>
                <div>
                    <Typography style={{ color: "white", fontWeight: 600}} variant="h3" textAlign={"center"}>{title}</Typography>
                </div>
            </div>
        </div>
    )
}

function CourseCard({ course }) {
    const { title, description, price, imageLink, published} = course ;
    return (
        <div style={{ display: 'flex', justifyContent: "center", marginTop:80}}>
            <Card sx={{ width: 345 }}>
                <CardMedia
                sx={{ height: 200 }}
                image={imageLink}
                title={title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div"> {title} </Typography>
                    <Typography variant="body2" color="text.secondary"> {description} </Typography>
                    <Typography variant="body2" color="text.secondary"> Price: {price} </Typography>
                    <Typography variant="body2" color="text.secondary"> Published: {published ? "Yes" : "No"} </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

function UpdateCard({course, setCourse}) {
    const [title, setTitle] = useState(course.title);
    const [description, setDescription] = useState(course.description);
    const [price, setPrice] = useState(course.price);
    const [image, setImage] = useState(course.imageLink);
    const [checked, setChecked] = useState(course.published);

    return (
        <div style={{ display: 'flex', justifyContent: "center"}}>
            <Card variant={"outlined"} style={{width: 600, marginTop: 200}}>
                <div style={{ padding: 20}}>
                    <TextField fullWidth={true} value={title} variant="outlined" label="Title" type={"text"} onChange={e => setTitle(e.target.value)} />
                    <br /><br />
                    <TextField fullWidth={true} value={description} variant="outlined" label="Description" type={"text"} onChange={e => setDescription(e.target.value)} />
                    <br /> <br />
                    <TextField fullWidth={true} value={price} variant="outlined" label="Price" type={"number"} onChange={e => setPrice(e.target.value)} />
                    <br /> <br />
                    <TextField fullWidth={true} value={image} variant="outlined" label="Image Link" type={"url"} onChange={e => setImage(e.target.value)}/>
                    <br /> <br />
                    <FormControlLabel label="Publish" control={<Checkbox checked={checked} onChange={e => setChecked(e.target.checked)}/>} inputProps={{ 'aria-label': 'controlled' }}/> 
                    <br /> <br />
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <Button variant="contained" onClick={ async () => {
                            axios.put("http://localhost:3000/admin/courses/" + course._id, {
                                    title,
                                    description,
                                    price,
                                    imageLink: image,
                                    published: checked
                                }, {
                                headers: {
                                    "Content-type": "application/json",
                                    "Authorization": "Bearer " + localStorage.getItem("token")
                                }
                            })
                            let UpdateCourse = {
                                _id: course._id,
                                title: title,
                                description: description,
                                imageLink: image,
                                price,
                                published: checked
                            };
                            setCourse(UpdateCourse);
                        }}>
                            Update
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    )

}

export default Course;