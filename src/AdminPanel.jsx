import { useEffect, useState } from "react"
import axios from "axios"

function AdminPanel(){
    const [questions, setQuestions]=useState([])
    const [form, setForm]=useState({question:"", options:["", "", "", ""], answer:0})
    const [editingId, setEditingId]=useState(null)

    async function fetchQuestions(){
       const res= await axios.get("http://localhost:4000/questions")
       setQuestions(res.data)

    }

    useEffect(()=>{
        fetchQuestions()
    }, [])


    function editQuestion(q){
        setForm({question:q.question, options:q.options, answer:q.answer})
        setEditingId(q._id)
    }

    async function handleSave(){
        if(editingId){
            await axios.put(`http://localhost:4000/questions/${editingId}`, form)
        }
        else{
            await axios.post("http://localhost:4000/questions", form)
        }
        fetchQuestions()
        setForm({question:"", options:["", "", "", ""], answer:0})
        
    }

    async function deleteQuestion(id){
        await axios.delete(`http://localhost:4000/questions/${id}`)
        fetchQuestions()
    }

    return(
        <div>
            <h2>Admin Panel</h2>
            <input type="text" name="" id="" placeholder="Question" onChange={(e)=>setForm({...form, question:e.target.value})} value={form.question} />
            {form.options.map((opt, i)=>(
                <input type="text" name="" id="" placeholder="Option" onChange={(e)=>{const newOpts=[...form.options]; newOpts[i]=e.target.value; setForm({...form, options:newOpts})}} value={form.options[i]}/>
            ))}
            <input type="text" name="" id="" placeholder="Answer" onChange={(e)=>{setForm({...form, answer:e.target.value})}} value={form.answer} />
            <button onClick={handleSave}>{editingId? "Update Question" : "Add Question"}</button>
            <h3>Exiting Questions</h3>
            <div>
                {questions.length>0?<ul>{
                    questions.map((q)=>(
                        <li>
                            <span>{q.question}</span>
                            <div>
                                <button onClick={()=>editQuestion(q)}>Edit</button>
                                <button onClick={()=>deleteQuestion(q._id)}>Delete</button>
                            </div>
                        </li>
                    ))
                }</ul>:<p>No questions present</p>}
            </div>
        </div>

    )
}
export default AdminPanel