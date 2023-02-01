import Input from '../../forms/Input'
import styles from '../../forms/Form.module.css'
import Administrator from '../../layouts/Administrator'
import { useState } from "react"
import useFlashMessage from '../../../hooks/useFlashMessage'
import api from '../../../utils/api'
import { useNavigate } from 'react-router-dom'
import {Context} from '../../../context/UserContext'
import { useContext } from 'react'
import Denied from "../../layouts/Denied"


function CategoryAdd(){
  const [category, setCategory] = useState({})
  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate()
  const {authenticated} = useContext(Context)

  async function register(category){
    let msgText = 'Cadastro realizado com sucesso!'
    let msgType = 'success'
       try {
        const data = await api.post('categorias/criar_categoria/', category).then((response)=>{
            return response.data
        })
            
    } catch (error) {
        msgText = error.response.data.message
        msgType = 'error'
    }
    setFlashMessage(msgText, msgType)
    if(msgType === 'error'){
      navigate('/categoria/adicionar')
  } else {
  navigate('/categoria/categorias')
}
  }


  function  handleChange(e) {
    setCategory({ ...category, [e.target.name]: e.target.value })
    
   }
   function handleSubmit(e){
    e.preventDefault()
    register(category)
   
   }

    return(
        <section>
          {authenticated ? (
      <>
        <div>
             <Administrator/>
        </div>
             <form onSubmit={handleSubmit} className={styles.form_container}>
                <Input
                text="Digite o título"
                type="text"
                name="title"
                placeholder="Título da categoria"
                maxLength={30}
                handleOnChange={handleChange}
                />

            <input type="submit" value="Cadastrar" />
              </form>
              </>
              ):(  <>  
              <div>   
              <Denied/>
     </div>
     </>)}
      </section>
    ) 
}

export default CategoryAdd