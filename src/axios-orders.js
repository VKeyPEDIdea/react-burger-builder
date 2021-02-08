import axios from "axios";

const instance = axios.create({
	baseURL: 'https://react-burger-builder-22af5-default-rtdb.firebaseio.com/',
});

export default instance;