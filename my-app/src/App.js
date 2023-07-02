import "./App.css";
import {BrowserRouter,Link,Routes,Route} from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import ProductScreen from "./components/ProductScreen";
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header>
        <Link to="/">Amazon</Link>
      </header>
      <main>
        <Routes>
          <Route path="/product/:slug" element={<ProductScreen/>}/>
          <Route path="/" element={<HomeScreen/>}></Route>
        </Routes>
        
      </main>
    </div>
    </BrowserRouter>
  );
}

export default App;
