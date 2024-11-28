import './App.css';
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import Contact from './pages/Contact.js';
import './component/header.jsx'
import Header from './component/header.jsx';
import ChatBotPage from './pages/ChatBot.js';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/chatbot" element={<ChatBotPage />} />
      </Routes>
    </div>
  );
}

export default App;
