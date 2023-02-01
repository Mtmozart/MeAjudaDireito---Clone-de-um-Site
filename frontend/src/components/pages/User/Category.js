import styles from "./Category.module.css"
import { useEffect, useState } from 'react'
import Administrator from '../../layouts/Administrator'
import api from '../../../utils/api'
import useFlashMessage from "../../../hooks/useFlashMessage"
import { Link } from 'react-router-dom'
import {Context} from '../../../context/UserContext'
import { useContext } from 'react'
import Denied from "../../layouts/Denied"



function Category(){
    const [categorias, setCategorias] = useState([])
    const setFlashMessage = useFlashMessage
    const[token] = useState(localStorage.getItem("token")|| '')
    const {authenticated} = useContext(Context)


  useEffect(() => {
        api
          .get('/categorias/categorias')
          .then((response) => {
            setCategorias(response.data.categorias)
          })
      }, [])  

     async function removeCategoria(id){
      let msgType = 'success'
  
      const data = await api
        .delete(`categorias/remove/${id}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        })
        .then((response) => {
          const updatedCategoria = categorias.filter((categoria) => categoria.id !== id)
          setCategorias(updatedCategoria)
          return response.data
           })
        .catch((err) => {
          msgType = 'error'
          return err.response.data
        })
        setFlashMessage(data.message, msgType)
         
    
    
     }
   return(
<section className={styles.section_header}>
{authenticated ? (
      <>
    <div>
    <Administrator/>
    </div>
 
    <div>
         <h2>Todas as categorias</h2>
    </div>
    <div className={styles.category_controller}>
    {categorias.length > 0 &&
    categorias.map((categoria) => (
        <div key={categoria.id} className={styles.category_container}>
            <span>{categoria.title}</span>
            <div className={styles.action}>
            <Link to={`/categoria/editar/${categoria.id}`}>Editar</Link>
            <button    onClick={() => {
                                      
                                      removeCategoria(categoria.id)
                                      }}>
                                
                                          Excluir
                        </button>
          </div>
        </div>
    ))
    }
    </div>
    <div>
    <h2><Link to="/categoria/adicionar">Clique aqui</Link> para adicionar uma nova categoria</h2>
    </div>
    </>
     ):(  <>     
     <Denied/>
     </>)}
 </section>
     )
}
export default Category