export default {
    address: "http://bissa.aloe-odoo.com/:5000",
    headers: {
        authorization: localStorage.getItem('token')
    }
}
