import axios from "axios";
import { useEffect, useState } from "react";

const Questions = ({ user, setUser }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    (async () => setQuestions(await getQuestionsWithAnswers()))()
  }, []);

  const getQuestionsWithAnswers = async () => {
    try {
      return (await axios.get("http://localhost:3000/percentage")).data;
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="container">
      <table className="table table-border table-hover">
        <thead>
          <tr className='bg-primary'>
            <th>Qeustion</th>
            <th>موافق تماما</th>
            <th>موافق</th>
            <th>الى حد ما</th>
            <th>غير موافق</th>
          </tr>
        </thead>
        <tbody>
          {questions?.map((q, i) => (
            <tr key={i}>
              <td>{q.question}</td>
              <td>{q.answers['موافق تماما'] * 100} %</td>
              <td>{q.answers['موافق'] * 100} %</td>
              <td>{q.answers['الي حد ما'] * 100} %</td>
              <td>{q.answers['غير موافق'] * 100} %</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Questions;
