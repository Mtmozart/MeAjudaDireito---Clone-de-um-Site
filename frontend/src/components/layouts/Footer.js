import styles from'./Footer.module.css'
import {Link} from 'react-router-dom'

function Footer(){

    return(
        <section>    
           
            <footer className={styles.footer}>          
            <p> <span className="bold">Me ajuda direito</span>&copy; 2022 || <Link to="/politica_privacidade">Política de Privacidade</Link> ||<Link to="/direitos_autorais"> Autores das imagens.</Link></p>
        </footer>
        </section>

    )
}

export default Footer