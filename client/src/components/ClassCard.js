import React from "react";
import Card from "@material-tailwind/react/Card";
import CardImage from "@material-tailwind/react/CardImage";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import { Link } from "react-router-dom";

export default function ClassCard({
  classTitle,
  classRoom,
  classTeacher,
  classCode,
}) {
  return (
    <Card>
      <CardImage src="/images/student.jpeg" alt="Card Image" />

      <CardBody>
        {/* <H6 color="gray">Neural Networks</H6>
        <Paragraph>Batch</Paragraph>
        <Paragraph>Subject</Paragraph> */}
        <h1>{classTitle}</h1>
        <p>{classRoom}</p>
        <p>{classTeacher}</p>
        <p className="text-xs mt-2">Code: {classCode}</p>
      </CardBody>

      <Link to={`/enter/class/${classCode}`}>
        <Button color="green" size="sm" ripple="light">
          Enter class
        </Button>
      </Link>
    </Card>
  );
}
