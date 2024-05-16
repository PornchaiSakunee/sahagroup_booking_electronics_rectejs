// ** Reactstrap Imports
import { Card, CardBody, CardText, Row, Col, Table } from 'reactstrap'
import { parseISO, format } from 'date-fns'
import FormatNumber from '../../@core/components/format/FormatNumber'

const ViewOrderList = ({ data }) => {
    return data !== null ? (
        <Card className='invoice-preview-card'>
            <CardBody className='invoice-padding pb-0'>
                {/* Header */}
                <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
                    <div>
                        <div className='logo-wrapper'>
                           
                            <h3 className='text-primary invoice-logo'>{data.f_name}</h3>
                        </div>
                     
                        <CardText className='mb-0'>บูธ : {data.tb_form_request_booth.map((i, k) => (
                            <span key={k} >
                                {i.tb_booth.boothname} &nbsp;
                            </span>
                        ))}</CardText>
                    </div>
                    <div className='mt-md-0 mt-2'>
                        <h4 className='invoice-title'>
                        เลขที่ใบจอง <span className='invoice-number'>#{data.id}</span>
                        </h4>
                        <div className='invoice-date-wrapper'>
                            <p className='invoice-date'>{`วันที่จอง: ${format(parseISO(data.createdAt), 'dd-MM-yyyy HH:mm:ss')}`}</p>
                        </div>
                        {/* <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>Due Date:</p>
              <p className='invoice-date'>{data.invoice.dueDate}</p>
            </div> */}
                    </div>
                </div>
                {/* /Header */}
            </CardBody>

            <hr className='invoice-spacing' />

            {/* Address and Contact */}
            <CardBody className='invoice-padding pt-0'>
                <Row className='invoice-spacing'>
                    <Col className='p-0' xl='8'>
                        <h6 className='mb-2'>ที่อยู่เปิดบิล:</h6>
                        <h6 className='mb-25'>{data.address_open.user.customer.cus_company}</h6>
                        <CardText className='mb-25'>{data.address_open.full_address}</CardText>
                        <CardText className='mb-25'> <span>ชื่อผู้ติดต่อ : {data.address_open.contact_name}</span> <br /><span>เบอร์โทรผู้ติดต่อ : {data.address_open.contact_number}</span></CardText>
                        {/* <CardText className='mb-25'>{data.invoice.client.address}</CardText>
            <CardText className='mb-25'>{data.invoice.client.contact}</CardText>
            <CardText className='mb-0'>{data.invoice.client.companyEmail}</CardText> */}
                    </Col>
                    {/* <Col className='p-0 mt-xl-0 mt-2' xl='4'>
            <h6 className='mb-2'>Payment Details:</h6>
            <table>
              <tbody>
                <tr>
                  <td className='pe-1'>Total Due:</td>
                  <td>
                    <span className='fw-bold'>{data.paymentDetails.totalDue}</span>
                  </td>
                </tr>
                <tr>
                  <td className='pe-1'>Bank name:</td>
                  <td>{data.paymentDetails.bankName}</td>
                </tr>
                <tr>
                  <td className='pe-1'>Country:</td>
                  <td>{data.paymentDetails.country}</td>
                </tr>
                <tr>
                  <td className='pe-1'>IBAN:</td>
                  <td>{data.paymentDetails.iban}</td>
                </tr>
                <tr>
                  <td className='pe-1'>SWIFT code:</td>
                  <td>{data.paymentDetails.swiftCode}</td>
                </tr>
              </tbody>
            </table>
          </Col> */}
                </Row>
            </CardBody>
            {/* /Address and Contact */}

            {/* Invoice Description */}
            <Table responsive>
                <thead className='border-bs-0'>
                    <tr>
                        <th className='py-1'>รูป
                        </th>
                        <th className='py-1'>ชื่ออุปกรณ์
                        </th>
                        <th className='py-1'>รายค่าต่อหน่อย
                        </th>
                        {data.tb_date_use.map((i, k) => (
                            <th key={k} className='py-1'>
                                {i.date_use_title} <br />
                                {i.date_use_startdate}
                            </th>
                        ))}

                        <th className='py-1'>
                            จำนวนเงิน
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.tb_form_request_equipment.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <img  src={item.tb_equipment_fair.tb_equipment.eq_photo} height={80} />
                            </td>
                            <td style={{ width: '40%' }}>{item.tb_equipment_fair.tb_equipment.eq_name}</td>
                            <td style={{ width: '15%' }}>
                                <FormatNumber number={parseFloat(item.freq_total_price) / parseFloat(item.freq_quantity)} />
                            </td>
                            {data.tb_date_use.map((i, k) => (
                                <td style={{ width: '15%', textAlign: 'center' }} key={k}>
                                    {i.id === item.tb_date_use.id ? item.freq_quantity : '-'}
                                </td>
                            ))}

                            <td style={{ width: '15%', textAlign: 'right' }}>
                                <FormatNumber number={parseFloat(item.freq_total_price)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {/* /Invoice Description */}

            {/* Total & Sales Person */}

            <Row className='invoice-sales-total-wrapper'>
               
                <Col className='d-flex justify-content-end ' style={{padding:30}} >
                    <div className='invoice-total-wrapper'>
                        <div className='invoice-total-item'>
                            <span className='invoice-total-title'>รวมเงิน: </span>
                            <span className='invoice-total-amount'> <FormatNumber number={parseFloat(data.f_sub_total)} /></span>
                        </div>
                        <div className='invoice-total-item'>
                            <span className='invoice-total-title'>ภาษีมูลค่าเพิ่ม 7%: </span>
                            <span className='invoice-total-amount'> <FormatNumber number={parseFloat(data.f_sub_vat)} /></span>
                        </div>
                        <div className='invoice-total-item'>
                            <span className='invoice-date'>หัก ณ ที่จ่าย 3%: </span>
                            <span className='invoice-total-amount'> <FormatNumber number={parseFloat(data.f_sub_withholding_tax)} /></span>
                        </div>
                        <hr className='my-50' />
                        <div className='invoice-total-item'>
                            <span className='invoice-total-title'>จำนวนเงินทั้งสิ้น: </span>
                            <span className='invoice-total-amount'><FormatNumber number={parseFloat(data.f_total)} /></span>
                        </div>
                    </div>
                </Col>
            </Row>

            {/* /Total & Sales Person */}

            <hr className='invoice-spacing' />

            {/* Invoice Note */}
            {/* <CardBody className='invoice-padding pt-0'>
        <Row>
          <Col sm='12'>
            <span className='fw-bold'>Note: </span>
            <span>
              It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance
              projects. Thank You!
            </span>
          </Col>
        </Row>
      </CardBody> */}
            {/* /Invoice Note */}
        </Card>
    ) : null
}

export default ViewOrderList
