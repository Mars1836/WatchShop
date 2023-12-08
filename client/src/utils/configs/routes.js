import Home from "../../pages/home/Home"
import Introduce from "../../pages/introduce/Intruduce"
import FemaleWatches from "../../pages/femalewatches/FemaleWatches"
import MaleWatches from "../../pages/malewatches/MaleWatches"
import Product from "../../pages/product/Product"
import Blog from "../../pages/blog/Blog"
import Contact from "../../pages/contact/Contact"
import Wishlist from "../../pages/wishlist/Wishlist"
import Cart from "../../pages/cart/Cart"
import MyAccount from "../../pages/myaccount/MyAccount"
import Login from "../../pages/login/Login"
import Register from "../../pages/register/Register"
import OrderForm from "../../pages/order_form/OrderForm"
import OrderSuccess from "../../pages/order_success/OrderSuccess"
import TestPage from "../../pages/test/Test"
const routes = {
  test: { path: "/test", component: <TestPage></TestPage> },
  home: { path: "/", component: <Home /> },
  introduce: { path: "/gioi-thieu", component: <Introduce /> },
  maleWatches: { path: "/dong-ho-nam", component: <MaleWatches /> },
  femaleWatches: { path: "/dong-ho-nu", component: <FemaleWatches /> },
  blog: { path: "/blogs", component: <Blog /> },
  contact: { path: "/lien-he", component: <Contact></Contact> },
  product: { path: "/san-pham/:id", component: <Product /> },
  wishlist: { path: "/wishlist", component: <Wishlist></Wishlist> },
  cart: { path: "/gio-hang", component: <Cart></Cart> },
  myAccount: { path: "/my-account", component: <MyAccount></MyAccount> },
  login: { path: "/login", component: <Login></Login> },
  register: { path: "/register", component: <Register></Register> },
  order_form: { path: "/order-form", component: <OrderForm></OrderForm> },
  order_success: {
    path: "/order/success",
    component: <OrderSuccess></OrderSuccess>,
  },
}
export default routes
