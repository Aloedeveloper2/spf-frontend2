export default {
    server: "http://192.168.100.92:5000",
    headers: {
        authorization: localStorage.getItem('token')
    }
}