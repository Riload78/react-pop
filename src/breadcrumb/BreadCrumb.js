import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { Link, useLocation } from 'react-router-dom'
const BreadCrumb = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter(x => x)
  console.log(location)
  console.log(pathnames)
  return (
    <Container className='breadcrumb-wrapper'>
      <Row>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to='/'>Home</Link>
          </Breadcrumb.Item>
          {pathnames.map((path, index) => (
            <Breadcrumb.Item key={path} active={index === pathnames.length - 1}>
              {index !== pathnames.length - 1 ? (
                <Link to={`/${path}`}>{path}</Link>
              ) : (
                path
              )}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </Row>
    </Container>
  )
}

export default BreadCrumb
