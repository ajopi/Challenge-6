import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap'
import './HomeCustomer.css'
import Logo from '../../Assets/img/logo.png'
import car from '../../Assets/img/img_car.png'
import facebook from '../../Assets/img/icon_facebook.png'
import instagram from '../../Assets/img/icon_instagram.png'
import mail from '../../Assets/img/icon_mail.png'
import twitter from '../../Assets/img/icon_twitter.png'
import twitch from '../../Assets/img/icon_twitch.png'
import { ContentHome } from '../../Assets/Components/ContentHome/ContentHome'
import { CardDefault } from '../../Assets/Components/Card/CardDefault'
import { Payment } from '../../Assets/Components/Payment/Payment'
import { getDataByID, getNewData } from '../../Redux/Action/GetAction'
import { connect, useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const HomeCustomer = (props) => {

    const navigate = useNavigate()
    const [TokenCust, setTokenCust] = useState(sessionStorage.getItem("Token Customer"))
    useEffect(() => {
      if (!TokenCust) {
          navigate(`/`)
      }
    
      
    }, [])


    const [ParameterPindah, setParameterPindah] = useState(0)
    // const [dataMobil, setdataMobil] = useState()
    const [DriverStatus, setDriverStatus] = useState(null)
    const [dataMobilFilter, setdataMobilFilter] = useState(null)
    // const [carDetail, setcarDetail] = useState([])

    const dispatch = useDispatch();


    const { dataMobil } = useSelector((state) => state.getReducers);
    const { carDetail } = useSelector((state) => state.getReducers);
    // var axios = require('axios');

    // var config = {
    //     method: 'get',
    //     url: 'https://rent-cars-api.herokuapp.com/admin/car/',
    //     headers: {}
    // };



    // Coba Redux
    useEffect(() => {
        dispatch(getNewData())
    }, [])







    const handlePindah = () => {


        // console.log(DriverStatus);

        let filteredCar = dataMobil.filter((e) => {
            if (DriverStatus === "1") {
                return e.status === true;
                // console.log(e.status);
            } else if (DriverStatus === "2") {
                return e.status === false;
                // console.log("e.status");
            }
        })

        console.log(filteredCar);
        setdataMobilFilter(filteredCar);
        setParameterPindah(1);
    }

    const handlePindahBayar = () => {
        return <Payment id={carDetail.id}
                        gambar={carDetail.image}
                        nama={carDetail.name}
                        harga={carDetail.price}
                        passenger={carDetail.passenger}
                        transmission={carDetail.transmission}
                        year={carDetail.year} />
    }

    // const getCarById = (id) => {
    //     var axios = require('axios');

    //     var config = {
    //         method: 'get',
    //         url: `https://rent-cars-api.herokuapp.com/admin/car/${id}`,
    //         headers: {}
    //     };

    //     axios(config)
    //         .then(function (response) {
    //             setcarDetail(response.data)
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });



    // }

    const handleMap = () => {
        return dataMobilFilter.map((value, index) => {
            return <CardDefault
                passenger={value.passenger}
                transmission={value.transmission}
                year={value.year} nama={value.name}
                harga={value.price} foto={value.image}
                kategori={value.category}
                fungsiPayment={() => { setParameterPindah(2); dispatch(getDataByID(value.id)) }} />
        })
    }


    const fungsiDetail = () => {
        if (ParameterPindah === 1) {
            return handleMap();
        } else if (ParameterPindah === 2) {

            return handlePindahBayar();
        }
    }
    return (
        <div className='main-container'>
            <div className='navbar-container'>
                <Navbar>
                    <Container>
                        <img alt='' src={Logo} />
                        <Nav className="me-auto btn-nav">
                            <Nav.Link href="#home" className='property-nav'>Our Services</Nav.Link>
                            <Nav.Link href="#link" className='property-nav'>Why Us</Nav.Link>
                            <Nav.Link href="#link" className='property-nav'>Testimonial</Nav.Link>
                            <Nav.Link href="#link" className='property-nav'>FAQ</Nav.Link>
                            <Button variant="primary" className='btn-register'>Register</Button>{' '}
                        </Nav>
                    </Container>
                </Navbar>
            </div>

            {/* content isi */}
            <Container fluid className='container-fluid-content'>
                {ParameterPindah === 0 ? <ContentHome /> : null}

            </Container>


            {/* btn search */}
            <Container className='btn-search'>
                <Card className='card-search'>
                    <div className='btn-search-container'>
                        <div className='btn-search-1'>
                            <div className='txt-btn-search'>
                                Tipe Driver
                            </div>
                            <Form.Select size="sm" className='btn-search-property' value={DriverStatus} onChange={(e) => { setDriverStatus(e.target.value) }}>
                                <option value="" disabled selected hidden>Pilih Tipe Driver</option>
                                <option value="1">Dengan Sopir</option>
                                <option value="2">Tanpa Sopir (Lepas Kunci)</option>
                            </Form.Select>
                        </div>


                        <div className='btn-search-2'>
                            <div className='txt-btn-search'>
                                Tanggal
                            </div>
                            <input type={"date"} className='btn-search-property' />

                        </div>



                        <div className='btn-search-3'>
                            <div className='txt-btn-search'>
                                Waktu Jemput/Ambil
                            </div>
                            <input type="time" placeholder='Pilih Waktu' className='btn-search-property' />
                        </div>

                        <div className='btn-search-4'>
                            <div className='txt-btn-search'>
                                Jumlah Penumpang
                            </div>
                            <input type="number" placeholder='Jumlah Penumpang' min={1} className='btn-search-property' />
                        </div>

                        <Button variant="primary" className='btn-Mobil' onClick={() => { handlePindah() }}>Cari Mobil</Button>{' '}

                    </div>
                </Card>
            </Container>



            <Container className='container-card'>
                {fungsiDetail()}
                {/* {ParameterPindah === 1 ? handleMap() : null}
                {ParameterPindah === 2 ? handlePindahBayar() : null} */}

            </Container>






            {/* Footer */}
            <Container className='container-footer'>
                <Row>
                    <Col md={3}>
                        <Col md={12}>
                            <div className='txt-footer-1'>
                                Jalan Suroyo No. 161 Mayangan Kota Probolonggo 672000
                            </div>
                            <div className='txt-footer-1'>
                                binarcarrental@gmail.com
                            </div>
                            <div className='txt-footer-1'>
                                081-233-334-808
                            </div>
                        </Col>
                    </Col>
                    <Col md={3}>
                        <Col md={12}>
                            <div className='txt-footer-2'>
                                Our services
                            </div>
                            <div className='txt-footer-2'>
                                Why Us
                            </div>
                            <div className='txt-footer-2'>
                                Testimonial
                            </div>
                            <div className='txt-footer-2'>
                                FAQ
                            </div>
                        </Col>
                    </Col>
                    <Col md={3}>
                        <Col md={12}>
                            <div className='txt-footer-1'>
                                Connect with us
                            </div>

                            <div className='footer-icon-container'>
                                <img alt='' src={facebook} className='footer-icon' />
                                <img alt='' src={instagram} className='footer-icon' />
                                <img alt='' src={mail} className='footer-icon' />
                                <img alt='' src={twitter} className='footer-icon' />
                                <img alt='' src={twitch} className='footer-icon' />
                            </div>
                        </Col>
                    </Col>
                    <Col md={3}>
                        <div className='txt-footer-1'>
                            Copyright Binar 2022
                        </div>

                        <div>
                            <img alt='' src={Logo} />
                        </div>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

// const mapStateToProps = (state) =>{
//     return{
//         dataCount: state.manager1.count
//     }
// }
// const mapDispatchToProps = (dispatch) => {
//     return {
//         getApi: () => dispatch(getNewData())

//     }
// }

export default HomeCustomer

