import callApi from "../services/callApi.js";

export default {
    template: `
    <div class="row mt-2">
        <div class="col-md-12">
            <div class="card dashboard-body">
                <div class="row">
                    <div class="col-md-8 p-4">
                        <div class="card mb-4">
                            <form class="card-body row">
                                <div class="form-group col-md-6">
                                    <label>Date From</label>
                                    <input type="date" class="form-control" v-model="formData.date_from">
                                </div>
                                
                                <div class="form-group col-md-6">
                                    <label>Date to</label>
                                    <input type="date" class="form-control" v-model="formData.date_to">
                                </div>
                                
                                <div class="form-group col-md-4">
                                    <label for="customer">Customer</label>
                                    <select class="form-control" id="customer" v-model="formData.customer">
                                        <option v-for="customer in customers" :key="customer.user_id" :value="customer.user_id">{{customer.full_name}}</option> 
                                    </select>
                                </div>
                                
                                <div class="form-group col-md-4">
                                    <label for="rides_coaster">Rides Coaster</label>
                                    <select class="form-control" id="rides_coaster" v-model="formData.rides_coaster">
                                        <option v-for="coaster in rider_coasters" :key="coaster.Ride_coaster_ID" :value="coaster.Ride_coaster_ID">{{coaster.Name}}</option> 
                                    </select>
                                </div>
                                
                                <div class="form-group col-md-4">
                                    <label for="area">Area</label>
                                    <select class="form-control" id="area" v-model="formData.area">
                                        <option v-for="area in areas" :key="area.Area_ID" :value="area.Area_ID">{{area.Area_Name}}</option> 
                                    </select>
                                </div>
                                
                                <div class="form-group col-md-12 text-center">
                                    <button class="btn btn-primary" @click="searchTicket">Find</button>
                                </div>
                            </form>
                        </div>

                        <h3>Ticket Purchase History</h3>
                        <table class="table table-bordered table-hover">
                            <thead class="thead-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Rides Name</th>
                                    <th>Rides Capacity</th>
                                    <th>Customer Name</th>
                                    <th>Customer Contact</th>
                                    <th>Price</th>
                                    <th>Admission Date</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                 <tr v-for="(ticket, index) in tickets" :key="ticket.Ticket_ID">
                                    <td>{{index+1}}</td>
                                    <td>{{ticket.tickets.Name}}</td>
                                    <td>{{ticket.tickets.Capacity}}</td>
                                    <td>{{ticket.Customer.full_name}}</td>
                                    <td>{{ticket.Customer.contact}}</td>
                                    <td>&#36; {{ticket.Price}}</td>
                                    <td>{{(new Date(ticket.admission_date)).toDateString()}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="col-md-4 p-4">
                        <div class="card mb-4">
                            <form class="card-body row">
                                <div class="form-group col-md-12">
                                    <label>Date From</label>
                                    <input type="date" class="form-control" v-model="summaryFormData.date_from">
                                </div>
                                
                                <div class="form-group col-md-12">
                                    <label>Date to</label>
                                    <input type="date" class="form-control" v-model="summaryFormData.date_to">
                                </div>
                                
                                <div class="form-group col-md-12 text-center">
                                    <button class="btn btn-primary" @click="searchSummary">Find</button>
                                </div>
                            </form>
                        </div>

                        <h3>Overall Site Summary</h3>
                        <table class="table table-bordered table-hover">
                            <tbody>
                                <tr>
                                    <th>Total Customer</th><td>{{summary.customers}}</td>
                                </tr>
                                <tr>
                                    <th>Total Rides</th><td>{{summary.rides}}</td>
                                </tr>
                                <tr>
                                    <th>Rides In Maintenance</th><td>{{summary.maintenances}}</td>
                                </tr>
                                <tr>
                                    <th>Total Employee</th><td>{{summary.employees}}</td>
                                </tr>
                                <tr>
                                    <th>Average Ticket Price</th><td>&#36; {{summary.avg_ticket_price}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>`,

    data () {
        return {
            tickets: [],
            customers: [],
            areas: [],
            rider_coasters: [],
            summary: {
                customers:'',
                rides:'',
                maintenances: '',
                employees: '',
                avg_ticket_price: ''
            },
            formData: {
                date_from:'',
                date_to:'',
                customer: '',
                rides_coaster: '',
                area: ''
            },
            summaryFormData: {
                date_from:'',
                date_to:''
            },
        }
    },
    created: function () {
        this.fetchPurchases();
        this.fetchSummary();
        this.fetchRidesCoaster();
        this.fetchArea();
        this.fetchCustomer();
    },
    methods: {
        fetchPurchases: function() {
            let that = this;
            let currentDate = new Date();
            let datetime = currentDate.getFullYear() +'-'+ (currentDate.getMonth()+1) +'-' + currentDate.getDate();
            this.formData.date_from = datetime;
            this.formData.date_to = datetime;

            this.searchTicket();
        },
        fetchSummary: function() {
            let that = this;
            callApi.overallSiteSummary()
                .then(function (response) {
                    let customers = response.data.customers ? response.data.customers : 0;
                    let rides = response.data.rides ? response.data.rides : 0;
                    let maintenances = response.data.maintenances ? response.data.maintenances : 0;
                    let employees = response.data.employees ? response.data.employees : 0;
                    let avg_ticket_price = response.data.avg_ticket_price ? response.data.avg_ticket_price : 0;

                    if(response.data.message) {
                        alert(response.data.message);
                    }
                    else{
                        that.summary.customers = customers;
                        that.summary.rides = rides;
                        that.summary.maintenances = maintenances;
                        that.summary.employees = employees;
                        that.summary.avg_ticket_price = avg_ticket_price;
                    }
                })
                .catch(function (error) {
                    console.log(JSON.stringify(error))
                });
        },
        fetchRidesCoaster: function () {
            let that = this;
            callApi.getRideCoasters()
                .then(function (response) {
                    let _data = response.data.rides_coaster ? response.data.rides_coaster : [];

                    if(response.data.message) {
                        alert(response.data.message);
                    }
                    else that.rider_coasters = _data;
                })
                .catch(function (error) {
                    console.log(JSON.stringify(error))
                });
        },
        fetchArea: function () {
            let that = this;
            callApi.getAreas()
                .then(function (response) {
                    let _data = response.data.areas ? response.data.areas : [];

                    if(response.data.message) {
                        alert(response.data.message);
                    }
                    else that.areas = _data;
                })
                .catch(function (error) {
                    console.log(JSON.stringify(error))
                });
        },
        fetchCustomer: function () {
            let that = this;
            callApi.getCustomers()
                .then(function (response) {
                    let _data = response.data.users ? response.data.users : [];

                    if(response.data.message) {
                        alert(response.data.message);
                    }
                    else that.customers = _data;
                })
                .catch(function (error) {
                    console.log(JSON.stringify(error))
                });
        },
        searchTicket : function () {
            let that = this;
            callApi.searchPurchased(this.formData)
                .then(function (response) {
                    let _data = response.data.tickets ? response.data.tickets : [];

                    if(response.data.message) {
                        alert(response.data.message);
                    }
                    else that.tickets = _data;
                })
                .catch(function (error) {
                    console.log(JSON.stringify(error))
                });
        },
        searchSummary : function () {
            let that = this;
            callApi.searchSiteSummary(this.summaryFormData)
                .then(function (response) {
                    let customers = response.data.customers ? response.data.customers : 0;
                    let rides = response.data.rides ? response.data.rides : 0;
                    let maintenances = response.data.maintenances ? response.data.maintenances : 0;
                    let employees = response.data.employees ? response.data.employees : 0;
                    let avg_ticket_price = response.data.avg_ticket_price ? response.data.avg_ticket_price : 0;

                    if(response.data.message) {
                        alert(response.data.message);
                    }
                    else{
                        that.summary.customers = customers;
                        that.summary.rides = rides;
                        that.summary.maintenances = maintenances;
                        that.summary.employees = employees;
                        that.summary.avg_ticket_price = avg_ticket_price;
                    }
                })
                .catch(function (error) {
                    console.log(JSON.stringify(error))
                });
        }
    }
}
