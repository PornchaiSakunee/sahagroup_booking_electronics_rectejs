// React Imports
import { useState, useEffect, Fragment } from 'react'


import { Card, CardHeader, CardTitle, CardText, CardLink, CardSubtitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'

import { delAddress } from '../../utility/apiCall'


import AddEditAddress from './AddEditAddress'

const Address = ({ dataAdr, setDataAdr, setAddress, onAction }) => {
  // Vars

  // States
  const [selectedOption, setSelectedOption] = useState(null)
  // const [selectedSpeed, setSelectedSpeed] = useState('standard')

  // const [mapAdressItem, setAddressItem] = useState([])

  const [dataUpdate, setDataUpdate] = useState(null)

  const [OpenAdr, setOpenAdr] = useState(false)


  const onDelAdr = async id => {
    if (confirm('ยืนยันลบที่อยู่')) {
      const stDelAdr = await delAddress(id)

      if (stDelAdr.status) {
        const dataDel = dataAdr.filter(i => i.id !== id)

        setDataAdr(dataDel)
        alert(stDelAdr.msg)
      } else {
        alert(stDelAdr.msg)
      }
    }
  }

  const onUpdateAdr = async data => {
    // const stDelAdr = await delAddress(id)
    await setOpenAdr(true)
    // await setOpenAdr(false)
    setDataUpdate(data)
  }

  useEffect(() => {
    if (dataAdr.length > 0 && selectedOption === null) {

      setSelectedOption(dataAdr[0].id)
      setAddress(dataAdr[0].id)
    }


  }, [dataAdr])

  const handleOptionChange = prop => {


    setSelectedOption(parseInt(prop))
    setAddress(parseInt(prop))


  }


  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>ที่อยู่ในการเปิดบิล</CardTitle>
        </CardHeader>

        <CardBody>

          <Row>
            {dataAdr.map((item, index) => (
              <Col md='6' sm='6' className='mb-1' key={index}>
                <Card className='bg-transparent border-primary shadow-none' >
                  <CardBody>
                    <CardTitle tag='h4'>
                      <Input type='radio' name="address" value={item.id} checked={selectedOption === item.id} onClick={(e) => handleOptionChange(e.target.value)} id={`adr${item.id}`} />
                      <Label className='form-check-label' for={`adr${item.id}`}>
                        &nbsp;{item.user.customer.cus_company}
                      </Label></CardTitle>
                    {/* <CardSubtitle className='text-muted mb-1'>Support card subtitle</CardSubtitle> */}
                    <CardText >
                      {item.full_address}

                    </CardText>
                    <CardText >  <span>ชื่อผู้ติดต่อ : {item.contact_name}</span> <br /><span>เบอร์โทรผู้ติดต่อ : {item.contact_number}</span></CardText>

                    <CardLink href='javascript:void(0);' onClick={() => onUpdateAdr(item)}>
                      แก้ไข
                    </CardLink>
                    <CardLink href='javascript:void(0);' onClick={() => onDelAdr(item.id)}>
                      ลบ
                    </CardLink>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>


          <Row>
            <Col md='6' sm='12' className='mb-1' >
              <AddEditAddress onAction={onAction} dataUpdate={dataUpdate} setDataUpdate={setDataUpdate} show={OpenAdr} setShow={setOpenAdr} />
            </Col>
          </Row>

        </CardBody>
      </Card>
    </Fragment>
  )
}

export default Address
