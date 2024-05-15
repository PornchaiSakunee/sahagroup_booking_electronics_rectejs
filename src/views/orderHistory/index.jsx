
// ** React Imports
import { Fragment, useEffect } from 'react'

// ** Reactstrap Imports
import { CardTitle, CardHeader, CardBody, CardText, Card } from 'reactstrap'
// Component Imports
import ListOrder from './ListOrder'

// ** Third Party Components
import prism from 'prismjs'


// ** Custom Components
// import Card from '@components/card-snippet'
// import Breadcrumbs from '@components/breadcrumbs'

const Index = () => {
  useEffect(() => {
    prism.highlightAll()
  })

  return (

    <Card >
      <CardHeader>
        <CardTitle>ประวัติการจอง</CardTitle>
      </CardHeader>
      <CardBody>
        <ListOrder />
      </CardBody>
    </Card>

  )
}

export default Index

