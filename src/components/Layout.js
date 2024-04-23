import Footer from './Footer'
import Header from './Header'
// Revisar cuando añada del Context
const Layout = ({title, children}) => {
  return (
    <>
      <Header />
      <main>
        <h1>{title}</h1>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
