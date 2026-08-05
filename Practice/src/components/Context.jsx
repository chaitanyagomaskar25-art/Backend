import React from 'react'
import College from './College'
import { useSetSubjectContext } from '../context/SubjectContext'

const Context = () => {
    const setSubject = useSetSubjectContext()
  return (
    <div className='yellow'>
        <select  onChange={(e)=>setSubject(e.target.value)}>
            <option value="select subject">Select Subject</option>
            <option value="Math">Math</option>
            <option value="English">English</option>
            <option value="Physics">Physics</option>
            <option value="History">History</option>
            <option value="Commerce">Commerce</option>
        </select>
      Context API
      <College />
    </div>
  )
}

export default Context
