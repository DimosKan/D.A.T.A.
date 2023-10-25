import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import {GameoverLose , GameoverWin} from './components/gameoverscreen';
import LoadingScreen from './components/loading';
import MenuScreen from './components/menuscreen';
import TriviaBody from './components/triviabody';

const API_URL = 'https://opentdb.com/api.php'


function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeLimit, setTimeLimit] = useState(15); 
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  //initializes the animation parameters to framer-motion library in order to be used later on motion.div
  const animations = {
    initial: {opacity: 0},
    animate: {opacity: 1},
    exit: {opacity: 0}
  }

  //Fething all the categories opentdb offers and getting them into an array.
  useEffect(() => {
    axios.get(`${API_URL}?amount=10&type=multiple`)
    .then(response => {
      setQuestions(response.data.results);
    })
    .catch(error => {
      console.error(error);
    });

    setLoading(true);

    axios.get('https://opentdb.com/api_category.php')
      .then(response => {
        setCategories(response.data.trivia_categories);
        setLoading(false)
      })
      .catch(error => {
        console.error(error);
        setLoading(false)
      });
  }, []);


  //If your time is up, skips the question
  useEffect(() => {
    if (timeLeft === 0 && gameStarted && currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
      setTimeLeft(timeLimit);
    }
  }, [timeLeft, gameStarted, currentQuestion, questions.length, timeLimit]);


  useEffect(() => {
    if (gameStarted && currentQuestion < questions.length) {
      const timer = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1)
      }, 1000);
        return () => clearInterval(timer);
    }
  } , [timeLeft, gameStarted, currentQuestion, questions.length, timeLimit , setTimeLeft]);


  //function that shuffles the correct and incorrect answers altogether.
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

  //When the game starts, make an axios request, shuffle all the questions on each object and insert them again as a new object, shuffled.
  const handleStartGame = () => {
    setLoading(true);
    axios
      .get(
        `${API_URL}?amount=10&category=${selectedCategory}&difficulty=${difficulty}&type=multiple`
      )
      .then((response) => {
        const shuffledQuestions = response.data.results.map((question) => ({
          ...question,
          answers: shuffleArray([
            ...question.incorrect_answers,
            question.correct_answer,
          ]),
        }));
        setQuestions(shuffledQuestions);
        setLoading(false);
        setGameStarted(true);
        setCurrentQuestion(0);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false)
      });
  };

  //Gives you one point when the answer you selected is the right one, if not, it doesn't, also resets the time for the next question.

  //returns to default values all the states that have been changed throughout the game.
  const handlePlayAgain = () => {
    setSelectedCategory('');
    setDifficulty('');
    setQuestions([]);
    setCurrentQuestion(0);
    setScore(0);
    setGameStarted(false);
    setTimeLimit(15);
    setTimeLeft(timeLimit)
  };

  //if loading state is true then it just gives you a loading screen until becomes false.
  if (loading) {
    return (
      <LoadingScreen animations = {animations} />
    )
  }

  //if gamestarted is not true The Menu screen appears (for difficulty and category option)
  if (!gameStarted) {
    return (
      <MenuScreen selectedCategory = {selectedCategory}animations = {animations} categories = {categories} setDifficulty = {setDifficulty} setSelectedCategory = {setSelectedCategory}  handleStartGame={handleStartGame} difficulty={difficulty}/>
    );
  }

  //Checking if the 10 questions are over. If they are, it displays a game over screen. it returns a different results according to the player's score
  //also it gives a random quote just for some extra quality.
  if (currentQuestion >= questions.length) {
    if (score < 6 ){
      return (
        <GameoverLose handlePlayAgain = {handlePlayAgain} score = {score} questions = {questions} animations = {animations} />
      );
    }else{
      return (
        <GameoverWin handlePlayAgain = {handlePlayAgain} score = {score} questions = {questions} animations = {animations} />
      );
    } 
  } 

  const question = questions[currentQuestion];
  
  return (
    <TriviaBody currentQuestion = {currentQuestion} question = {question} setTimeLimit = {setTimeLimit} setTimeLeft={setTimeLeft} setCurrentQuestion={setCurrentQuestion} timeLimit = {timeLimit} timeLeft = {timeLeft}  handlePlayAgain = {handlePlayAgain} score = {score} setScore = {setScore} questions = {questions} difficulty = {difficulty} animations = {animations}/>
  );
}

export default App