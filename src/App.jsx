import { ToastContainer } from 'react-toastify'
import { Cars } from './components/Cars'
import { Header } from './components/Header'

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
      <Header />
      <Cars />
    </>
  )
}

export default App
