import styles from './Courses.module.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

/*Hooks*/
import api from '../../../utils/api'
function Courses(){
    const [cursos, setCursos] = useState([])
   

    useEffect(() => {
        api.get('/cursos/conteudos').then((response) => {
        setCursos(response.data.cursos)
        })
      }, [])


    return(
        <section className={styles.content}>
    
        <div  className={styles.content_h1}>
            <h1>Escolha o curso de sua preferência</h1>
            <p>É importante ressaltar que ainda não criamos uma plataforma para estudo de curso, todos estes  foram escolhidos de outras plataformas</p>
         </div>
         <div className={styles.curso_container}>
            
            {cursos.length > 0 &&
            cursos.map((curso) => (
                <div className={styles.curso_card} key={curso.id}>
                        <div 
                         style={{
                            backgroundImage: `url(${process.env.REACT_APP_API}images/${curso.image})`,
                          }}
                          className={styles.curso_card_image}
                          ></div>
                          <h3>{curso.name}</h3>
                          <Link to={`/cursos/details/${curso.id}`}>Mais detalhes</Link>
                </div>
            ) 
            )}

            {cursos.length === 0 &&(
                  <p>Não há cursos cadastrados ou disponíveis no momento!</p>
            )} 
            
         </div>
      
    </section>
    )
}
export default Courses