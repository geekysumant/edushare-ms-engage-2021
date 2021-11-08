import React from "react";
import classes from "./Welcome.module.css";
import TeacherCard from "../components/TeacherCard/TeacherCard";
import StudentCard from "../components/StudentCard/StudentCard";

import Pec from "../assets/images/pec.png";
import Harvard from "../assets/images/harvard.png";
import IITB from "../assets/images/iitb.png";
import MIT from "../assets/images/mit.png";
// import Teacher from "../assets/images/teacher.jpeg";
// import Student from "../assets/images/student.jpeg";

// import FeatureImage from "../../public/classroom_1.png";

const Welcome = () => {
  return (
    <>
      <section className={classes.OuterContainer}>
        <span>Seamlessly manage your classroom</span>
        <div className={classes.InnerContainer}>
          <div>
            <TeacherCard />
          </div>
          <div>
            <StudentCard />
          </div>
        </div>
      </section>

      <section className={classes.FeatureContainer}>
        <div className={classes.Feature}>
          <h2>Simplify managing your class</h2>
          <div className={classes.InnerFeatureContainer}>
            <div className={classes.FeatureText}>
              <div>
                <ul>
                  <li>
                    <p>
                      Switch from class to assignment to student in just a few
                      clicks
                    </p>
                  </li>
                  <li>
                    <p>
                      Track student progress in your gradebook and export scores
                      to your school’s student information system (SIS)
                    </p>
                  </li>
                  <li>
                    <p>
                      Keep grading consistent and transparent with rubrics
                      displayed alongside student work
                    </p>
                  </li>
                  <li>
                    <p>
                      Keep grading consistent and transparent with rubrics
                      displayed alongside student work
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className={classes.Feature1}>
              <img src={"/images/classroom_1.png"} />
            </div>
          </div>
        </div>
      </section>

      <section className={classes.FeatureContainer}>
        <div className={`${classes.Feature}`}>
          <div className={classes.RightAlign}>
            <h2>Remain updated with what's going on in class</h2>
          </div>
          <div className={classes.InnerFeatureContainer}>
            <div className={classes.Feature1}>
              <img src={"/images/classroom_2.png"} />
            </div>
            <div className={classes.FeatureText}>
              <div>
                <ul>
                  <li>
                    <p>
                      Switch from class to assignment to student in just a few
                      clicks
                    </p>
                  </li>
                  <li>
                    <p>
                      Track student progress in your gradebook and export scores
                      to your school’s student information system (SIS)
                    </p>
                  </li>
                  <li>
                    <p>
                      Keep grading consistent and transparent with rubrics
                      displayed alongside student work
                    </p>
                  </li>
                  <li>
                    <p>
                      Keep grading consistent and transparent with rubrics
                      displayed alongside student work
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={classes.Testimonials}>
        <div className={classes.TestimonialsHeading}>
          <h3>Trusted by top universities</h3>
        </div>
        <div className={classes.TopUniversities}>
          <div>
            <img className={classes.UniName} src={Pec} />
          </div>
          <div>
            <img className={classes.UniName} src={IITB} />
          </div>
          <div>
            <img className={classes.UniName} src={Harvard} />
          </div>
          <div>
            <img className={classes.UniName} src={MIT} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Welcome;
