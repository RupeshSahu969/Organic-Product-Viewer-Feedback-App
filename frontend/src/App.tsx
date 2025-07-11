import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import ProductUpload from './pages/ProductUpload';

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/products" element={<ProductUpload />} />
    </Routes>
  </>
);

export default App;
