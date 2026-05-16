import React from "react";
import { BrowserRouter, Route , Routes} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage.tsx"
import LoginPage from "./pages/LoginPage.tsx";
import Layout from "./components/Layout.tsx"; 
import AuthRequired from "./components/AuthRequired.tsx";
import NotesPage from "./pages/User/NotesPage.tsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}> {/*unproteced layouts*/}
            
            <Route path="register" element={<RegisterPage/>}/>
            <Route path="login" element={<LoginPage/>}/> 
          </Route>

        <Route element={<AuthRequired/>}>
          <Route path="user" element={<NotesPage/>} />
        </Route>


        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App