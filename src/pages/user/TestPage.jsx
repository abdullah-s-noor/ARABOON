import { UserContext } from '../../context/UserContext'
import React, { useContext, useEffect } from 'react'

function TestPage() {
  const {userToken}=useContext(UserContext)
  useEffect(()=>{
    console.log(11)
    console.log(userToken)
  },[])
  return (
    <div>
      fffff
    </div>
  )
}

export default TestPage
