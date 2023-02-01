import {Link} from 'react-router-dom'
import styles from './Administrator.module.css'
import {Context} from '../../context/UserContext'
import { useContext } from 'react'

function Administrator(){
    const {authenticated} = useContext(Context)
    return(
    
        <section>
             {authenticated ? (
                    <>
                    <div  className={styles.administrator}>
                <div>
                    <ul>
                        <li>
                            <Link to='/perfil'>Perfil</Link>
                        </li>
                        <li>
                            <Link to='/materias'>Materias</Link>
                        </li>
                        <li>
                            <Link to='/cursos_administracao'>Cursos</Link>
                        </li>
                        <li>
                            <Link to='/administrator'>Administração</Link>
                        </li>
                    </ul>   
                </div>
                </div>
                </>
                ):(  <></>)}
              
            <div>
                

            </div>
           

        </section>
       
    )
}
export default Administrator