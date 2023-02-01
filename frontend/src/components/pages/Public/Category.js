import styles from "./AllCategories.module.css"
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import useFlashMessage from '../../../hooks/useFlashMessage'
import api from '../../../utils/api'

function CategoryPublic(){
    const [categories, setCategories] = useState([])
    const {category} = useParams()
    const {setFlashMessage} = useFlashMessage
    

    useEffect(() => {
        api.get(`/materias/conteudos/${category}`).then((response) => {
            setCategories(response.data.categories)
      })
    }, [category])
    return(
        <section className={styles.content}>
             <h1>Resumos</h1>
             <div className={styles.category_controller}>
    {categories.length > 0 &&
    categories.map((conteudo) => (
        <div key={conteudo.id} className={styles.category_container}>
            <div className={styles.link}>
            <Link to={`/conteudo/${conteudo.id}`}>{conteudo.title}</Link>  
            <span className={styles.description}>{conteudo.description}</span>         
            </div>
        </div>
    ))
    }
    </div>    

        </section>
    )
}

export default CategoryPublic