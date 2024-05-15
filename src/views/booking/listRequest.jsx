// ** React Imports
import { Link } from 'react-router-dom'
import { Fragment } from 'react'


// ** Demo Components
// import KnowledgeBaseHeader from './KnowledgeBaseHeader'

// ** Reactstrap Imports
import { Row, Col, Card, CardBody, CardImg } from 'reactstrap'

// ** Styles
import '@styles/base/pages/page-knowledge-base.scss'

const ListRequest = ({ data, masterId }) => {
  // ** States

  // [searchTerm, setSearchTerm] = useState('')


  const Content = ({ item }) => (
    <Col className='kb-search-content' key={item.id} md='3' sm='6'>
      <Card>
        <Link to={`/bookingForm/${masterId}/${item.id}`}>
          <CardImg src={item.f_image} top width="10%"/>
          <CardBody className='text-center'>
            <h4>{item.f_name}</h4>
            {/* <p className='text-body mt-1 mb-0'>{item.desc}</p> */}
          </CardBody>
        </Link>
      </Card>
    </Col>
  )

  const renderContent = () => {
    return data.map(item => {
     
        return <Content key={item.id} item={item} />
     
    })
  }

  return (
    <Fragment>
      {/* <Breadcrumbs title='Knowledge Base' data={[{ title: 'Pages' }, { title: 'Knowledge Base' }]} /> */}
      {/* <KnowledgeBaseHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}
      {data !== null ? (
        <div id='knowledge-base-content'>
          <Row className='kb-search-content-info match-height'>{renderContent()}</Row>
        </div>
      ) : null}
    </Fragment>
  )
}

export default ListRequest
