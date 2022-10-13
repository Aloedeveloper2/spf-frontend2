export default {
    address: process.env.NODE_ENV=="development"?"http://localhost:5000":"https://collecte.aloe-odoo.com",
    headers: {
        authorization: localStorage.getItem('token')
    }
}
