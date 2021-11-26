import React from "react";
import Card from "@material-tailwind/react/Card";
import CardImage from "@material-tailwind/react/CardImage";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import { Link } from "react-router-dom";
import ClassSVG from "../assets/svg/class.svg";

export default function ClassCard({
  classTitle,
  classRoom,
  classCode,
  instructorName,
}) {
  return (
    <Card>
      <CardImage src={ClassSVG} alt="Card Image" className="bg-white" />

      <CardBody>
        <div
          style={{
            fontFamily: ["Sen", "sans-serif"],
          }}
        >
          <h1 className="text-lg font-semibold">{classTitle}</h1>
          <p>{classRoom}</p>
          <p>{instructorName}</p>
          <p className="text-xs mt-2">Code: {classCode}</p>
        </div>
      </CardBody>

      <Link to={`/enter/class/${classCode}`}>
        <Button color="green" size="sm" ripple="light">
          Enter class
        </Button>
      </Link>
    </Card>
  );
}
