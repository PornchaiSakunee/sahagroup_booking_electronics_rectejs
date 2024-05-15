// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import * as yup from 'yup'

// ** Reactstrap Imports
import {
    Row,
    Col,
    Card,
    Label,
    Input,
    Modal,
    Button,
    CardBody,
    CardText,
    CardTitle,
    ModalBody,
    ModalHeader,
    FormFeedback
} from 'reactstrap'

// ** Third Party Components
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { Home, Check, X, Briefcase } from 'react-feather'

// ** Utils
import { selectThemeColors } from '@utils'

import classnames from 'classnames'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

import { getProvinces, getAmphures, getDistricts, insertAddress, updateAddress } from '../../utility/apiCall'

import { yupResolver } from '@hookform/resolvers/yup'

const AddEditAddress = ({ show, setShow, onAction, dataUpdate, setDataUpdate }) => {
    const SignupSchema = yup.object().shape({
        address: yup.string().required("กรุณากรอกที่อยู่"),
        provinces: yup.string().required("กรุณาเลือกจังหวัด"),
        amphures: yup.string().required("กรุณาเลือกอำเภอ/เขต"),
        districts: yup.string().required("กรุณาเลือกตำบล/แขวง"),
        zipCode: yup.string().required("กรุณากรอกรหัสไปรษณีย์")

    })
    // ** Hooks
    const {
        reset,
        control,
        // setError,
        clearErrors,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

    // const [show, setShow] = useState(false)

    const [Provinces, setProvinces] = useState([])
    // const [DefaultProvinces, setDefaultProvinces] = useState(null)

    const [Amphures, setAmphures] = useState([])
    // const [DefaultAmphures, setDefaultAmphures] = useState(null)

    const [Districts, setDistricts] = useState([])
    // const [DefaultDistricts, setDefaultDistricts] = useState(null)

    // const [formData, setformData] = useState({
    //     address: null,
    //     provinces: null,
    //     amphures: null,
    //     districts: null,
    //     zipCode: null
    // })

    // States

    // const [addressData, setAddressData] = useState(initialAddressData)

    // const handleChangeAddress = async prop => {
    //   setformData({ ...formData, address: prop })
    // }

    const handleChangeProvinces = async value => {

        // const dataAmp = await getAmphures(prop.value)
        // eslint-disable-next-line no-use-before-define
        await AmphuresSet(value)

        // setformData({ ...formData, provinces: prop })
        // setAmphures(dataAmp)
    }

    const handleChangeAmphures = async value => {

        // setformData({ ...formData, amphures: prop })

        // eslint-disable-next-line no-use-before-define
        await DistrictsSet(value)


    }


    const onSubmit = async (data) => {
        console.log("data", data)
        const dataAdd = {
            address: data.address,
            districts_id: data.districts,
            zip_code: data.zipCode
        }
        if (dataUpdate !== null) {
            const id = dataUpdate.id

            await updateAddress(dataAdd, id)

            // if (updateAdr.status === true) {
            //   alert('OK')
            //   setOpen(false)
            //   onAction(true)
            // }
        } else {
            await insertAddress(dataAdd)

            // if (insertAdr.status === true) {
            //   alert('OK')
            //   setOpen(false)
            //   onAction(true)
            // }
        }

        setShow(false)
        onAction(true)

        // console.log('insertAdr', insertAdr)
        // }
    }

    useEffect(() => {
        async function getData() {
            // eslint-disable-next-line no-use-before-define
            await ProvincesSet()
        }

        getData()
    }, [])


    useEffect(() => {
        async function getDataUpdate() {
            if (dataUpdate !== null) {
                console.log('dataUpdatef', dataUpdate)
                // const id = dataUpdate.id
                const pvID = dataUpdate.districts.amphures.provinces.id
                const ampID = dataUpdate.districts.amphures.id
                const disID = dataUpdate.districts.id

                // address: null,
                // provinces: null,
                // amphures: null,
                // districts: null,
                // zipCode: null

                if (Provinces.length === 0) {
                    // eslint-disable-next-line no-use-before-define
                    await ProvincesSet()
                }

                // eslint-disable-next-line no-use-before-define
                await AmphuresSet(pvID)
                // eslint-disable-next-line no-use-before-define
                await DistrictsSet(ampID)

                setValue("address", dataUpdate.address)
                setValue("provinces", pvID)
                setValue("amphures", ampID)
                setValue("districts", disID)
                setValue("zipCode", dataUpdate.zip_code)
                // setformData({
                //     ...formData,
                //     address: dataUpdate.address,
                //     provinces: pv[0],
                //     amphures: amp[0],
                //     districts: dis[0],
                //     zipCode: dataUpdate.zip_code
                // })
            } else {
                // setformData({
                //     address: null,
                //     provinces: null,
                //     amphures: null,
                //     districts: null,
                //     zipCode: null
                // })
            }
        }

        getDataUpdate()
    }, [dataUpdate])

    const onDiscard = () => {
        clearErrors()
        setShow(false)
        reset()
        setDataUpdate(null)
    }

    async function ProvincesSet() {
        const dataProvin = await getProvinces()
        const mapDataProvin = dataProvin.map((i) => ({ value: i.province_id, label: i.name_th }))

        await setProvinces(mapDataProvin)

    }


    async function AmphuresSet(pvID) {
        const dataAmphures = await getAmphures(pvID)
        const mapdataAmphures = dataAmphures.map((i) => ({ value: i.amphure_id, label: i.name_th }))

        await setAmphures(mapdataAmphures)
    }
    async function DistrictsSet(ampID) {
        const dataDistrictsSet = await getDistricts(ampID)
        const mapdataDistrictsSet = dataDistrictsSet.map((i) => ({ value: i.districts_id, label: i.name_th, zip_code: i.zip_code }))

        await setDistricts(mapdataDistrictsSet)
    }

    return (
        <Fragment>
            <Button color='primary' onClick={() => setShow(true)}>
                เพิ่มที่อยู่
            </Button>
            <Modal
                isOpen={show}
                onClosed={onDiscard}
                toggle={() => setShow(!show)}
                className='modal-dialog-centered modal-lg'
            >
                <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
                <ModalBody className='pb-5 px-sm-4 mx-50'>
                    <h1 className='address-title text-center mb-1'>{dataUpdate ? 'แก้ไขที่อยู่' : 'เพิ่มที่อยู่'}</h1>
                    {/* <p className='address-subtitle text-center mb-2 pb-75'>Add address for billing address</p> */}
                    <Row tag='form' className='gy-1 gx-2' onSubmit={handleSubmit(onSubmit)}>

                        <Col xs={12} md={12}>
                            <Label className='form-label' for='address'>
                                ที่อยู่ <span style={{ color: 'red' }}>*</span>
                            </Label>
                            <Controller
                                name='address'
                                control={control}

                                render={({ field }) => (
                                    <Input {...field} placeholder='กรอกที่อยู่' />
                                )}
                            />
                            {errors.address && <FormFeedback>กรุณณา กรอกที่อยู่</FormFeedback>}
                        </Col>

                        <Col xs={12} sm={6}>
                            <Label className='form-label' for='provinces'>
                                จังหวัด <span style={{ color: 'red' }}>*</span>
                            </Label>
                            <Controller
                                id='provinces'
                                control={control}
                                name='provinces'
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        // isClearable
                                        options={Provinces}
                                        classNamePrefix='select'
                                        theme={selectThemeColors}
                                        onChange={(e) => {
                                            handleChangeProvinces(e.value)
                                            setValue(field.name, e === null ? e : e.value)
                                        }}
                                        invalid={errors.provinces && true}
                                        value={Provinces.filter(
                                            ({ value }) => field.value === value
                                        )}
                                        className={classnames("react-select", {
                                            "is-invalid": errors.provinces
                                        })}
                                    />
                                    //     <Select
                                    //     id='provinces'
                                    //     isClearable={false}
                                    //     className='react-select'
                                    //     classNamePrefix='select'
                                    //     options={Provinces}
                                    //     theme={selectThemeColors}
                                    //     defaultValue={formData.provinces}
                                    //     onChange={(value) => handleChangeProvinces(value)}
                                    // />
                                )}
                            />
                            {errors.tree_name_id && <FormFeedback>{errors.tree_name_id.message}</FormFeedback>}

                        </Col>
                        <Col xs={12} sm={6}>
                            <Label className='form-label' for='amphures'>
                                อำเภอ / เขต <span style={{ color: 'red' }}>*</span>
                            </Label>
                            <Controller
                                id='amphures'
                                control={control}
                                name='amphures'
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        // isClearable
                                        options={Amphures}
                                        classNamePrefix='select'
                                        theme={selectThemeColors}
                                        onChange={(e) => {

                                            handleChangeAmphures(e.value)
                                            setValue(field.name, e === null ? e : e.value)
                                        }}
                                        invalid={errors.amphures && true}
                                        value={Amphures.filter(
                                            ({ value }) => field.value === value
                                        )}
                                        className={classnames("react-select", {
                                            "is-invalid": errors.amphures
                                        })}
                                    />
                                    //     <Select
                                    //     id='provinces'
                                    //     isClearable={false}
                                    //     className='react-select'
                                    //     classNamePrefix='select'
                                    //     options={Provinces}
                                    //     theme={selectThemeColors}
                                    //     defaultValue={formData.provinces}
                                    //     onChange={(value) => handleChangeProvinces(value)}
                                    // />
                                )}
                            />
                            {errors.tree_name_id && <FormFeedback>{errors.tree_name_id.message}</FormFeedback>}
                            {/* <Select
                                id='amphures'
                                isClearable={false}
                                className='react-select'
                                classNamePrefix='select'
                                options={Amphures}
                                theme={selectThemeColors}
                                defaultValue={formData.amphures}
                                onChange={(value) => handleChangeAmphures(value)}
                            /> */}
                        </Col>

                        <Col xs={12} sm={6}>
                            <Label className='form-label' for='districts'>
                                ตำบล / แขวง <span style={{ color: 'red' }}>*</span>
                            </Label>
                            <Controller
                                id='districts'
                                control={control}
                                name='districts'
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        // isClearable
                                        options={Districts}
                                        classNamePrefix='select'
                                        theme={selectThemeColors}
                                        onChange={(e) => {

                                            setValue("zipCode", e.zip_code)
                                            setValue(field.name, e === null ? e : e.value)
                                        }}
                                        invalid={errors.districts && true}
                                        value={Districts.filter(
                                            ({ value }) => field.value === value
                                        )}
                                        className={classnames("react-select", {
                                            "is-invalid": errors.districts
                                        })}
                                    />

                                )}
                            />
                            {errors.districts && <FormFeedback>{errors.districts.message}</FormFeedback>}
                            {/* <Select
                                id='districts'
                                isClearable={false}
                                className='react-select'
                                classNamePrefix='select'
                                options={Districts}
                                theme={selectThemeColors}
                                defaultValue={formData.districts}
                                onChange={(value) => handleChangeDistricts(value)}
                            /> */}
                        </Col>


                        <Col xs={12} sm={6}>
                            <Label className='form-label' for='zipCode'>
                                รหัสไปรษณ์ย์ <span style={{ color: 'red' }}>*</span>
                            </Label>

                            <Controller
                                name='zipCode'
                                control={control}
                                invalid={errors.zipCode && true}
                                render={({ field }) => (
                                    <Input  {...field} placeholder='กรอกรหัสไปรษณ์ย์' />
                                )}
                            />
                            {errors.zipCode && <FormFeedback>กรุณากรอก รหัสไปรษณ์ย์</FormFeedback>}
                        </Col>

                        <Col className='text-center' xs={12}>
                            <Button type='submit' className='me-1 mt-2' color='primary'>
                                {dataUpdate ? 'แก้ไข' : 'เพิ่ม'}
                            </Button>
                            <Button type='reset' className='mt-2' color='secondary' outline onClick={onDiscard}>
                                ปิด
                            </Button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </Fragment>
    )
}

export default AddEditAddress
