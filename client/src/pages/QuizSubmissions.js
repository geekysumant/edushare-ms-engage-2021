import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { fetchSubmissions } from "../actions/assignment";
import UserCard from "../components/UI/UserCard";

const QuizSubmissions = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { loading, error, submissions } = useSelector(
    (state) => state.fetchSubmissions
  );
  const { userInfo } = useSelector((state) => state.userDetails);

  const quizId = location.pathname.split("/")[6];
  const classId = location.pathname.split("/")[3];
  useEffect(() => {
    dispatch(fetchSubmissions(quizId));
  }, []);

  return (
    <div className="w-100 flex flex-row">
      {submissions &&
        submissions.map((submission) => (
          <UserCard
            picture={userInfo.picture}
            email={submission.user.email}
            name={submission.user.name}
          />
        ))}
    </div>
  );
};

export default QuizSubmissions;
