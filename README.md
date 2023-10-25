# Dimos' Awesome Trivia Algorithm (D.A.T.A.)

#### Description:
I've made a relatively simple working quiz game using an API called opentdb.com. I've wanted to work with it on React.js since it is becoming a very popular javascript library among the front-end programmers. This app has not much going on with the back-end, but I've focused a lot on the front-end scripting. As a matter of fact, everything but the API is front-end.

**How does it work?**
First thing the user shall see will be a welcome screen which tells you to choose a category and a difficulty of the questions. When the user presses "Start Game", the game shall start. The game is a quiz game with 4 multi-choice questions, the time is running depending the difficulty the player has chosen. If the player successfully answers 5 or more questions, the game will congratulate him, that means he won, he can now go on testing his knowledge in another category or level. If he answers less than 5 questions, the game will give him a "Game Over" screen. Regardless of the outcome, the player gets a "random quote of the day" by using a second API called api.quotable.io.

**Folder Structure**
Many of those folders are generated via react.js, so I am gonna ignore those if I haven't edited anything.
+
- /node_modules: Contains all the library files that react uses.
- /public: Mostly folder that react uses, you can insert a favicon there, I've inserted an image that is viable for a quiz game.
- /src: Most important file, all scripts I've made lie there.
    - /components: React has a very handy component system, which means it can reuse certain files again and again in a lightweight way and with different variables (props).
        - Background: Literally just the background of the web app, which contains certain divs in order to render the cloud animations.
        - Gameoverscreen: When the game ends, it displays the appropriate message. With the appropriate background and a random quote which it gets from "randomquote.jsx"
        - Loading: When the axios request takes place, it is logical that it there will be some time in order to fetch the questions, loading gives you a graphical message for that loading time until the questions appear.
        - Menuscreen: The structure of the initial screen of the quiz game.
        - Randomquote: Makes an axios request which fetches a random quote for when someone end the game.
        - Triviabody: The file which lies the structure of the main body of the quiz, the time-counting part, the progressbar part, the multi-choice part, the choice-box structure etc.
    - /iconlibrary: A collection of pictures that are used for the project.
    - app.css: Here lies all the css that was used by the project.
    - app.js: Main file, like app.py of flask. Some of the main functions are handled there, such as fetching and shuffling, starting the game, passes props to other components etc.

#### Known bugs:
1. It hardly happens but sometimes randomly when I press "Start game", it just skips the questions and goes to the game over screen.

There was an attempt to make the quiz persistent through reloading and closing the browser through manipulation on local storage, but in each refresh, it kept changing questions and category.

Had an idea for the game to have some kind of point system (along with a score system in each quiz session). The points would be saved on local storage, and the player would gain more points depending on the difficulty of the questions answered. They would show the overall progress of the player playing the game. Did not have time to implement.

#### How to start it:

Runs the app in the development mode. Open http://localhost:3000 to view it in your browser. The page will reload when you make changes. You may also see any lint errors in the console.

(Of course, you must have npm installed for this to run)

Thanks for your time.
Dimosthenis Kanellopoulos
