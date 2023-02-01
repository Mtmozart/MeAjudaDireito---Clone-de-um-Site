
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Administrator from '../../layouts/Administrator'
import { useState } from 'react'
import CourseForm from '../../forms/CourseForm'
import styles from './CourseAdd.module.css'
import useFlashMessage from '../../../hooks/useFlashMessage'
import api from '../../../utils/api'
import {Context} from '../../../context/UserContext'
import { useContext } from 'react'
import Denied from "../../layouts/Denied"
function CoursesAdd(){
    const[token] = useState(localStorage.getItem("token")|| '')
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate()
    const {authenticated} = useContext(Context)
    

    async function registerCourse(course){
        let msgType = 'success'
        const formData = new FormData()
        await Object.keys(course).forEach((key) => {
            if(key === 'images'){
                for(let i = 0; i < course[key].length; i++){
                    formData.append('images', course[key][i])
                    }
            } else {
                formData.append(key, course[key])
      }
        })
        const data = await api
      .post(`cursos/criarconteudo`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response)=>{
            return response.data
        })
        .catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)

        if(msgType === 'error'){
            navigate('/curso_inserir')
        } else {
        navigate('/cursos_administracao')
    }
    }
    return (
     <section> 
       {authenticated ? (
      <>
        <div>
        <Administrator/>
        </div>
        <div className={styles.h3}>
            <h3> <Link  to='/cursos_administracao'>Clique aqui</Link> para voltar para a página de cursos cadastrados.</h3>
            </div>

       <div>
            <CourseForm  handleSubmit={registerCourse} btnText="Cadastre o curso"/>
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
export default  CoursesAdd