import axios from 'axios';

export default axios.create({
    // baseURL: 'https://europe-west1-irepropev.cloudfunctions.net/api',
    baseURL: 'http://localhost:5000/irepropev/europe-west1/api',
    //   headers: {
    //     Authorization: 'Client-ID xIgPSMoJHDQfXblOuC5ATjaFXVMHhjnpQmhDBnjLzEs'
    //   }
});