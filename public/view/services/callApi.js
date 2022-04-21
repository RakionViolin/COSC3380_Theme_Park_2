import authHeader from '../helper/auth-header.js';
let token =  localStorage.getItem("ThemeParkaccessToken");
const axiosWithToken = (token) => axios.create({
    //baseURL: "https://theme-park-3380.herokuapp.com/",
    baseURL: "http://localhost:8080/",
    headers:  authHeader(token)
});
export default  {
    login: (data) => {
        return axiosWithToken(token).post("/api/v0/auth/login", data);
    },
    register: (data) => {console.log(data);
        return axiosWithToken(token).post("/api/v0/auth/register", data);
    },
    getAreas: () => {
        return axiosWithToken(token).get("/api/v0/area/");
    },
    getAreaById: (id) => {
        return axiosWithToken(token).get("/api/v0/area/"+id);
    },
    createArea: (data) => {
        return axiosWithToken(token).post("/api/v0/area/", data);
    },
    updateArea: (data, id) => {
        return axiosWithToken(token).put("/api/v0/area/"+id, data);
    },
    deleteAreaById: (id) => {
        return axiosWithToken(token).delete("/api/v0/area/"+id);
    },
    addRainOut: (data) => {
        return axiosWithToken(token).post("/api/v0/rainout", data);
    },
    getRainOutAreas: () => {
        return axiosWithToken(token).get("/api/v0/rainout");
    },
    getRides: () => {
        return axiosWithToken(token).get("/api/v0/ride/");
    },
    getRideById: (id) => {
        return axiosWithToken(token).get("/api/v0/ride/"+id);
    },
    createRide: (data) => {
        return axiosWithToken(token).post("/api/v0/ride/", data);
    },
    updateRide: (data, id) => {
        return axiosWithToken(token).put("/api/v0/ride/"+id, data);
    },
    deleteRideById: (id) => {
        return axiosWithToken(token).delete("/api/v0/ride/"+id);
    },
    getRideCoasters: () => {
        return axiosWithToken(token).get("/api/v0/ride-coaster/");
    },
    getRideCoasterById: (id) => {
        return axiosWithToken(token).get("/api/v0/ride-coaster/"+id);
    },
    createRideCoaster: (data) => {
        return axiosWithToken(token).post("/api/v0/ride-coaster/", data);
    },
    updateRideCoaster: (data, id) => {
        return axiosWithToken(token).put("/api/v0/ride-coaster/"+id, data);
    },
    deleteRideCoasterById: (id) => {
        return axiosWithToken(token).delete("/api/v0/ride-coaster/"+id);
    },
    createTicket: (data) => {
        return axiosWithToken(token).post("/api/v0/dashboard/purchase", data);
    },
    addMaintenance: (data) => {
        return axiosWithToken(token).post("/api/v0/dashboard/maintenance/", data);
    },
    getMaintenance: (data) => {
        return axiosWithToken(token).get("/api/v0/dashboard/maintenance/", data);
    },
    updateMaintenance: (id, data) => {
        return axiosWithToken(token).put("/api/v0/dashboard/maintenance/"+id, data);
    },
    deleteMaintenance: (id) => {
        return axiosWithToken(token).delete("/api/v0/dashboard/maintenance/"+id);
    },
    getPurchaseHistory: () => {
        return axiosWithToken(token).get("/api/v0/dashboard/purchase");
    },
    getCustomers: () => {
        return axiosWithToken(token).get("/api/v0/user/customers");
    },
    getWorkers: () => {
        return axiosWithToken(token).get("/api/v0/user/workers");
    },
    getUsers: () => {
        return axiosWithToken(token).get("/api/v0/user/");
    },
    createUser: (data) => {
        return axiosWithToken(token).post("/api/v0/user/", data);
    },
    updateUser: (data, id) => {
        return axiosWithToken(token).put("/api/v0/user/"+id, data);
    },
    deleteUser: (id) => {
        return axiosWithToken(token).delete("/api/v0/user/"+id);
    },
    allPurchased: () => {
        return axiosWithToken(token).get("/api/v0/dashboard/all-purchase");
    },
    searchPurchased: (data) => {
        return axiosWithToken(token).post("/api/v0/dashboard/search-purchase", data);
    },
    overallSiteSummary: () => {
        return axiosWithToken(token).get("/api/v0/dashboard/site-summary");
    },
    searchSiteSummary: (data) => {
        return axiosWithToken(token).post("/api/v0/dashboard/search-site-summary", data);
    },
    searchMaintenance: (data) => {
        return axiosWithToken(token).post("/api/v0/dashboard/search-maintenance", data);
    },
    searchSales: (data) => {
        return axiosWithToken(token).post("/api/v0/dashboard/search-sales", data);
    },
}
