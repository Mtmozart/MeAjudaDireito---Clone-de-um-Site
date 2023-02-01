import styles from './Content.module.css'
import Administrator from '../../layouts/Administrator'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import useFlashMessage from '../../../hooks/useFlashMessage'
import api from '../../../utils/api'
import {Context} from '../../../context/UserContext'
import { useContext } from 'react'
import Denied from "../../layouts/Denied"
function Content(){
    const [conteudos, setConteudos] = useState([])
    const[token] = useState(localStorage.getItem("token")|| '')
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate()
    const {authenticated} = useContext(Context)

    useEffect(() => {
      api
        .get('/materias/conteudos')
        .then((response) => {
          setConteudos(response.data.conteudos)
        })
    }, [])


    async function removeCurso(id) {
      let msgType = 'success'
  
      const data = await api
        .delete(`materias/remove/${id}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        })
        .then((response) => {
          const updatedConteudo = conteudos.filter((conteudo) => conteudo.id !== id)
          setConteudos(updatedConteudo)
          return response.data
           })
        .catch((err) => {
          msgType = 'error'
          return err.response.data
        })
        setFlashMessage(data.message, msgType)
        if(msgType === 'error'){
          navigate(`materias/remove/${id}`)
      } else {
      navigate('/materias')
    }
        
         
    
    }

    return(
        <section className={styles.content}>

{authenticated ? (
      <>
         <div>
             <Administrator/>
        </div>
        <h3>Registro de resumos</h3>
        <p>Caso queria adicionar um resumo <Link to='/materias_adicionar'>clique aqui</Link></p>
        
    <div className={styles.cursoslist_header}>
      {conteudos.length > 0 && 
        conteudos.map((conteudo) => (
              <div key={conteudo.id} className={styles.cursoslist_row}>
                <span className="bold">{conteudo.title}</span>
                <div  className={styles.actions}>
                   <Link to={`/materias/edit/${conteudo.id}`}>Editar</Link>
                       <button    onClick={() => {
                                      
                                    removeCurso(conteudo.id)
                                    }}>
                              
                                        Excluir
                      </button>
                 </div>
          
              </div>
        ))
      }
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
export default Content