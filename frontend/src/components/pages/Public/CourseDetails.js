import styles from './CourseDetails.module.css'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import useFlashMessage from '../../../hooks/useFlashMessage'
import api from '../../../utils/api'



function CourseDetails(){
    const [curso, setCurso] = useState([])
    const {id} = useParams()
    const {setFlashMessage} = useFlashMessage
    

    useEffect(() => {
          api.get(`/cursos/checkconteudo/${id}`).then((response) => {
          setCurso(response.data.curso)
        })
      }, [id])
    return(
     
        
       <>
       {curso.name && (
        <section className={styles.curso_container}>  
        <div key={curso.id}>
            <h1>{curso.name}</h1>
        </div>
        <div className={styles.curso_images}>           
            <img
            key={curso.image}
            src={`${process.env.REACT_APP_API}/images/${curso.image}`}
            alt={curso.name}
             />
        </div>
        <p>
            <span >{curso.author}</span>    
        </p>
        <p>
            <span >{curso.platform}</span>    
        </p>      
        <p>
            <span >{curso.category}</span>    
        </p>       
        <p>
            <span className={styles.description}>{curso.description}</span>    
        </p>  
        <div className={styles.curso_container_link}>
        <a href={curso.link}>Compre na plataforma</a>      
        </div>

        </section>
       ) }
       
       </> 
              
       

        

      

    )
}
export default CourseDetails