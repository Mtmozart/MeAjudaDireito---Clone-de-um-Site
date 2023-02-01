import styles from "./Warning.module.css"
import {Link} from 'react-router-dom'
import {useContext} from 'react'
import { Context } from '../../context/UserContext'
function Warning(){
  const {cookie, acceptCookie} = useContext(Context)
 return( 
    <section className={styles.container}>
   {cookie !== true ? ( <>
    <div  className={styles.warning}>
<p>Usamos somente cookies essencias para o funcionamento do site e para saber a quantidades de acesso "Analytics", você pode saber mais sobre nossa de <Link to="/politica_privacidade">Política de Privacidade.</Link> </p>
<button onClick={acceptCookie}>                                
 Entendi!</button>                       
</div>
</>):(<>
</>)}  
</section>
)
}
export default Warning




