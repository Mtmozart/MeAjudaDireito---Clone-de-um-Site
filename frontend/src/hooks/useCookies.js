import { useState, useEffect } from 'react'

export default function useCookies(){
    const [cookie, setCookie] = useState(false)

useEffect(() =>{
  const cookie = localStorage.getItem("cookies", true)
  if(cookie)
  setCookie(true)
}, [])

function acceptCookie(cookie){
    localStorage.setItem("cookies", true)
    setCookie(true)
}
    return { cookie, acceptCookie}
}