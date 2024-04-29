import Container from 'react-bootstrap/Container'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { Link, useLocation } from 'react-router-dom'
const BreadCrumb = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter(x => x)
  console.log(location)
  console.log(pathnames)
  return (
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
        {pathnames.map((path, index) => (
          <Breadcrumb.Item active>
            {index !== pathnames.length - 1 ? (
              <Link to={`/${path}`}>{path}</Link>
            ) : (
              path
            )}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </Container>
  )
}

export default BreadCrumb
