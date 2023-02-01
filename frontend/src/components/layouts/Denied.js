import {Link} from 'react-router-dom'
import styles from './Denied.module.css'


function Denied(){
    return(
        <div className={styles.conteiner}>
        <h2>Você não tem autorização para acessar esta página.</h2>
        <p> Por favor, vá para a <Link to="/">Home</Link></p>
        </div>

    )
}

export default Denied