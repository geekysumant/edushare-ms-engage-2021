import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "../UI/Button/Button";
import Typography from "@mui/material/Typography";

export default function StudentCard() {
  return (
    <Card sx={{ maxWidth: 350 }}>
      <CardMedia
        component="img"
        height="140"
        image="/images/student.jpeg"
        alt="green iguana"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            fontFamily: ["Montserrat", "sans-serif"].join(","),
          }}
        >
          For Students
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Access your assignments and tests, and never miss a deadline, while
          also enabling you to interact with your peers.
        </Typography>
      </CardContent>
      <CardActions>
        <Button text="Sign Up" />
      </CardActions>
    </Card>
  );
}
