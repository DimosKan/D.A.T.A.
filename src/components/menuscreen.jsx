import { motion } from 'framer-motion' //helps for animation in react
import BackGround from './background';


export default function MenuScreen ({ selectedCategory, setSelectedCategory, setDifficulty,  handleStartGame, difficulty, animations, categories }) { 
  //Sets the category
  const handleCategoryChange = event => {
    setSelectedCategory(event.target.value)
  }; 

    //sets the difficulty
   const handleDifficultyChange = event => {
    setDifficulty(event.target.value)
  };
    return(
        <>     
        <BackGround/>
        <motion.div variants ={animations} initial = "initial" animate = "animate" exit = "exit" transition = {{duration : 2}}>
          <div className="center row justify-content-center align-items-center h-100">
           <form className="col-lg-10 col-lg-10">
           <div className = "maintitle"> <h1><center>Dimos' Awesome Trivia Algorithm (D.A.T.A) </center></h1> </div>
              <label>Please select the category and the difficulty you would like this quiz to have. You will be presented with 10 questions.</label>
              <p>Best of luck!</p>
              <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select id="category" className="form-control" value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">--Select Category--</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="difficulty">Difficulty</label>
                  <select id="difficulty" className="form-control" value={difficulty} onChange={handleDifficultyChange}>
                    <option value="">--Select Difficulty--</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary" disabled={!selectedCategory || !difficulty} onClick={handleStartGame}>Start Game</button>
           </form>
           <div id = "footer"><p>Made by Dimosthenis Kanellopoulos, for CS50 2023</p></div>
          </div>

       </motion.div>
        </>
    )
    
}