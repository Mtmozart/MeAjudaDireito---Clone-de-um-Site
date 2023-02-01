import {Link} from 'react-router-dom'
import Logo from '../../assets/img/logo.png'
import styles from'./Navbar.module.css'
import {Context} from '../../context/UserContext'
import { useContext } from 'react'

function Navbar(){
    const {authenticated, logout} = useContext(Context)
    return(
        
        <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <img src={Logo} alt="Me ajuda direito"/>
            </div>
            <div className={styles.navbar_responsive}>
            <ul>
                <li>
                <Link to="/">Home</Link>
                </li>
                <li>
                <Link to="/categorias">Matérias</Link>
                </li>
                <li>
                <Link to="/cursos">Cursos</Link>
                </li>
                {authenticated ? (
                    <>
                    <li>
                        <Link onClick={logout}>Logout</Link>
                    </li>
                    <li>
                        <Link to='/Administrator'>Página do administrador</Link>
                    </li>
                    </>

                ):(  <></>)}
            </ul>
            </div>
        </nav>
    )
}

export default Navbar