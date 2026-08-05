import { createContext, useContext, useState } from "react";

const SubjectContext = createContext()
const SetSubjectContext = createContext()

export const SubjectContextProvider = ({children})=>{
    const [subject, setSubject] = useState("")
    return (
        <SubjectContext value={subject}>
            <SetSubjectContext value={setSubject}>
                {children}
            </SetSubjectContext>
        </SubjectContext>
    )
}

export const useSubjectContext = ()=>{
    const result = useContext(SubjectContext)
    if(result === undefined){
        throw new Error("Subject COntext is undefine");        
    }
    return result
}

export const useSetSubjectContext = ()=>{
    const result = useContext(SetSubjectContext)
    if(result === undefined){
        throw new Error("Set Subject Context is undefine");
    }
    return result
}
