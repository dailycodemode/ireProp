import axios from 'axios';

export default axios.create({
  baseURL: 'https://europe-west1-irepropev.cloudfunctions.net/api',
//   headers: {
//     Authorization: 'Client-ID xIgPSMoJHDQfXblOuC5ATjaFXVMHhjnpQmhDBnjLzEs'
//   }
});