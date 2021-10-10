export default {
    address: "http://localhost:5000",
    headers: {
        authorization: localStorage.getItem('token')
    }
}