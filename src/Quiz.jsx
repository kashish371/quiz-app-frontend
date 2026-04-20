import axios from "axios"
import { useEffect, useState } from "react"

function Quiz(){
    const [questions, setQuestions]=useState([])
    const [current, setCurrent]=useState(0)
    const [score, setScore]=useState(0)
    const [finished, setFinished]=useState(false)
    const [username, setUsername]=useState("")
    const [history, setHistory]=useState([])
    const [extraname, setExtraname]=useState("")

     useEffect(()=>{
            axios.get("https://quiz-app-backend-hn6t.onrender.com/questions")
            .then((res)=>setQuestions(res.data))
            .catch((e)=>console.log(e))
        },[])

    async function saveScore(){
        await axios.post(`https://quiz-app-backend-hn6t.onrender.com/scores`, {username, score, total:questions.length})
        const res=await axios.get( `https://quiz-app-backend-hn6t.onrender.com/scores/${username}`)
        setHistory(res.data)
    }

    function verifyAns(i){
        if(i===questions[current].answer) setScore(score+1)
        if(current<questions.length-1) setCurrent(current+1)
        else setFinished(true)
    }

    return(
       <div>

        {!username?(
            <div>
                <h2>Enter your name</h2>
                <input type="text" name="" id="" onChange={(e)=>setExtraname(e.target.value)} value={extraname}/>
                <button onClick={()=>setUsername(extraname)}>Start Quiz</button>
            </div>
        ):!finished?(
            <div>
                {questions.length>0?(
                    <div>
                        <h2>{questions[current].question}</h2>
                        <div>
                            {questions[current].options.map((opt, i)=>(
                                <button onClick={()=>verifyAns(i)}>{opt}</button>
                            ))}
                        </div>
                    </div>
                ):(
                    <div>
                        <p>No questions present currently</p>
                    </div>
                )}
            </div>
        ):(
            <div>
                <h2>Quiz finished</h2>
                <p>Your score:{score}/{questions.length}</p>
                <button onClick={saveScore}>Save score</button>
                {history.length>0 && (
                    <div>
                        <h3>Previous scores</h3>
                        <ul>
                            {history.map((h, i)=>(
                                <li>{new Date(h.date).toLocaleString()}{h.score}/{h.total}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        )}
       </div>


    )
}
export default Quiz