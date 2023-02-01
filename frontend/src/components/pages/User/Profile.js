import styles from './Profile.module.css'
import api from '../../../utils/api'
import Input from '../../forms/Input'
import { useState, useEffect, useContext } from 'react'
import formStyles from '../../forms/Form.module.css'
import Administrator from '../../layouts/Administrator'
import {Context} from '../../../context/UserContext'
import Denied from "../../layouts/Denied"

function Profile(){
    const { update } = useContext(Context)
    const [user, setUser] = useState({})
    const [token, authenticated] = useState(localStorage.getItem('token') || '')
    
    

    useEffect(() => {
        api
          .get('/users/checkuser', {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          })
          .then((response) => {
            setUser(response.data)
          })
      }, [token])


   function handleChange(e){
    setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault() 
        update(user)
      }
    
    return( 
        <section>      
          {authenticated ? (
      <>
        <div>
        <Administrator/>
       </div>
    <div>
        <h1 className={styles.titulo}>Pefil do administrador</h1>

    </div>
    
    <form onSubmit={handleSubmit} className={formStyles.form_container}>
    <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o seu nome"
          handleOnChange={handleChange}
          maxLength={36}
          value={user.name || ''}
        />
    <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o e-mail"
          handleOnChange={handleChange}
          maxLength={20}
          value={user.email || ''}
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
        <input type="submit" value="Editar" />
      </form>
      </>
              ):(  <>  
              <div>   
              <Denied/>
     </div>
     </>)}
    </section>
     )
}
export default Profile