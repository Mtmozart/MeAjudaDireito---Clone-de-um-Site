import { Link } from 'react-router-dom'
import Administrator from '../../layouts/Administrator'
import { useEffect, useState } from 'react'
import styles from './CoursesAdm.module.css'
import RoundedImage from '../../forms/RoundendImage'

/*Hooks*/
import useFlashMessage from '../../../hooks/useFlashMessage'
import api from '../../../utils/api'
function CoursesAdm(){
    const [cursos, setCursos] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()
  

    useEffect(() => {
        api
          .get('/cursos/conteudos', {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          })
          .then((response) => {
            setCursos(response.data.cursos)
          })
      }, [token])

      async function removeCurso(id) {
        let msgType = 'success'
    
        const data = await api
          .delete(`/cursos/remove/${id}`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          })
          .then((response) => {
            const updatedCursos = cursos.filter((curso) => curso.id !== id)
            setCursos(updatedCursos)
            return response.data
             })
          .catch((err) => {
            msgType = 'error'
            return err.response.data
          })
          setFlashMessage(data.message, msgType)
      
      }

  

    return (
     <section> 
        <div>
        <Administrator/>
        </div>
        <div className={styles.cursoslist_header}>
           <h3>Cursos inseridos, caso queira inserir novos cursos, clique no botão abaixo.</h3>  <Link to='/cursos_inserir'>Cadastrar</Link> 
        </div>
        
    <div className={styles.cursoslist_header}>
                        {cursos.length > 0 && 
                        cursos.map((curso) => (
            <div key={curso.id}  className={styles.cursoslist_row}>
                              <RoundedImage
                                src={`${process.env.REACT_APP_API}images/${curso.image}`}
                                alt={curso.name}
                                width="px75"
                              />
                              <span className="bold">{curso.name}</span>
          
               
                        <div className={styles.actions}>
                              <Link   className={styles.conclude_btn} to={`/curso/edit/${curso.id}`}>Editar</Link>
                              <button 
                              onClick={() => {
                                    
                                
                                       removeCurso(curso.id)
                                       }}
                                    >

                                      Excluir
                              </button>
                        </div>
              </div>
      
        ))
        }
    </div>


</section>
    )
    }
export default CoursesAdm