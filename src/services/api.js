import axios from 'axios';

const api = axios.create({
	baseURL: 'http://192.168.0.115:3338',
});

export default api;
