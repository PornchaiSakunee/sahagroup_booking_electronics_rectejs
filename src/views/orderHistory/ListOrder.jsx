// ** React Imports
// import { Link } from 'react-router-dom'
import { useState, useEffect, Fragment } from 'react'

// ** Table Columns
// import { columns } from './columns'

// ** Third Party Components
import ReactPaginate from 'react-paginate'

import DataTable from 'react-data-table-component'

// ** Reactstrap Imports
import { Button, Input, Row, Col, Card, UncontrolledTooltip } from 'reactstrap'
import * as pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
import { font } from '../../assets/fonts/THSarabun'

import _ from 'lodash'


// ** Custom Components
import Avatar from '@components/avatar'


// ** Store & Actions
// import { getData } from '../store'
// import { useDispatch, useSelector } from 'react-redux'

// import { getFormHistory, cancelForm, delForm } from '../../utility/apiCall'
import { getFormHistory } from '../../utility/apiCall'
import FormatNumber from '../../@core/components/format/FormatNumber'
import ViewOrder from './viewOrder'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

import {
  Eye,
  Send,
  Edit,
  Copy,
  Save,
  Info,
  Trash,
  PieChart,
  Download,
  TrendingUp,
  CheckCircle,
  MoreVertical,
  ArrowDownCircle,
  XCircle,
  ChevronDown
} from 'react-feather'

import { parseISO, format } from 'date-fns'

const CustomHeader = ({ handleFilter, value, handleStatusValue, statusValue, handlePerPage, rowsPerPage, fairData, fairFilter, setfairFilter }) => {

  return (
    <div className='invoice-list-table-header w-100 py-2'>
      <Row>
        <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
          <div className='d-flex align-items-center me-2'>
            <label htmlFor='rows-per-page'>Show</label>
            <Input
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
              className='form-control ms-50 pe-3'
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
            </Input>
          </div>
          {/* <Button tag={Link} to='/apps/invoice/add' color='primary'>
            Add Record
          </Button> */}
          <Input className='w-auto ' type='select' value={fairFilter} onChange={e => setfairFilter(e.target.value)} >
            {fairData.map((i) => <option key={i.id} value={i.id}>{i.fairName}</option>)}


          </Input>
        </Col>
        <Col
          lg='6'
          className='actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0'
        >
          <div className='d-flex align-items-center'>
            <label htmlFor='search-invoice'>Search</label>
            <Input
              id='search-invoice'
              className='ms-50 me-2 w-100'
              type='text'
              value={value}
              onChange={e => handleFilter(e.target.value)}
              placeholder='Search Invoice'
            />
          </div>
          <Input className='w-auto ' type='select' value={handleStatusValue} onChange={e => statusValue(e.target.value)} >
            <option value='N'>รายการปกติ</option>
            <option value='Y'>รายการยกเลิก</option>

          </Input>
        </Col>
      </Row>
    </div>
  )
}

const InvoiceList = () => {
  // ** Store vars
  // const dispatch = useDispatch()
  // const store = useSelector(state => state.invoice)

  // ** States
  const [value, setValue] = useState('')
  // const [sort, setSort] = useState('desc')
  // const [sortColumn, setSortColumn] = useState('id')
  const [currentPage, setCurrentPage] = useState(1)
  // const [statusValue, setStatusValue] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [status, setStatus] = useState('N')

  // const [rowSelection, setRowSelection] = useState({})

  const [DataListOrder, setDataListOrder] = useState([])

  const [DataListOrderTable, setDataListOrderTable] = useState([])

  // const [globalFilter, setGlobalFilter] = useState('')

  const [FilterData, setFilterData] = useState({ fair: null })

  const [DataFair, setDataFair] = useState([])

  const [DataHistory, setDataHistory] = useState([])

  const [open, setOpen] = useState(false)

  // const [OnCancel, setOnCancel] = useState(null)

  const [DataDialogView, setDataDialogView] = useState(null)

  // Hooks

  useEffect(() => {
    if (DataHistory.length > 0) {
      const filterData_ = DataListOrder.filter(i => i.f_delete === status)

      setDataListOrderTable(filterData_)
    }
  }, [status])

  // useEffect(() => {
  //   if (OnCancel !== null) {
  //     // { id: id_form_q, typRes: 'DELETE' }
  //     let mapNewData = []

  //     if (OnCancel.typRes === 'DELETE') {
  //       mapNewData = DataListOrder.filter(i => i.id !== OnCancel.id)
  //     } else {
  //       mapNewData = DataListOrder.map(i => {
  //         if (i.id === OnCancel.id) {
  //           return { ...i, f_delete: 'Y' }
  //         } else {
  //           return i
  //         }
  //       })
  //     }

  //     setDataListOrder(mapNewData)
  //     const filterData_ = mapNewData.filter(i => i.f_delete === status)

  //     // console.log('mapNewData', DataListOrder, mapNewData)

  //     setDataListOrderTable(filterData_)
  //   }
  // }, [OnCancel])

  useEffect(() => {
    if (DataDialogView !== null) {
      setOpen(true)
    }

    // console.log('fff', DataDialogView)
  }, [DataDialogView])


  const handleFilter = val => {

    const filterData_ = DataListOrder.filter(i => {
      if (i.f_delete === status &&
        (i.f_name.search(val) !== -1 ||
          i.f_total.search(val) !== -1 ||
          i.id.toString().search(val) !== -1 ||
          format(parseISO(i.createdAt), 'dd-MM-yyyy HH:mm:ss').search(val) !== -1)) {
        return true
      }
    })
    setDataListOrderTable(filterData_)
    setValue(val)
  }

  const handlePerPage = e => {
    // dispatch(
    //   getData({
    //     sort,
    //     q: value,
    //     sortColumn,
    //     page: currentPage,
    //     status: statusValue,
    //     perPage: parseInt(e.target.value)
    //   })
    // )
    setRowsPerPage(parseInt(e.target.value))
  }

  // const handleStatusValue = e => {
  //   setStatusValue(e.target.value)
  //   // dispatch(
  //   //   getData({
  //   //     sort,
  //   //     q: value,
  //   //     sortColumn,
  //   //     page: currentPage,
  //   //     perPage: rowsPerPage,
  //   //     status: e.target.value
  //   //   })
  //   // )
  // }

  const handlePagination = page => {
    // dispatch(
    //   getData({
    //     sort,
    //     q: value,
    //     sortColumn,
    //     status: statusValue,
    //     perPage: rowsPerPage,
    //     page: page.selected + 1
    //   })
    // )
    setCurrentPage(page.selected + 1)
  }

  function handleChangeDistricts(val) {
    console.log(val)
  }

  const CustomPagination = () => {
    const count = Number((1 / rowsPerPage).toFixed(0))

    return (
      <ReactPaginate
        nextLabel=''
        breakLabel='...'
        previousLabel=''
        pageCount={count || 1}
        activeClassName='active'
        breakClassName='page-item'
        pageClassName={'page-item'}
        breakLinkClassName='page-link'
        nextLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousLinkClassName={'page-link'}
        previousClassName={'page-item prev'}
        onPageChange={page => handlePagination(page)}
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        containerClassName={'pagination react-paginate justify-content-end p-1'}
      />
    )
  }
  function formatBaht(number) {
    // ตรวจสอบประเภทข้อมูล
    if (typeof number !== 'number') {
      return 'Invalid input'
    }

    // กำหนดตัวเลือกการ format เงิน
    const options = {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 2
    }

    // แปลงตัวเลขเป็นสกุลเงินบาท
    const formattedBaht = new Intl.NumberFormat('th-TH', options).format(number)

    return formattedBaht
  }

  async function convertUrlToBase64(imageUrl) {
    try {
      const response = await fetch(imageUrl)

      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status}`)
      }

      const blob = await response.blob()
      const reader = new FileReader()

      return new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
      })
    } catch (error) {
      console.error('Error converting image:', error)

      return null // Handle the error or return a default value
    }
  }
  async function printPDF(dataOrder) {

    // pdfMake.vfs = pdfFonts.pdfMake.vfs
    // window.pdfMake.vfs["THSarabunNew.ttf"] = font

    pdfMake.fonts = {


      // THSarabunNew: {
      //   normal: 'THSarabunNew.ttf',
      //   bold: 'THSarabunNew.ttf',
      //   italics: 'THSarabunNew.ttf',
      //   bolditalics: 'THSarabunNew.ttf'
      // }
      THSarabunNew: {
        normal: 'https://sahagroup.com/fair/forms/THSarabun/THSarabunNew.ttf',
        bold: 'https://sahagroup.com/fair/forms/THSarabun/THSarabunNew Bold.ttf',
        italics: 'https://sahagroup.com/fair/forms/THSarabun/THSarabunNew Italic.ttf',
        bolditalics: 'https://sahagroup.com/fair/forms/THSarabun/THSarabunNew BoldItalic.ttf'
      }

    }

    const dataWidth = ['*', 100, 50, '*']
    const colTexSpan = []
    const dataHeadTable = [
      { text: 'รูป', alignment: 'center', style: 'tbheader' },
      { text: 'ชื่ออุปกรณ์', alignment: 'center', style: 'tbheader' },
      { text: 'ราค่าต่อหน่อย', alignment: 'center', style: 'tbheader' }
    ]

    for (let index = 0; index < dataOrder.tb_date_use.length; index++) {
      const iDatUse = dataOrder.tb_date_use[index]

      colTexSpan.push({})
      dataHeadTable.push({
        text: `${iDatUse.date_use_title} \n ${iDatUse.date_use_startdate}`,
        alignment: 'center',

        style: 'tbheader'
      })
      dataWidth.push('*')
    }

    dataHeadTable.push({ text: 'จำนวน', alignment: 'center', style: 'tbheader' })

    const ItemDevice = []

    for (let index = 0; index < dataOrder.tb_form_request_equipment.length; index++) {
      const i = dataOrder.tb_form_request_equipment[index]
      const base64Image = await convertUrlToBase64(i.tb_equipment_fair.tb_equipment.eq_photo)

      const dataInDateUse = dataOrder.tb_date_use.map(i2 => {
        if (i2.id === i.tb_date_use.id) {
          return { text: i.freq_quantity, alignment: 'center', style: 'tbbody' }
        } else {
          return { text: '' }
        }
      })

      ItemDevice.push([
        {
          image: base64Image,
          width: 50,
          height: 50
        },
        { text: i.tb_equipment_fair.tb_equipment.eq_name, style: 'tbbody' },
        {
          text: formatBaht(parseFloat(i.freq_total_price) / parseFloat(i.freq_quantity)),
          alignment: 'right',
          style: 'tbbody'
        },
        ...dataInDateUse,
        { text: formatBaht(parseFloat(i.freq_total_price)), alignment: 'right', style: 'tbbody' }
      ])
    }

    // console.log('ItemDevice', ItemDevice)

    const docDefinition = {
      styles: {
        header: {
          fontSize: 22,
          bold: true
        },
        subheader: {
          fontSize: 16
        },
        tbheader: {
          fontSize: 12
        },
        tbbody: {
          fontSize: 12
        },
        anotherStyle: {
          alignment: 'center',
          fontSize: 22
        },
        tableExample: {
          fontSize: 14,
          margin: [0, 2, 0, 0]
        },
        textDate: {
          fontSize: 13,
          margin: [0, 3, 0, 0]
        },
        subtitle: {
          fontSize: 14,
          bold: true
        }
      },
      content: [
        {
          text: 'บริษัท สหพัฒนาอินเตอร์โฮลดิ้ง จำกัด (มหาชน)',
          style: 'subheader',
          alignment: 'center'
        },
        {
          text: 'ใบแจ้งยอด ',
          style: 'subheader',
          alignment: 'center',
          margin: [0, 0, 0, 10]
        },
        {
          text: [
            {
              text: `บริษัท : `,
              style: 'subtitle'
            },
            {
              text: dataOrder.address_open.user.customer.cus_company,
              fontSize: 14
            }
          ]
        },
        {
          text: [
            {
              text: `ที่อยู่ : `,
              style: 'subtitle'
            },
            {
              text: dataOrder.address_open.full_address,
              fontSize: 14
            }
          ]
        },

        {
          text: [
            {
              text: `บูธ  : `,
              style: 'subtitle'
            },
            {
              text: dataOrder.tb_form_request_booth.map((i) => i.tb_booth.boothname).toString(),
              fontSize: 14
            }
          ]
        },

        // {
        //   text: [
        //     {
        //       text: `ค่าใช้จ่าย : `,
        //       style: 'subtitle'
        //     },
        //     {
        //       text: cost,
        //       fontSize: 10
        //     }
        //   ]
        // },

        {
          style: 'tableExample',
          table: {
            dontBreakRows: true,
            widths: dataWidth,
            body: [
              // [
              //   {
              //     text: 'ผู้เข้าฝึกอบรม',
              //     alignment: 'center',
              //     colSpan: 4,
              //     bold: true
              //   },
              //   {},
              //   {},
              //   {}
              // ],
              [...dataHeadTable],

              ...ItemDevice,
              [
                {
                  text: 'รวมเงิน',
                  style: 'tableHeader',
                  colSpan: dataOrder.tb_date_use.length + 3,
                  alignment: 'right'
                },
                {},
                {},
                ...colTexSpan,
                {
                  text: formatBaht(parseFloat(dataOrder.f_sub_total)),
                  style: 'tableHeader',
                  alignment: 'right'
                }
              ],

              [
                {
                  text: 'ภาษีมูลค่าเพิ่ม 7%',
                  style: 'tableHeader',
                  colSpan: dataOrder.tb_date_use.length + 3,
                  alignment: 'right'
                },
                {},
                {},
                ...colTexSpan,
                {
                  text: formatBaht(parseFloat(dataOrder.f_sub_vat)),
                  style: 'tableHeader',
                  alignment: 'right'
                }
              ],
              [
                {
                  text: 'หัก ณ ที่จ่าย 3%',
                  style: 'tableHeader',
                  colSpan: dataOrder.tb_date_use.length + 3,
                  alignment: 'right'
                },
                {},
                {},
                ...colTexSpan,
                {
                  text: formatBaht(parseFloat(dataOrder.f_sub_withholding_tax)),
                  style: 'tableHeader',
                  alignment: 'right'
                }
              ],
              [
                {
                  text: 'จำนวนเงินทั้งสิ้น',
                  style: 'tableHeader',
                  colSpan: dataOrder.tb_date_use.length + 3,
                  alignment: 'right'
                },
                {},
                {},
                ...colTexSpan,
                {
                  text: formatBaht(parseFloat(dataOrder.f_total)),
                  style: 'tableHeader',
                  alignment: 'right'
                }
              ]
            ]
          }
        }
      ],
      defaultStyle: {
        // 4. default style 'KANIT' font to test
        font: 'THSarabunNew'
      },
      footer(currentPage, pageCount) {
        return {
          text: `${currentPage}/${pageCount}`, // Page number information
          alignment: 'right', // Center aligned footer content
          fontSize: 12,
          margin: [0, 0, 20, 0] // Optional: Add margin to the footer
        }
      }
    }

    console.log(docDefinition)

    await pdfMake.createPdf(docDefinition).download('Invoid.pdf')
  }

  const columns = [
    {
      name: 'เลขที่ใบจอง',
      sortable: true,
      sortField: 'id',
      minWidth: '107px',
      // selector: row => row.id,
      cell: row => <span>{row.id}</span>
    },
    {
      sortable: false,
      minWidth: '102px',
      sortField: 'f_delete',
      name: "สถานะ",
      // selector: row => row.invoiceStatus,
      cell: row => {
        const color = row.f_delete === 'N' ? 'light-success' : 'light-danger',
          Icon = row.f_delete === 'N' ? CheckCircle : Edit
        return (
          <Fragment>
            <Avatar color={color} icon={<Icon size={14} />} id={`av-tooltip-${row.id}`} />
            <UncontrolledTooltip placement='top' target={`av-tooltip-${row.id}`}>
              <span className='fw-bold'> {row.f_delete === 'N' ? 'ปกติ' : 'ถูกยกเลิก'}</span>
            </UncontrolledTooltip>

          </Fragment>
        )
      }
    },
    {
      name: 'ชื่อแบบฟอร์ม',
      sortable: true,
      minWidth: '350px',
      sortField: 'f_name',
      // selector: row => row.client.name,
      cell: row => <span> {row.f_name}</span>
    },
    {
      name: 'ยอดรวม',
      sortable: true,
      minWidth: '150px',
      sortField: 'f_total',
      // selector: row => row.total,
      cell: row => <FormatNumber number={parseFloat(row.f_total)} />
    },
    {
      sortable: true,
      minWidth: '200px',
      name: 'วันที่จอง',
      sortField: 'createdAt',
      cell: row => <span>{format(parseISO(row.createdAt), 'dd-MM-yyyy HH:mm:ss')}</span>
      // selector: row => row.dueDate
    },

    {
      name: 'Action',
      minWidth: '110px',
      cell: row => (
        <div className='column-action d-flex align-items-center'>

          {/* {row.f_delete === 'Y' ? (
            <span>
              <Trash className='cursor-pointer mx-1' size={17} id={`Trash-tooltip-${row.id}`} onClick={() => cancelOrder(
                row.fair_id,
                row.sahagroupfair_trans_id,
                row.id,
                row.f_delete
              )} />
              <UncontrolledTooltip placement='top' target={`Trash-tooltip-${row.id}`} >
                ลบ
              </UncontrolledTooltip>
            </span>
          ) : (
            <span> <XCircle className='cursor-pointer ' size={17} id={`XCircle-tooltip-${row.id}`} onClick={() => cancelOrder(
              row.fair_id,
              row.sahagroupfair_trans_id,
              row.id,
              row.f_delete
            )} />
              <UncontrolledTooltip placement='top' target={`XCircle-tooltip-${row.id}`}  >
                ยกเลิก
              </UncontrolledTooltip></span>
          )} */}

          <Eye className='cursor-pointer mx-1' size={17} id={`Eye-tooltip-${row.id}`} onClick={() => setDataDialogView({ ...row })} />
          <UncontrolledTooltip placement='top' target={`Eye-tooltip-${row.id}`}>
            ดูรายการ
          </UncontrolledTooltip>

          <Download className='cursor-pointer mx-0' size={17} id={`Download-tooltip-${row.id}`} onClick={() => printPDF({ ...row })} />
          <UncontrolledTooltip placement='top' target={`Download-tooltip-${row.id}`}>
            ดาวน์โหลด
          </UncontrolledTooltip>


        </div>
      )
    }

  ]


  const handleSort = (column, sortDirection) => {
    // setSort(sortDirection)
    // setSortColumn(column.sortField)

    // console.log(column.sortField, sortDirection);

    // const data_sort = DataListOrderTable.sort((a, b) => b.age - a.age)
    const data_sort = _.orderBy(DataListOrderTable, [column.sortField], [sortDirection])
    // console.log(data_sort);
    setDataListOrderTable(data_sort)
    // dispatch(
    //   getData({
    //     q: value,
    //     page: currentPage,
    //     sort: sortDirection,
    //     status: statusValue,
    //     perPage: rowsPerPage,
    //     sortColumn: column.sortField
    //   })
    // )
  }

  // const cancelOrder = async (fair_id, id_tran, id_form_q, f_delete) => {
  //   const ms =
  //     f_delete === 'Y' ? 'ยืนยันการลบรายจอง ระบบจะลบรายการจองแบบถาวร ยืนยันที่จะลบหรือไม่' : 'ยืนยันการยกเลิกรายการจอง'

  //   if (confirm(ms)) {
  //     // console.log(fair_id, id_tran, id_form_q)

  //     if (f_delete === 'Y') {
  //       const res = await delForm(fair_id, id_tran, id_form_q)

  //       if (res.status) {
  //         setOnCancel({ id: id_form_q, typRes: 'DELETE' })
  //       }

  //       alert(res.msg)
  //     } else {
  //       const res = await cancelForm(fair_id, id_tran, id_form_q)

  //       if (res.status) {
  //         setOnCancel({ id: id_form_q, typRes: 'CANCEL' })
  //       }

  //       alert(res.msg)
  //     }
  //   }
  // }

  const SetItemOrder = async (dataHis, fair_id) => {
    // console.log(data) tb_form
    const data_ = dataHis.filter(i => i.etag === fair_id)

    let dataOrderfair = []

    for (let index1 = 0; index1 < data_.length; index1++) {
      const dataF = data_[index1]

      for (let index = 0; index < dataF.tb_form.length; index++) {
        const Iorder = dataF.tb_form[index]

        const mapDat = Iorder.tb_form_request.map(i => ({
          ...i,
          f_name: Iorder.f_name,
          fair_id: dataF.etag,
          f_action: null
        }))

        dataOrderfair = [...dataOrderfair, ...mapDat]
      }
    }

    // console.log('dataOrderfair', dataOrderfair)
    const sortData = _.orderBy(dataOrderfair, "id", "desc")

    const filterData_ = _.filter(sortData, i => i.f_delete === status)

    // console.log('gggg', filterData_)
    setDataListOrderTable(filterData_)
    setDataListOrder(sortData)
  }

  useEffect(() => {
    async function getDataHistory() {
      const dataHis = await getFormHistory()

      const dataFair_ = dataHis.map(i => ({ id: i.etag, fairName: i.fairName }))

      if (dataFair_.length > 0) {
        // console.log('ffsssf', dataHis[0].tb_form)
        await setFilterData({ ...FilterData, fair: dataFair_[0] })
        await SetItemOrder(dataHis, dataFair_[0].id)
      }

      await setDataFair(dataFair_)

      await setDataHistory(dataHis)
    }

    getDataHistory()
  }, [])


  return (
    <div className='invoice-list-wrapper'>
      <Card>
        <ViewOrder open={open} setOpen={setOpen} dataOrder={DataDialogView} />
        <div className='invoice-list-dataTable react-dataTable'>
          <DataTable
            noHeader
            pagination
            sortServer
            paginationServer
            subHeader={true}
            columns={columns}
            responsive={true}
            onSort={handleSort}
            data={DataListOrderTable}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            defaultSortField='invoiceId'
            paginationDefaultPage={currentPage}
            paginationComponent={CustomPagination}
            subHeaderComponent={
              <CustomHeader
                value={value}
                statusValue={setStatus}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                handleStatusValue={status}
                fairData={DataFair}
                fairFilter={FilterData.fair}
                setfairFilter={handleChangeDistricts}

              />
            }
          />
          {/* <DataTable
          noHeader
          pagination
          data={DataListOrderTable}
          columns={columns}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
          
        /> */}
        </div>
      </Card>
    </div>
  )
}

export default InvoiceList
