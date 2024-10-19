import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const[prevPrompts, setPrevPrompts] = useState([]);
    const[showResult, setShowResult] =useState(false);
    const[loading, setLoading]= useState(false);
    const[resultData, setResultData] = useState("");
    const [darkMode, setDarkMode] = useState(false);




const delayPara = (index, nextword)=>{
setTimeout(function() {
    setResultData(prev=>prev+nextword)   
}, 75*index);
}
const newChat = ()=>{
    setLoading(false)
    setShowResult(false)

}
const onSent = async (prompt) => {
 
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if(prompt!==undefined){
        response = await run (prompt);
        setRecentPrompt(prompt)
    }
    else{
        setPrevPrompts(prev=>[...prev, input])
        setRecentPrompt(input);
         response = await run(input);
    
    }


 
    let responseArray = response.split("*");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
            newResponse += responseArray[i];
        } else {
            newResponse += "<b>" + responseArray[i] + "</b>";
        }
    }


    let newResponse2 = newResponse
        .replace(/\n/g, "<br/>") // Ensure line breaks remain intact
        .replace(/(\d+)\./g, "$1.") // Match numbers followed by a dot and add a new line
        .replace(/(\w+):/g, "$1:");


   let newResponserray = newResponse2.split(" ");
   for(let i=0; i< newResponserray.length; i++){
    const nextword = newResponserray[i];
    delayPara(i,nextword+" ");
   }
    setLoading(false);
    setInput("");
 
};




    const contextValue = {
        recentPrompt,
         prevPrompts,
         setPrevPrompts,
         onSent,
         setRecentPrompt,
         showResult,
         loading,
         resultData,
         setInput,
         newChat,
         darkMode,
         setDarkMode,
    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider;