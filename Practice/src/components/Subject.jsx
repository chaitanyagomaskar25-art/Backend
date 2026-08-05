import React from 'react'
import { useSetSubjectContext, useSubjectContext } from '../context/SubjectContext'

const Subject = () => {
    // const setSubject = useSetSubjectContext()
const subject = useSubjectContext()
  return (
    <div className='pink'>
      Subject is {subject === "select subject"? "": subject}
    </div>
  )
}

export default Subject
