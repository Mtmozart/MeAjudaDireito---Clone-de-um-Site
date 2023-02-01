import styles from "./AllCategories.module.css"
import { useState, useEffect } from 'react'
import api from '../../../utils/api'
import { Link } from 'react-router-dom'

function AllCategories(){
    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        api
          .get('/categorias/categorias')
          .then((response) => {
            setCategorias(response.data.categorias)
          })
      }, [])  


    return(
        <section className={styles.content}>  
            
        <h1>Disciplinas disponíveis</h1>
       
    <div className={styles.category_controller}>
    {categorias.length > 0 &&
    categorias.map((categoria) => (
        <div key={categoria.id} className={styles.category_container}>
            <Link to={`/categorias/categoria/${categoria.title}`} >{categoria.title}</Link>           
        </div>
    ))
    }
    </div>       
        </section>
    )
}
export default AllCategories