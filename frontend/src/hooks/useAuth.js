import api from '../utils/api'
import { useNavigate } from 'react-router-dom' 
import useFlashMessage from './useFlashMessage'
import { useState, useEffect } from 'react'


export default function useAuth(){
    const navigate = useNavigate()
    const [authenticated, setAuthenticated] = useState(false)
    const { setFlashMessage } = useFlashMessage()
    useEffect(() =>  {
        const token = localStorage.getItem('token')

        if(token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }
    },[]
    )
    async function register(user){
        let msgText = 'Cadastro realizado com sucesso!'
        let msgType = 'success'
        try {
            const data = await api.post('users/register/', user).then((response)=>{
                return response.data
            })
           await authUser(data)
        } catch (error) {
            msgText = error.response.data.message
            msgType = 'error'
        }
        setFlashMessage(msgText, msgType)
    }

    async function authUser(data) {
        setAuthenticated(true)
        localStorage.setItem('token', JSON.stringify(data.token))
       navigate('/')
      }
    function logout(){
        const msgText = 'Logout Realizado com sucesso'
        const msgType = 'success'
        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined
        navigate('/')
        setFlashMessage(msgText, msgType)
    }
    async function login(user){
        let msgText = 'Login realizado com sucesso'
        let msgType = 'success'

        try{
            const data = await api.post('users/login', user).then((response) =>{
                return response.data
            })
            await authUser(data)
        }catch(error){
            msgText = error.response.data.message
            msgType = 'error'
        }
        setFlashMessage(msgText, msgType)
    }
    async function update(user){
        let msgText = 'Atualização realizada com sucesso!'
        let msgType = 'success'
        try {
            const update = await api.patch(`users/edit/${user.id}`, user)
            .then((response)=>{
                return response.data
            })
        } catch(error){
            msgText = error.response.data.message
            msgType = 'error'
        }
        setFlashMessage(msgText, msgType)        
    }

    return{ authenticated, register, logout, login, update}
}