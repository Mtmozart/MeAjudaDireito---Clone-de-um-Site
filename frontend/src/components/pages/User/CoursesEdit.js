import api from "../../../utils/api";
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './CourseAdd.module.css'
import Administrator from '../../layouts/Administrator'
import CourseForm from '../../forms/CourseForm'
import useFlashMessage from '../../../hooks/useFlashMessage'
import {Context} from '../../../context/UserContext'
import { useContext } from 'react'
import Denied from "../../layouts/Denied"


function CourseEdit(){
    const [curso, setCurso] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const {id} = useParams()
    const navigate = useNavigate()
    const {setFlashMessage} = useFlashMessage()
    const {authenticated} = useContext(Context)

    useEffect(() => {
        api
            .get(`/cursos/checkconteudo/${id}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                  },
            })
            .then((response) => {
                setCurso(response.data.curso)
            })
    }, [token, id])

     async function updateCourse(curso){
       let msgType = 'success'
        const formData = new FormData()

        const courseFormData = await Object.keys(curso).forEach((key) => {
           if(key === 'image'){
            formData.append(`image`, curso[key])
           } else {
            formData.append(key, curso[key])
           }
  })
        formData.append('curso', courseFormData)
        const data = await api.patch(`/cursos/editar/${curso.id}`, formData, {
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
        if(msgType === 'error'){
            navigate('/cursos_inserir')
        } else {
        navigate('/cursos_administracao')
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
            <h1 className={styles.titulo}>Editado o curso de: {curso.name}</h1>
        </div>
        {curso.name && (
            <CourseForm handleSubmit={updateCourse} btnText="Atualizar" cursoData={curso}/>
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


export default CourseEdit