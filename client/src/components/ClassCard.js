import React, { useEffect, useState } from "react";
import Card from "@material-tailwind/react/Card";
import CardImage from "@material-tailwind/react/CardImage";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import H6 from "@material-tailwind/react/Heading6";
import Paragraph from "@material-tailwind/react/Paragraph";
import Button from "@material-tailwind/react/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchClasses } from "../actions/class";
import { useNavigate } from "react-router";

export default function ClassCard({ classTitle, classRoom, classTeacher }) {
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
      </CardBody>

      <Button color="green" size="sm" ripple="light">
        Enter class
      </Button>
    </Card>
  );
}
