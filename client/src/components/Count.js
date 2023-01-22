import React, {useEffect, useState} from 'react'

function Count() {
    const [count, setcount] = useState(0)

    // const handleClick = e =>{
    //     e.preventDefault()
    //     setcount(count+1)

    // }
    useEffect(() =>{
        setcount(count+1)
    },[])

  return (
    <div>
        <div>{count}</div>
        {/* <button onClick={handleClick}>increment</button> */}
    </div>
  )
}

export default Count