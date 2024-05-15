'use client'
import React from 'react'

import { Card, CardHeader, CardBody, CardTitle, CardText } from "reactstrap";

import ListFair from './ListFair'

function index() {
  return (
    <Card>
    <CardHeader>
      <CardTitle>Create Awesome 🙌</CardTitle>
    </CardHeader>
    <CardBody>
      <ListFair />
     
    </CardBody>
  </Card>
  )
}

export default index
