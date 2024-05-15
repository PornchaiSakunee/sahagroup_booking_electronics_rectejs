// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Card, Input, Modal, Button, CardBody, CardText, CardTitle, ModalBody, ModalHeader } from 'reactstrap'

// ** Custom Component
// import PricingCard from '@src/views/pages/pricing/PricingCards'

// ** Third Party Components
// import axios from 'axios'
// import { BarChart2 } from 'react-feather'

// ** Styles
import '@styles/base/pages/page-pricing.scss'

import  ViewOrderList  from "./viewOrderList"

const ViewOrder = ({ open, setOpen, dataOrder }) => {
  // ** States
  // const [show, setShow] = useState(false)

// console.log(dataOrder)

  return (
    <Fragment>

      <Modal isOpen={open} toggle={() => setOpen(!open)} className=' modal-xl'>
        <ModalHeader className='bg-transparent' toggle={() => setOpen(!open)}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5'>
           
        <ViewOrderList data={dataOrder}/>
         
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default ViewOrder
