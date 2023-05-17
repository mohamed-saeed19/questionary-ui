import React, { useRef, useState } from "react";
import "/D:/front/src/Admin.css";
import axios from "axios";
export default function Admin() {
  const questionText = useRef();

  const [courseName, setCourseName] = useState("");
  const [usersId, setUsersId] = useState([]);
  const docId = useRef();

  function deleteSubject() {
    // يمكن استخدام PHP لحذف المادة من قاعدة البيانات
    alert("تم حذف المادة");
  }

  const addQuestion = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/questionary", {
      question: questionText.current.value,
    });
    questionText.current.value = "";
  };

  const addDoctorId = (e) => {
    const v =  docId.current.value
    setUsersId((p) => [...p,v]);
    docId.current.value = "";
  };

  const addCourse = async (e) => {
    e.preventDefault()
    await axios.post("http://localhost:3000/course",{
      name:courseName,
      users:usersId
    } )
    setCourseName('')
    setUsersId([])
  }

  return (
    <>
      <br />
      <h1>جدول إضافة المواد والأسئلة</h1>
      <br />
      <h2>إضافة مادة واسم الدكتور</h2>
      <form onSubmit={addCourse}>
        <label for="subject">اسم المادة:</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={courseName}
          onChange={(e) => setCourseName(e.currentTarget.value)}
        />
        <br />
        <br />
        <label for="doctor">Doctor Id:</label>
        <input type="text" id="doctor" name="doctor" ref={docId} />
        <button className='btn btn-outline-dark' onClick={addDoctorId} type="button">Add Doctor</button>
        <br />
        <ul class="list-group">
          {usersId.map(u => 
          <li class="list-group-item" key={u}>{u}</li>
            )}

        </ul>
        <br />
        <button type="submit" >اضافه</button>
      </form>
      <br />
      <h2>إضافة سؤال والإجابات</h2>
      <form onSubmit={addQuestion}>
        <label for="question">السؤال:</label>
        <input ref={questionText} type="text" id="question" name="question" />
        <br />
        <br />

        {/* <label for="answer1">الإجابة الأولى:</label>
    <input ref={questionAnswerOne} type="text" id="answer1" name="answer1"/><br/><br/>
    <label for="answer2">الإجابة الثانية:</label>
    <input ref={questionAnswerTwo} type="text" id="answer2" name="answer2"/><br/><br/>
    <label for="answer3">الإجابة الثالثة:</label>
    <input ref={questionAnswerThree} type="text" id="answer3" name="answer3"/><br/><br/>
    <label for="answer4">الإجابة الرابعة:</label>
    <input ref={questionAnswerFour} type="text" id="answer4" name="answer4"/><br/><br/> */}
        <button type="subnit" className="btn btn-primary bg-primary">
          أضافه
        </button>
      </form>
      <br />
      <h2>المواد المضافة</h2>
      <table>
        <tr>
          <th>اسم المادة</th>
          <th>اسم الدكتور</th>
        </tr>
        <tr>
          <td>مادة 1</td>
          <td>دكتور 1</td>
          <td>
            <button onClick="deleteSubject()">X</button>
          </td>
        </tr>
        <tr>
          <td>مادة 2</td>
          <td>دكتور 2</td>
          <td>
            <button onClick="deleteSubject()">X</button>
          </td>
        </tr>
      </table>
      <h2>الاسئلة المضافة</h2>
      <table>
        <tr>
          <th>السؤال </th>
          <th>اسم الدكتور</th>
        </tr>
        <tr>
          <td>السؤال 1</td>
          <td>الاجابة1</td>
          <td>الاجابة 2</td>
          <td>الاجابة 3</td>
          <td>الاجابة 4</td>

          <td>
            <button onClick="deleteSubject()">X</button>
          </td>
        </tr>
        <tr>
          <td>السؤال 2</td>
          <td>الاجابة 1</td>
          <td>الاجابة 2</td>
          <td>الاجابة 3</td>
          <td>الاجابة 4</td>
          <td>
            <button onClick="deleteSubject()">X</button>
          </td>
        </tr>
      </table>
    </>
  );
}
