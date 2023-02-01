import styles from "./Contents.module.css"
import  {useEffect, useState} from "react"  
import {useParams} from "react-router-dom"
import api from '../../../utils/api'

function ContentsPublic(){
    const [content, setContent] = useState([])
    const {id} = useParams()

    useEffect(() => {
        api.get(`/materias/checkconteudo/${id}`).then((response) => {
      setContent(response.data.content)
      })
    }, [id])

    return (
    <>      
            {content.title && (
                <section className={styles.content}>
                <div key={content.id}>
                    <h1>{content.title}</h1>
                <object type="application/pdf" data={`${process.env.REACT_APP_API}documents/contents/${content.document}`} width="100%" height="100%">

                </object>
                </div>
                </section>
            )}
           
            <object>

            </object>
    
            
      </>
    )
}

export default ContentsPublic