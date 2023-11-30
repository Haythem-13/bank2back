import React, { useState } from 'react';
import axios from 'axios';
import "./advice.css"

const Advice = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/ask', { question });
      setAnswer(response.data.answer);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='advice-container'>
      <h2 className='loa'>Advice Page</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="askme"
          placeholder="Ask a question..."
          value={question}
          onChange={handleQuestionChange}
        ></textarea>
        <button id='sumbit-advice' type="submit">Submit</button>
      </form>
      {answer && (
        <div>
          <h2>Answer:</h2>
          <div className='answer'><p>{answer}</p></div>
        </div>
      )}
    </div>
  );
};

export default Advice;
