import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function TeacherCard() {
  return (
    <Card sx={{ maxWidth: 350 }}>
      <CardMedia
        component="img"
        height="140"
        image="/images/teacher.jpeg"
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
          For Teachers
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Classroom lets you create and distribute assignments to your class,
          while also enabling you to assess them with ease.
        </Typography>
      </CardContent>
    </Card>
  );
}
