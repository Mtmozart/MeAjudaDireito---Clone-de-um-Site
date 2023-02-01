import styles from "./PrivacyPolicy.module.css"
import {Link} from "react-router-dom"

function PageNotFound(){
    return(
        <section className={styles.container}>      
            
              <h1>Erro 404! Página não encontrada.</h1>
             <p className={styles.notFound}>Vá para a <Link to="/" >Home</Link></p>

</section>
    )
}

export default PageNotFound