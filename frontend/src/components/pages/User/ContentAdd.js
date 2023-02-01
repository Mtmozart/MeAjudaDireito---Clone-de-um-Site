import styles from './Content.module.css'
import Administrator from '../../layouts/Administrator'
import { useEffect, useState } from 'react'
import ContentForm from '../../forms/ContentForm'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import useFlashMessage from '../../../hooks/useFlashMessage'
import api from '../../../utils/api'
import {Context} from '../../../context/UserContext'
import { useContext } from 'react'
import Denied from "../../layouts/Denied"


function ContentAdd(){
    const[token] = useState(localStorage.getItem("token")|| '')
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate()  
    const [categorias, setCategorias] = useState([])
    const {authenticated} = useContext(Context)
    useEffect(() => {
      api
        .get('/categorias/categorias')
        .then((response) => {
          setCategorias(response.data.categorias)
        })
    }, [])  

    async function registeContent(content){

        let msgType = 'success'
        const formData = new FormData()
        
         await Object.keys(content).forEach((key) => {
            if(key === 'documents'){
                for(let i = 0; i < content[key].length; i++){
                    formData.append('documents', content[key][i])
                    }
            } else {
                formData.append(key, content[key])
      }
        })
        console.log(formData)
        const data = await api
      .post(`materias/criarconteudo`, content, {
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
            navigate('/materias_adicionar')
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
        <div><h4>Categorias Válidas</h4></div>
        <div className={styles.categories}>
      {categorias.length > 0 &&
      categorias.map((categoria) => (
        <div key={categoria.id} className={styles.categories_child} >
         <div >{categoria.title}</div>
          
        </div>
      ))
      }
      </div>

        <div>
          <h4>Para verificar as categorias <Link to="/categoria/categorias">clique aqui </Link> </h4>
        </div>
        <div>
        <h3>Registro de resumos</h3>
            <ContentForm  handleSubmit={registeContent} btnText="Cadastre o curso"/>
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
export default ContentAdd
