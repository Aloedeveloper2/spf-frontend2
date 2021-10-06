export default {
    server: "http://10.20.123.64:5000",
    headers: {
        authorization: localStorage.getItem('token')
    }
}