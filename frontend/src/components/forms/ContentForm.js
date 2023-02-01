import { useState, useEffect } from 'react'
import formStyles from './Form.module.css'
import Input from './Input'
import TextArea from './TextArea'

function ContentForm({handleSubmit, conteudoData, btnText}){
    const [content, setContent] = useState(conteudoData || {})
    const [preview, setPreview] = useState([])   
     
    function onFileChange(e){
      setPreview(e.target.files[0])
      setContent({ ...content, [e.target.name]: e.target.files[0] })
         }
    function handleChange(e) {
      setContent({ ...content, [e.target.name]: e.target.value })
    }

               
         
    const submit = (e) => {
      e.preventDefault()
      handleSubmit(content)
      
   }
   
    
    return(
        
        <form enctype="multipart/form-data" onSubmit={submit} className={formStyles.form_container}>
          
          <Input
          text="Título do resumo"
          type="text"
          name="title"
          placeholder="Digite o nome"
          handleOnChange={handleChange}
          maxLength={50}
          value={content.title || '' }
        />
               
         <Input
          text="Categoria"
          type="text"
          name="category"
          placeholder="Digite uma categoria válida"
          handleOnChange={handleChange}
          maxLength={30}
         value={content.category || '' }
        />
      
         <TextArea
          text="Descrição"
          type="text"
          name="description"
          placeholder="Digite a descrição do resumo"
          value={content.description || ''}
          maxLength={200}
          handleOnChange={handleChange}         
        />
        <Input
          text="Resumo em formato PDF"
          type="file"
          name="document"
          handleOnChange={onFileChange}
          multiple={true}
          />
        <input type="submit" value={btnText} />
      </form>
    )
    
}

export default ContentForm