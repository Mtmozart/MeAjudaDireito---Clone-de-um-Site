import styles from './Home.module.css'
import Estudos from '../../assets/img/estudos.png'
import Cursos from '../../assets/img/cursos.png'
import {Link} from 'react-router-dom'
function Home(){

    return(
        <section className={styles.father}>
            <div className={styles.conteudo_capa}>
            <div className={styles.div_capa}>
                            <h1 className={styles.titulo}>Me ajuda direito</h1>
                            <p className={styles.p}>Disponibilizamos cursos e resumos para ajudar você a estudar e se qualificar para o mercado de trabalho.</p><br></br>
                         <div className={styles.botao_div}>
                             <Link to="/categorias" className={styles.Link}>Conteúdos</Link>
                         </div>
                   </div>

            </div>      

             <div id="conteudo" className={styles.div_conteudo}>
                <div className={styles.div_conteudo_divs}>
                    <h2>Resumos</h2>
                    <p>Estamos a criar resumos que podem ajudar você com seus estudos no direito ou em outras questões como estágios. E o melhor, são gratuitos.</p>
                    <div className={styles.botao_div}>
                            <Link to="/categorias" className={styles.Link}>Confira!</Link>
                    </div>
                </div>
                <div className={styles.div_conteudo_divs_flex}>
                   <img src={Estudos} alt="Me ajuda direito"/>
                </div>               
            </div>   

            <div id="conteudo" className={styles.div_conteudo2}>
             
                <div className={styles.div_conteudo_divs_flex}>
                   <img src={Cursos} alt="Me ajuda direito"/>
                </div>     
                <div className={styles.div_conteudo_divs}>
                    <h2>Cursos</h2>
                    <p>Selecionamos alguns cursos que podem ajudar a melhorar o seu currículo, bem como agregar conhecimento e se preparar para o mercado de trabalho.</p>
                    <div className={styles.botao_div}>
                            <Link to="/categorias" className={styles.Link}>Confira!</Link>
                    </div>
                </div>          
            </div>  
               
            
            
        </section>         
       
    )
}

export default Home