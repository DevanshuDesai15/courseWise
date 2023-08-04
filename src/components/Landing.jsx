import { Typography } from "@mui/material";

/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.
function Landing() {
    return (
        <div style={{ display: 'flex', justifyContent:'space-between', marginTop: 90}} >
            <div style={{padding: 20}}>
                <Typography variant="h5"><b> Learn from industry-leading professionals and gain hands-on expertise in the most in-demand technologies. </b></Typography>
            </div>
            <div style={{padding: 20}}>
                <img src="https://media.istockphoto.com/id/1396696283/photo/teacher-with-students-in-computer-lab.jpg?s=612x612&w=0&k=20&c=UTxIcsUZ2AGeuMXRaPOpGSYeP1caHtTanMIpOlC4DW8=" alt="Instructor Teaching" />
            </div>
        </div>
    )
}

export default Landing;