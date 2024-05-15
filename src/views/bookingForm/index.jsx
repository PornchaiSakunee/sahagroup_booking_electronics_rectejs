import { Fragment, useEffect, useState } from 'react'
// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardText, CardLink, CardSubtitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'
import Select, { components } from 'react-select' // eslint-disable-line
import { Link, useParams, useNavigate } from 'react-router-dom'
import Address from './Address'
import ListItem from './ListItem'
import { getFormItem, getAddress, getTrans, AddForm } from '../../utility/apiCall'
import { isAfter, format } from 'date-fns'
// ** Utils
import { selectThemeColors } from '@utils'



const MultipleColumnForm = () => {

  const { masterId, id } = useParams()

  const navigate = useNavigate()


  const [DataDevice, setDevice] = useState([])
  const [selectedOption, setSelectedOption] = useState([])
  const [bootDefault, setBootDefault] = useState([])

  const [DataForm, setDataForm] = useState({ tb_date_use: [] })

  const [DataAdr, setDataAdr] = useState([])
  const [DataTrans, setDataTrans] = useState([])
  const [DataBoot, setDataBoot] = useState([])

  const [FormAddress, setFormAddress] = useState(null)

  const [ListFooter, setListFooter] = useState({
    f_sub_total: 0,
    f_sub_vat: 0,
    f_sub_withholding_tax: 0,
    f_total: 0
  })

  useEffect(() => {
    console.log('dddd', DataDevice)
  }, [DataDevice])

  useEffect(() => {
    getFormItem_()
  }, [])

  async function onsubmit() {
    // console.log("df",bootDefault);

    const mapBooot = await bootDefault.map(i => {

      return { tb_booth_id: i.value }
    })

    let equest_equipment = []

    for (let index = 0; index < DataDevice.length; index++) {
      const itemD = DataDevice[index]

      const filterData = itemD.tb_date_use.filter(i => i.num > 0)

      const itemInDay = filterData.map(i => ({
        freq_quantity: i.num,
        freq_total_price: itemD.total_price,
        tb_equipment_fair_id: itemD.id,
        tb_date_use_id: i.id
      }))

      equest_equipment = [...equest_equipment, ...itemInDay]
    }

    const formData = {
      master_id: masterId,
      trans_id: DataTrans.sahagroupfair_trans[0].etag,
      tb_form_request: {
        ...ListFooter,
        f_address_open: FormAddress,
        f_address_send: FormAddress,
        tb_form_request_equipment: equest_equipment,
        tb_form_request_booth: mapBooot,
        f_delete: 'N'
      }
    }

    if (FormAddress === null) {
      alert('กรุณาเลือกที่อยู่ในการเปิดบิล')
    }

    //  else if (mapBooot.length === 0) {
    //   alert('กรุณาเลือกบูธ')
    // }
    else if (equest_equipment.length === 0) {
      alert('กรุณากรอก จำนวนอุปกรณ์อย่างน้อย 1 รายการ')
    } else {
      if (confirm('ยืนยันการจองอุปกรณ์')) {
        console.log('formData', formData)

        const addFormData = await AddForm(formData, id)

        if (addFormData.status) {
          navigate('/order-history')
        }
      }
    }
  }

  async function getFormItem_() {
    // parses JSON response into native JavaScript objects

    const dataForm = await getFormItem(masterId, id)
    const ddr = await getAddress()
    const dataTrans_ = await getTrans(masterId)

    setDataForm(dataForm)
    setDataAdr(ddr)
    setDataTrans(dataTrans_)

    const databoot_ = dataTrans_.sahagroupfair_trans[0].tb_booth.map(i => ({ value: i.id, label: i.boothname }))

    // console.log('databoot_', databoot_)

    setDataBoot(databoot_)

    // console.log('fff', dataForm)

    const today = new Date()

    const filInput = dataForm.tb_date_use.map(i => ({ id: i.id, num: null }))

    console.log('filInput', filInput)

    if (typeof dataForm.tb_equipment_fair !== 'undefined') {
      const mapDataItem = dataForm.tb_equipment_fair.map(i => {
        const deadline = new Date(i.eqf_price_special_date)

        const price_unit = isAfter(today, deadline) ? i.eqf_price_normal + 1 : i.eqf_price_special

        return { ...i, device_price_unit: price_unit, total_price: 0, tb_date_use: filInput }
      })

      setDevice([...mapDataItem])
    }
  }

  const handleOptionChange = prop => {
    if (typeof prop === 'string') {
      setSelectedOption(prop)
    } else {
      setSelectedOption(prop.target.value)
    }
  }

  const onAdrAction = async prop => {
    console.log(prop)

    if (prop === true) {
      const ddr = await getAddress()

      setDataAdr(ddr)
    }
  }

  if (DataDevice.length === 0) {
    return <span>*** กรุณาจองบูธก่อน</span>
  }
  return (

    <Fragment>

      <Address dataAdr={DataAdr} setDataAdr={setDataAdr} setAddress={setFormAddress} onAction={onAdrAction} />

      <Card>
        <CardHeader>
          <CardTitle tag='h4'>รายการอุปกรณ์</CardTitle>
        </CardHeader>

        <CardBody>
          <Form>
            <Row>

              <Col md='12' sm='12' className='mb-1'>
                <Label className='form-label' for='nameMulti'>
                  บูธ
                </Label>
                <Select
                  isClearable={false}
                  theme={selectThemeColors}
                  defaultValue={bootDefault}
                  isMulti
                  name='colors'
                  options={DataBoot}
                  className='react-select'
                  classNamePrefix='select'
                  onChange={(value) => setBootDefault(value)}
                />
              </Col>
              <Col sm='12'>
                <ListItem itemDevice={DataDevice}
                  tbHead={DataForm.tb_date_use}
                  setitemdevice={setDevice}
                  setFooter={setListFooter} />
              </Col>

              <Col sm='12'>
                <div className='d-flex'>
                  <Button className='me-1' color='primary' type='button' onClick={() => onsubmit()}>
                    จอง
                  </Button>
                  {/* <Button outline color='secondary' type='reset'>
                    Reset
                  </Button> */}
                </div>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  )
}
export default MultipleColumnForm
