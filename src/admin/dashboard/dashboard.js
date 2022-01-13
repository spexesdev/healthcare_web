import React, { useState, useEffect } from 'react';
import { ApiPath } from '../../assets/common/base-url';
import { Header } from "../../components/header";
import { CardBox } from './cardbox';
import { DoctorsListItem } from './doctors-list-item';
import Doctors from './doctors'

const Dashboard = props => {

    const [txtSearch, setTxtSearch] = useState("");
    const [doctorsList, setDoctorsList] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');

    const fetchDoctors = () => {
        const params = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            },
            method: 'GET'
        }

        props.setIsLoaderVisible(true);

        fetch(ApiPath + "query/Doctor", params)
            ?.then(response => (response.json()))
            .then(res => {
                props.setIsLoaderVisible(false)

                if (res.statusCode === 200) {
                    setDoctorsList(res.data);
                    setSelectedDoctor(res.data[0]?.uidNo)

                    console.log(res.data[0]?.uidNo)
                } else {
                    props.showToast(res.message, 'exclamation');
                }

            })
            .catch(err => {
                props.setIsLoaderVisible(false);
                props.showToast(err.message, 'exclamation');
            })

    }

    useEffect(() => {
        //Load a doctors' list immediately the form loads...
        fetchDoctors();

        //eslint-disable-next-line
    }, [])

    // useEffect(() => {
    //     const output = doctorsList.filter(item => item.name === txtSearch)
    //     if (txtSearch !== "") {
    //         setDoctorsList(output)
    //     } else if (txtSearch === "") {
    //         setDoctorsList(doctorsList);
    //     }

    //     setSelectedDoctor(doctorsList[0]?.id)

    // }, [txtSearch])

    const listItems = doctorsList.map((item, index) => {
        return (
            <DoctorsListItem
                id={item.uidNo}
                name={item.name}
                src={item.photo}
                rating={`4.${Math.floor(Math.random() * 9)}`}
                specialization={item.specialization?.certification}
                status={item.verification?.status}
                key={index}
                setItem={value => setSelectedDoctor(value)}
                selectedDoctor={selectedDoctor}
            />
        )
    })

    return (
        <div>
            <Header />
            <div className='main'>
                <CardBox />
                <div className='main-content'>
                    <div className="left-main mt-2">
                        <div className="input-group d-none">
                            <input
                                className="form-control"
                                id="txtSearch"
                                type="text"
                                value={txtSearch}
                                onChange={e => setTxtSearch(e.target.value)}
                                placeholder='Search for Doctor'

                            />
                            <i className="icofont-search"></i>
                        </div>
                        <div className='doctors-list'>
                            {listItems}
                        </div>
                    </div>
                    <div className='right-main'>
                        {selectedDoctor && selectedDoctor !== '' && <Doctors
                            setIsLoaderVisible={props.setIsLoaderVisible}
                            showToast={props.showToast}
                            selectedDoctor={selectedDoctor}
                        />}
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Dashboard;
