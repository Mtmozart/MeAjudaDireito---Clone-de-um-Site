import styles from './Content.module.css'
import Administrator from '../../layouts/Administrator'
import {Context} from '../../../context/UserContext'
import { useContext } from 'react'
import Denied from "../../layouts/Denied"


function Content(){
    const {authenticated} = useContext(Context)
    return(
        <section className={styles.content}>
             {authenticated ? (
      <>
         <div>
             <Administrator/>
        </div>
        <div className={styles.content_titulo_materia}>
            <h3>Página do administrador</h3>       
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