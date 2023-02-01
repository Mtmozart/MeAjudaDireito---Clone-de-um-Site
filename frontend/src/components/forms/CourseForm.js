import { useState } from 'react'
import formStyles from './Form.module.css'
import Input from './Input'
import Select from './Select'
import TextArea from './TextArea'
import RoundedImage from './RoundendImage'

function CourseForm({handleSubmit, cursoData, btnText}){
    const [curso, setCurso] = useState(cursoData || {})
    const [preview, setPreview] = useState()
    const platform = ['Hotmart', 'Eduzz', 'Outras']
    const category = ['Constitucional', 'Civil', 'Processo Civil', 'Penal', 'Processo Penal', 'Advocacia', 'Capacitação Profissinal', 'Direito Trabalhista', 'Direito Previdenciário','Outros']
    
    function onFileChange(e){
      setPreview(e.target.files[0])
      setCurso({ ...curso, [e.target.name]: e.target.files[0] })
         }
    function handleChange(e) {
        setCurso({ ...curso, [e.target.name]: e.target.value })
    }

    function handleCategory(e) {
      setCurso({
          ...curso,
          category: e.target.options[e.target.selectedIndex].text
        })
      }

      function handlePlataform(e) {
        setCurso({
          ...curso,
          platform: e.target.options[e.target.selectedIndex].text
        })
      }               
         
    const submit = (e) => {
      e.preventDefault()
      handleSubmit(curso)
      
    }
   
    
    return(
        
        <form enctype="multipart/form-data" onSubmit={submit} className={formStyles.form_container}>
        <div>
      {(curso.image || preview) && (
         <div key={curso.id} >
         <RoundedImage
           src={
            preview
            ? URL.createObjectURL(preview)
            :`${process.env.REACT_APP_API}images/${curso.image}`}
           alt={curso.name}
           width="px75"
         />
         </div>
      )}
      
        </div>
      
        <Input
          text="Nome do Curso"
          type="text"
          name="name"
          placeholder="Digite o nome"
          handleOnChange={handleChange}
          maxLength={40}
         // value={curso.name || ''}
        />
        <Input
          text="Autor"
          type="text"
          name="author"
          placeholder="Digite o nomedo autor"
          handleOnChange={handleChange}
          maxLength={50}
          //value={curso.author || ''}
        />
       
         <Input
          text="Valor do curso"
          type="number"
          name="price"
          placeholder="Digite o valor do curso"
          handleOnChange={handleChange}
          maxLength={10}
          //value={curso.price || ''}
       
        />
        <Input
          text="Link"
          type="text"
          name="link"
          placeholder="Digite o link do curso"
        //  value={curso.link || ''}
          maxLength={100}
          handleOnChange={handleChange}
        />          
          <Select
          name="platform"
          text="Selecione a categoria"
          options={platform}
          handleOnChange={handlePlataform}
          value={curso.platform || ''}
        />
        <Select
          name="category"
          text="Selecione a categoria"
          options={category}
          handleOnChange={handleCategory}
         // value={curso.category || ''}
        />
         <TextArea
          text="Descrição"
          type="text"
          name="description"
          placeholder="Digite a descrição do curso"
          maxLength={200}
         // value={curso.description || ''}
          handleOnChange={handleChange}
        />
          <Input
          text="Imagens do Curso"
          type="file"
          name="image"
          handleOnChange={onFileChange}
          />
        <input type="submit" value={btnText} />
      </form>
    )
    
}

export default CourseForm