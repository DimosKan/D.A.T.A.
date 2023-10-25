import { motion } from 'framer-motion' //helps for animation in react
import BackGround from './background';

export function LoadingScreen({animations}){

return(
    <>
    <BackGround/>
        <div className="loadingscreen center d-flex justify-content-center align-items-center h-100">
            <motion.div  variants ={animations} initial = "initial" animate = "animate" exit = "exit" transition = {{duration : 2}}>
                <div className="spinner-border" role="status">
                <span className="sr-only"></span>
                </div>
                <h2>Loading... </h2>
            </motion.div>
        </div>
    </>
);

}



export default LoadingScreen