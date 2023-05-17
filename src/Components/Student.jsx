import {
  Select,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  Button,
  useStatStyles,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import "./Student.css";
import axios from "axios";
/*
Answer => {
  question => string,
  course => int,
  answer => int,
  user => int
}
*/
function Student({ user, setUser }) {
  const [courses, setCourses] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [show, setShow] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [courseId, setCourseId] = useState();

  const addAnswer = (e, answerId, questionId) => {
    e.preventDefault();
    setAnswers((p) => [
      ...p.filter((a) => a.question != questionId),
      {
        user: user.id,
        answer: answerId,
        question: questionId,
        course: courseId,
      },
    ]);
  };

  const sendAsnwers = () => {
    answers.forEach(async a => {
      await axios.post('http://localhost:3000/userAnswer',a)
    })
  }



  useEffect(() => {
    getCourse();
    getQuestions();
    getAnswer();
  }, []);

  const getCourse = async () => {
    try {
      let { data } = await axios.get("http://localhost:3000/allcourses");
      setCourses(data);
    } catch (e) {
      console.error(e);
    }
    // return [
    //   { name: "course One", id: 1 },
    //   { name: "course two", id: 3 },
    // ];
  };

  const getQuestions = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/question");
      setQuestions(data);
    } catch (e) {
      console.error(e);
    }
    // return [
    //   { name: "question one", id: 1 },
    //   { name: "question two", id: 3 },
    // ];
  };
  const getAnswer = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/answer");
      setAnswer(data);

      console.log(answer);
    } catch (e) {
      console.error(e);
    }
  };

  const doctors = ["doctor1", "doctor2", "doctor3"];
  const assistant = ["assistant1", "assistant2", "assistant3"];

  const courseQuestions = questions.map((ques, i) => (
    <RadioGroup key={i} className="single__question">
      <label className="radio__title">{ques.question}</label>
      <Stack direction="row">
        {answer.map((ans, i) => (
          <Radio value={`${i}`} key={ans.id} onClick={e => addAnswer(e,ans.id,ques.id)}>
            {" "}
            {ans.answer}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  ));

  function Show() {
    setShow(true);
  }
  let course__name = document.getElementsByClassName("course__name");
  return (
    <main id="studentPage">
      <h1 className="page__title">نتائج استبيان المقرر الدراسي</h1>

      <div className="course__name" onClick={Show}>
        <h3>اسم المادة</h3>
        <Select
          placeholder="اختر الماده"
          onChange={(e) => setCourseId(e.target.value)}
        >
          {courses.map((c) => (
            <option
              key={c.id}
              className="select__box"
              value={c.id}
              onClick={(e) => setCourseId(c.id)}
            >
              {c.name}
            </option>
          ))}
        </Select>
      </div>

      {show ? (
        <>
          <div className="course__name">
            <h3>اسم الدكتور</h3>
            <Select placeholder="اختر الدكتور">
              {doctors.map((c) => (
                <option key={c.id} className="select__box" value={c.id}>
                  {c}
                </option>
              ))}
            </Select>
          </div>
          {/* <div className="course__name">
            <h3>اسم المعيد</h3>
            <Select placeholder="اختر المعيد">
              {assistant.map((c) => (
                <option key={c.id} className="select__box" value={c.id}>
                  {c}
                </option>
              ))}
            </Select>
          </div> */}
        </>
      ) : (
        ""
      )}

      <h3>Qeustions!!</h3>
      {courseQuestions}

      {/* <h3>Lecture Questios!!</h3>
      {lecturesQuestions}

      {sectionQuestions}
      {commQuestions}
      {opinionQuestions} */}

      <Button colorScheme="green" className="submit__questions" onClick={sendAsnwers}>
        إرسال
      </Button>
    </main>
  );
}

export default Student;
