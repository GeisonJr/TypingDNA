/*--- Libraries ---*/
import axios from "axios";

const URL = [
	"http://45.164.62.130:9091",
	"http://201.175.61.14:9091",
	"http://192.168.3.254:9091"
]

const api = axios.create({
	baseURL: URL[0]
});

export default api;