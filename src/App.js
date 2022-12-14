import { Route, Routes } from 'react-router-dom';
import './App.css';
import Theory from './page/Class/Theory';
import Counter from './page/counter_app/Counter';
import Home from './page/home/Home';
import Navbar from './page/navbar/Navbar';
import TodosApp from './page/todos_App/TodosApp';

function App() {

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/theory' element={<Theory />}></Route>
        <Route path='/counter-app' element={<Counter />}></Route>
        <Route path='/todos' element={<TodosApp />}></Route>
      </Routes>
    </div>
  );
}

export default App;
