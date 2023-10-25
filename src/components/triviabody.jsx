import React, { useEffect , useState} from 'react';
import { Button, ProgressBar } from 'react-bootstrap';
import { CircularProgressbar } from 'react-circular-progressbar';
import { motion } from 'framer-motion';
import { BackGround } from './background';
import 'react-circular-progressbar/dist/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TriviaBody({ question, timeLimit, setScore, handlePlayAgain, setTimeLeft, setTimeLimit, timeLeft, difficulty, gameStarted, currentQuestion, questions, setCurrentQuestion, score, animations }) {

  const [progress, setProgress] = useState(0);
  //sets the time for the questions following.
  useEffect(() => {
    if (difficulty === 'easy') {
      setTimeLimit(15);
    } else if (difficulty === 'medium') {
      setTimeLimit(10);
    } else if (difficulty === 'hard') {
      setTimeLimit(10);
    }
  }, [difficulty, setTimeLimit]);

  const handleAnswerSelected = (answer) => {
    const isCorrect = answer === questions[currentQuestion].correct_answer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
    setTimeLeft(timeLimit);
    setProgress((currentQuestion + 1) / questions.length);
  };

  const percentage = (timeLeft / timeLimit) * 100;

  return (
    <>
    <BackGround/>
      <div className="center quiz-container">
        <motion.div variants={animations} initial="initial" animate="animate" exit="exit" transition={{ duration: 3 }}>
          <div className="catname">
            <h2>{question.category}</h2>
          </div>
          <div className="questioncard">
            <div className="questioncontainer">
              <p dangerouslySetInnerHTML={{ __html: question.question }}></p>
            </div>
            
            <div className="container">
              <div className="row">
                {question.answers.map((answer) => (
                  <motion.div className="col-md-6 " variants={animations} initial="initial" animate="animate" exit="exit" transition={{ duration: 3 }}>
                    <Button variant="outline-primary" key={answer} dangerouslySetInnerHTML={{ __html: answer }} onClick={() => handleAnswerSelected(answer)}></Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <div>
             <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                      <div style={{ width: '100px', height: '100px' }}><CircularProgressbar value={percentage} text={`${timeLeft}s`} /></div>
                    </div>
                    <div className="col-sm-4">
                        <span><p>Score: {score}</p></span>
                        <span><button className="btn btn-primary" onClick={handlePlayAgain}> Reset </button></span>
                    </div>
                    <div className="col-sm-4 ">
                      <div className = "questionprog"><ProgressBar now={progress * 100} label={`${currentQuestion + 1} of ${questions.length}`} style={{height: '100px', width: "150px" , borderRadius: '10'}}/></div>
                    </div>
                 </div>
                </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}