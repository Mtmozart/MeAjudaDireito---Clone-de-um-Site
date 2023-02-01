import {BrowserRouter as  Router, Routes, Route } from "react-router-dom"


/*Import components*/
import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'
import Container from './components/layouts/Container'
import Message from './components/layouts/Message'

/*Imports pages*/
import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register'
import Home from './components/pages/Home'
import Administrator from "./components/pages/User/Administrator"
import Profile from './components/pages/User/Profile'
import Content from "./components/pages/User/Content"
import ContentAdd from "./components/pages/User/ContentAdd"
import ContentEdit from "./components/pages/User/ContentEdit"
import CoursesAdm from './components/pages/User/CoursesAdm'
import CoursesAdd from "./components/pages/User/CourseAdd"
import CourseEdit from "./components/pages/User/CoursesEdit"
import Courses from "./components/pages/Public/Courses"
import CourseDetails from "./components/pages/Public/CourseDetails"
import ContentsPublic from "./components/pages/Public/Contents"
import CategoryAdd from "./components/pages/User/CategoryAdd"
import Category from "./components/pages/User/Category"
import CategoryEdit from "./components/pages/User/CategoryEdit"
import AllCategories from "./components/pages/Public/AllCategories"
import CategoryPublic from "./components/pages/Public/Category"
import PrivacyPolicy from "./components/pages/Public/PrivacyPolicy"
import PageNotFound from "./components/pages/Public/PageNotFound"
import ImagesAutorization from "./components/pages/Public/ImagesAutorization"
import Warning from "./components/layouts/Warning"


/* contexts */
import { UserProvider } from './context/UserContext'

function App() {
  return (
   <Router>
         <UserProvider>
        <Navbar/>
        <Warning/> 
        <Message/>
        <Container>
     
            <Routes>
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/register" element={<Register/>} />
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/administrator" element={<Administrator/>} />
            <Route exact path="/perfil" element={<Profile/>} />
            <Route exact path="/materias" element={<Content/>} />
            <Route exact path="/materias_adicionar" element={<ContentAdd/>} />
            <Route exact path="/materias/edit/:id" element={<ContentEdit/>} />
            <Route exact path="/cursos_administracao" element={<CoursesAdm/>} />
            <Route exact path="/cursos_inserir" element={<CoursesAdd/>} />
            <Route exact path="/curso/edit/:id" element={<CourseEdit/>} />
            <Route exact path="/cursos" element={<Courses/>} />
            <Route exact path="/cursos/details/:id" element={<CourseDetails/>} />
            <Route exact path="/conteudo/:id" element={<ContentsPublic/>} />
            <Route exact path="/categoria/adicionar" element={<CategoryAdd/>}/>
            <Route exact path="/categoria/categorias" element={<Category/>} />
            <Route exact path="/categoria/editar/:id" element={<CategoryEdit/>} />
            <Route exact path="/categorias" element={<AllCategories/>} />
            <Route exact path="/categorias/categoria/:category" element={<CategoryPublic/>} />
            <Route exact path="/politica_privacidade" element={<PrivacyPolicy/>} />
            <Route exact path="/direitos_autorais" element={<ImagesAutorization/>} />            
            <Route exact path="*" element={<PageNotFound/>} />
            </Routes>  
          </Container>         
          <Footer/>         
     </UserProvider>
   </Router>
  );
}

export default App;
