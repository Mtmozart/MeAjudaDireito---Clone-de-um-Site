import api from "../../../utils/api";
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from './CourseAdd.module.css'
import Administrator from '../../layouts/Administrator'
import ContentForm from '../../forms/ContentForm'
import { useNavigate } from 'react-router-dom'
import useFlashMessage from '../../../hooks/useFlashMessage'
import {Context} from '../../../context/UserContext'
import { useContext } from 'react'
import Denied from "../../layouts/Denied"



function ContentEdit(){
    const [content, setContent] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const {id} = useParams()
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate()
    const {authenticated} = useContext(Context)

    useEffect(() => {
        api
          .get(`materias/checkconteudo/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
              },
        })
          .then((response) => {
            setContent(response.data.content)
        })
}, [token, id])

    
 async function updateConteudo(content){
    let msgType = 'success'
    const formData = new FormData()

    await Object.keys(content).forEach((key) => {
        if(key === 'documents'){
          for(let i = 0; i < content[key].lenght; i++){
            formData.append('documents', content[key][i])
        
        }} else {
         formData.append(key, content[key])
        }
         })
     

         const data = await api.patch(`materias/editar/${content.id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data',
              },
        })
        .then((response) => {
        return response.data
           
        })  .catch((err) => {
            console.log(err)
            msgType = 'error'
            return err.response.data
          })
    
        setFlashMessage(data.message, msgType)
      
       if(msgType === 'success'){
        navigate('/materias')
    } 
          
}

return(

    <section>
      {authenticated ? (
      <>
        <div>
        <Administrator/>
        </div>
        <div>
            <h1 className={styles.titulo}>Editado o resumo: {content.title}</h1>
        </div>
        
        {content.title && (
            <ContentForm handleSubmit={updateConteudo} btnText="Atualizar" conteudoData={content}/>
        )}
        </>
              ):(  <>  
              <div>   
              <Denied/>
     </div>
     </>)}
     </section>
)

    
}

export default ContentEdit