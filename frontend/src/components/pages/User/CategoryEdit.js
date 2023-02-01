import api from "../../../utils/api"
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Administrator from '../../layouts/Administrator'
import { useNavigate } from 'react-router-dom'
import useFlashMessage from "../../../hooks/useFlashMessage"
import styles from '../../forms/Form.module.css'
import Input from '../../forms/Input'
import {Context} from '../../../context/UserContext'
import { useContext } from 'react'
import Denied from "../../layouts/Denied"

function CategoryEdit(){
  const [category, setCategory] = useState({})
  const { setFlashMessage } = useFlashMessage()
  const [token] = useState(localStorage.getItem('token') || '')
  const {id} = useParams()
  const navigate = useNavigate()
  const {authenticated} = useContext(Context)
 
  useEffect(() => {
    api
      .get(`categorias/categoria/${id}`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
    })
      .then((response) => {
        setCategory(response.data.category)
    })
}, [token, id])

  async function update(category){
    let msgText = 'Atualização realizada com sucesso!'
    let msgType = 'success'
    try {
        const update = await api.patch(`categorias/edit/${category.id}`, category)
        .then((response)=>{
            return response.data
        })    
      
    } catch(error){
        msgText = error.response.data.message
        msgType = 'error'
         }

    setFlashMessage(msgText, msgType)
    if(msgType === 'error'){
      navigate(`/categoria/edit/${id}`)
  } else {
  navigate('/categoria/categorias')
}
      
}
  function  handleChange(e) {
    setCategory({ ...category, [e.target.name]: e.target.value })
    }
   const handleSubmit = async (e) => {
    e.preventDefault() 
    update(category)
  }


   return(
       <section>
         {authenticated ? (
      <>
        <div>
            <Administrator/>
        </div>
    


    <div>
        <form onSubmit={handleSubmit} className={styles.form_container}>
                <Input
                text="Digite o título"
                type="text"
                name="title"
                placeholder="Título da categoria"              
                handleOnChange={handleChange}
                maxLength={30}
                value={category.title}
                />
            <input type="submit" value="Atualizar" />
              </form>
              </div>
              </>
              ):(  <>  
              <div>   
              <Denied/>
     </div>
     </>)}
       </section>
    )
}

export default CategoryEdit