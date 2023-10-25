import RandomQuote  from './randomquote' //outputs a random quote using API for the game over screen.
import { motion } from 'framer-motion' //helps for animation in react


export function GameoverLose({handlePlayAgain, score, questions, ...animations}){

return (
    <motion.div variants ={animations} initial = "initial" animate = "animate" exit = "exit" transition = {{duration : 2}}>
      <div className="background-container">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>
      </div>
      <div className = "center gameoverScreen">
        <h1>Game Over</h1>
        <p>You got {score} out of {questions.length} correct! You can do much better!</p>
        <RandomQuote/>
        <button className = "btn btn-primary" onClick={handlePlayAgain}>Play Again</button>
      </div>
    </motion.div>
  );
}



export function GameoverWin({handlePlayAgain , score, questions, ...animations}){

  return(
  <motion.div variants ={animations} initial = "initial" animate = "animate" exit = "exit" transition = {{duration : 2}}>
    <div className='stars'></div>
    <div className="pyro">
      <div className="before"></div>
      <div className="after"></div>
    </div>
    <div className = "center gameoverScreen">
      <h1>Game Over</h1>
      <p>You got {score} out of {questions.length} correct! Good Job, you are a legend among Quizmasters!</p>
      <RandomQuote/>
      <button className = "btn btn-primary" onClick={handlePlayAgain}>Play Again</button>
    </div>
  </motion.div>
  )

}

export default GameoverWin