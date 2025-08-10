import { BrowserRouter } from "react-router-dom";

import {  Contact, Intro, Navbar,  StarsCanvas } from "./components";


const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Intro /> 
        </div>
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
   
  )
}

export default App
