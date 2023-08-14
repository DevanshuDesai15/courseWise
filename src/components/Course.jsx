/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Grid, CardMedia, CardContent, Typography, TextField, Button, FormControlLabel, Checkbox } from "@mui/material";
import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { courseState } from "../store/atoms/course";
import { courseImage, coursePrice, courseTitle, isCourseLoading } from "../store/selectors/course";
import Loading from "../sub-components/Loading";

function Course () {
    let { courseId } = useParams();
    const setCourse = useSetRecoilState(courseState);
    const courseLoading = useRecoilValue(isCourseLoading);

    useEffect(() => {
        axios.get(`http://localhost:3000/admin/courses/${courseId}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => {
            setCourse({isLoading: false, course: res.data.course});
        })
        .catch(() => {
            setCourse({ isLoading: false, course: null});
        });
    }, []);

    if(courseLoading) {
        return (
            <Loading />
        )
    }

    return (
        <>
            <EditTopper />
            <Grid container>
                <Grid item lg={8} md={12} sm={12}>
                    <UpdateCard />
                </Grid>
                <Grid item lg={4} md={12} sm={12}>
                    <CourseCard />
                </Grid>
            </Grid>
        </>
    )
}

function EditTopper() {
    const title = useRecoilValue(courseTitle);
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

function CourseCard() {
    const title = useRecoilValue(courseTitle);
    const price = useRecoilValue(coursePrice);
    const imageLink = useRecoilValue(courseImage);
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
                    {/* <Typography variant="body2" color="text.secondary"> {description} </Typography> */}
                    <Typography variant="body2" color="text.secondary"> Price: {price} </Typography>
                    {/* <Typography variant="body2" color="text.secondary"> Published: {published ? "Yes" : "No"} </Typography> */}
                </CardContent>
            </Card>
        </div>
    )
}

function UpdateCard() {
    const [courseDetails, setCourse] = useRecoilState(courseState);

    const [title, setTitle] = useState(courseDetails.course.title);
    const [description, setDescription] = useState(courseDetails.course.description);
    const [price, setPrice] = useState(courseDetails.course.price);
    const [image, setImage] = useState(courseDetails.course.imageLink);
    const [checked, setChecked] = useState(courseDetails.course.published);

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
                            axios.put("http://localhost:3000/admin/courses/" + courseDetails.course._id, {
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
                                _id: courseDetails.course._id,
                                title: title,
                                description: description,
                                imageLink: image,
                                price,
                                published: checked
                            };
                            setCourse({ course: UpdateCourse, isLoading: false});
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