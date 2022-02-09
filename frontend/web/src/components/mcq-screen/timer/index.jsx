import React from "react";
import { useState, useEffect } from "react";
import axios from "../../../shared/axios";

const Timer = ({ examId, setIsTime }) => {
  const [minutes, setMinutes] = useState(60);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          setIsTime(true);
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });
  useEffect(() => {
    axios.get(`exam/${examId}`).then((response) => {
      const currentExamSet = response.data;
      console.log(response, "response student");
      console.log(currentExamSet, "exam duration in minutes");
      setMinutes(currentExamSet.duration_in_minutes);
    });
  }, []);

  return (
    <div>
      {minutes === 0 && seconds === 0 ? null : (
        <h6>
          {" "}
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h6>
      )}
    </div>
  );
};

export default Timer;
