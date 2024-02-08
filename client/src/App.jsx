// Import npm packages
import { Routes, Route } from 'react-router-dom'; 


// Import pages 
import Home from './pages/Home';
import ProductsMenu from './pages/product/ProductsMenu';
import SaleProducts from './pages/product/SaleProduct';
import NotFound from './pages/NotFound';
import AddProduct from './pages/product/AddProduct';
import EditProduct from './pages/product/EditProduct';
import ProductDetail from './pages/product/ProductDetail';




// Import components
import Layout from './components/layout/Layout';
import Dashboard from './pages/auth/Dashboard';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import PrivateRoutes from './components/layout/PrivateRoutes';


function App() {
  return (
    
           
        
          <Routes>
            <Route path="/" element={<Layout />} >
              <Route index element={<Home/>} />
              <Route path ="store">
                <Route path="products" element={<ProductsMenu />} />
                <Route path="sale" element={<SaleProducts />} />
                
                <Route path="product"> 
                
                  <Route path=":id" element={<ProductDetail/>} />
                    <Route element={<PrivateRoutes />} >    
                      <Route path="add" element={<AddProduct />} />
                      <Route path="edit/:id" element={<EditProduct />} />
                    </Route>                
                </Route>
              </Route>
              
              <Route path="*" element={<NotFound/>} />
              {/* AUTH */}
              <Route element={<PrivateRoutes />} >
                <Route path="Dashboard" element={<Dashboard/>} />
              </Route>
              <Route path="Login" element={<Login/>} />
              <Route path="Signup" element={<Signup/>} />
            </Route>
          </Routes>

        
        
   
  );
}

export default App;