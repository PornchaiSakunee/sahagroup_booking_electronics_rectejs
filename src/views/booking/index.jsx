
import React, { useEffect, useState } from 'react'

// import Card from '@mui/material/Card'
// import CardHeader from '@mui/material/CardHeader'

// import ListBooking from './ListBooking'
// import ListRequest from './listRequest'

import { Card, CardHeader, CardBody, CardTitle, CardText } from "reactstrap"

import ListRequest from './listRequest'

import { getForm} from '../../utility/apiCall'

const Index = () => {
  const [DataRequest, setDataRequest] = useState([])
  const [masterId, setmasterId] = useState('e7e5ebdc35ef02f1b4a24b54eab06212')

  useEffect(() => {
    async function getData() {
      const dataForm = await getForm(masterId)

      setDataRequest(dataForm)
    }

    getData()
  }, [])

  return (

    
      <ListRequest  data={DataRequest} masterId={masterId}/>
  

  )
}

export default Index
