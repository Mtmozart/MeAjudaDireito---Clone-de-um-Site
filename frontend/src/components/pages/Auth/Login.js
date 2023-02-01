import {useState, useContext} from 'react'
import Input from '../../forms/Input'
import styles from '../../forms/Form.module.css'
import { Context } from '../../../context/UserContext'
function Login(){
    const [user, setUser] = useState({})
    const {login} = useContext(Context)
   function  handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
    
   }
   function handleSubmit(e){
    e.preventDefault()
    login(user)
   }

    return(
        <section className={styles.form_container}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <Input
                text="E-mail"
                type="email"
                name="email"
                placeholder="Digite o seu e-mail"
                maxLength={20}
                handleOnChange={handleChange}
                
                />
                <Input
                text="Senha"
                type="password"
                name="password"
                placeholder="Digite a sua senha"
                maxLength={15}
                handleOnChange={handleChange}
                />
                <input type="submit" value="Entrar" />
            </form>
        </section>
    )
}

export default Login