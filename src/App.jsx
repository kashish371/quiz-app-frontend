import AdminPanel from "./AdminPanel"

import Quiz from "./Quiz"
import { useState } from "react"



function App(){
  const [view, setView]=useState("user")
  return(
    <div>

      <div>
        <button style={{backgroundColor:view==="user"?"blue":"white", color:view==="user"?"white":'black'}} onClick={()=>setView("user")}>User Panel</button>
        <button style={{backgroundColor:view==="admin"?"green":"white", color:view==="admin"?"white":'black'}} onClick={()=>setView("admin")}>Admin Panel</button>
      </div>
      {view==="user"? <Quiz/>: <AdminPanel/>}
    </div>

  )
}
export default App