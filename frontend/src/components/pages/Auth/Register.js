import {useState, useContext} from 'react' 
import Input from "../../forms/Input"
import styles from "../../forms/Form.module.css"
import { Link } from 'react-router-dom'
import {Context} from '../../../context/UserContext'

function Register (){
    const [user, setUser] = useState({})
    const {register} = useContext(Context)
    
  
    function handleChange(e) {
      setUser({ ...user, [e.target.name]: e.target.value })
    }
  
    function handleSubmit(e) {
      e.preventDefault()
      register(user)
    }
    return (
        
        <section className={styles.form_container}>
        <h1>Registrar</h1>
        <form onSubmit={handleSubmit}>
          <Input
            text="Nome"
            type="text"
            name="name"
            placeholder="Digite o seu nome"
            maxLength={36}
            handleOnChange={handleChange}
          />
           <Input
            text="E-mail"
            type="email"
            name="email"
            placeholder="Digite o seu e-mail"
            maxLength={20}
            handleOnChange={handleChange}
          />
            <Input
            text="CPF"
            type="text"
            name="cpf"
            placeholder="Digite o CPF"
            maxLength={12}
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
          <Input
            text="Confirmação de senha"
            type="password"
            name="confirmpassword"
            placeholder="Confirme a sua senha"
            maxLength={15}
            handleOnChange={handleChange}
          />
          <input type="submit" value="Cadastrar" />
        </form>
        <p>
          Já tem conta? <Link to="/login">Clique aqui.</Link>
        </p>
      </section>
    )
    }
    
    
    export default Register
    