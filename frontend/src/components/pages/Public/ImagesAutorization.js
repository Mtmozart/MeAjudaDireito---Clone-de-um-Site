import styles from "./PrivacyPolicy.module.css"
import {Link} from "react-router-dom"
function ImagesAutorization(){
    return(
        <section className={styles.container}>
            <h1>Direitos autorais das imagens da home.</h1>
            <ul>
                <li>  <Link to="https://www.freepik.com/free-vector/female-student-listening-webinar-online_9175118.htm">Female student listening webinar online</Link>        
                </li>
                <li>  <Link to="https://www.freepik.com/free-vector/girl-writing-journal-diary_9649836.htm">Girl writing in journal or diary </Link>        
                </li>
            </ul>
        </section>
    )
}
export default ImagesAutorization