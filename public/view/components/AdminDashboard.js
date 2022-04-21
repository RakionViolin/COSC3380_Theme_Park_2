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
                                <div class="form-group col-md-4">
                                    <label for="area">Report Type</label>
                                    <select class="form-control" id="area" v-model="report_type">
                                        <option value="Purchase">Purchase History</option> 
                                        <option value="Maintenance">Maintenance History</option> 
                                    </select>
                                </div>
                                
                                <div class="form-group col-md-4">
                                    <label>Date From</label>
                                    <input type="date" class="form-control" v-model="formData.date_from">
                                </div>
                                
                                <div class="form-group col-md-4">
                                    <label>Date to</label>
                                    <input type="date" class="form-control" v-model="formData.date_to">
                                </div>
                                
                                <div class="form-group col-md-4" v-if="report_type === 'Purchase'">
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
                                
                                <div class="form-group col-md-4" v-if="report_type === 'Purchase'">
                                    <label for="area">Area</label>
                                    <select class="form-control" id="area" v-model="formData.area">
                                        <option v-for="area in areas" :key="area.Area_ID" :value="area.Area_ID">{{area.Area_Name}}</option> 
                                    </select>
                                </div>
                                <div class="form-group col-md-4" v-else>
                                    <label for="customer">Employee</label>
                                    <select class="form-control" id="worker" v-model="formData.worker">
                                        <option v-for="worker in workers" :key="worker.user_id" :value="worker.user_id">{{worker.full_name}}</option> 
                                    </select>
                                </div>
                                
                                <div class="form-group col-md-12 text-center">
                                    <button class="btn btn-primary" @click="searchTicket">Find</button>
                                </div>
                            </form>
                        </div>

                        <h3>{{reportTitle}}</h3>
                        <table class="table table-bordered table-hover" v-if="tickets.length">
                            <thead class="thead-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Rides Name</th>
                                    <th>Rides Capacity</th>
                                    <th>Customer Name</th>
                                    <th>Customer Contact</th>
                                    <th>Price</th>
                                    <th>Date</th>
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
                                    <td>{{appDateFormat(ticket.admission_date)}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="table table-bordered table-hover" v-else>
                            <thead class="thead-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Rides Name</th>
                                    <th>Employee Name</th>
                                    <th>Employee Contact</th>
                                    <th>Start Date</th>
                                    <th>Complete Date</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                 <tr v-for="(maintenance, index) in maintenances" :key="maintenance.Ticket_ID">
                                    <td>{{index+1}}</td>
                                    <td>{{maintenance.coaster.Name}}</td>
                                    <td>{{maintenance.worker.full_name}}</td>
                                    <td>{{maintenance.worker.contact}}</td>
                                    <td>{{appDateFormat(maintenance.Date_Started)}}</td>
                                    <td>{{appDateFormat(maintenance.Date_Completed)}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="col-md-4 p-4">
                        <div class="card mb-4">
                            <form class="card-body row">
                                <div class="form-group col-md-6">
                                    <label>Date From</label>
                                    <input type="date" class="form-control" v-model="summaryFormData.date_from">
                                </div>
                                
                                <div class="form-group col-md-6">
                                    <label>Date to</label>
                                    <input type="date" class="form-control" v-model="summaryFormData.date_to">
                                </div>
                                
                                <div class="form-group col-md-12">
                                <label>Report Type</label>
                                    <select class="form-control" id="area" v-model="summary_type">
                                        <option value="Site">Overall Summary</option> 
                                        <option value="Sales">Sales Summary</option> 
                                    </select>
                                </div>
                                
                                <div class="form-group col-md-12 text-center">
                                    <button class="btn btn-primary" @click="searchSummary">Find</button>
                                </div>
                            </form>
                        </div>

                        <h3>{{summaryTitle}}</h3>
                        <table class="table table-bordered table-hover" v-if="!sales">
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
                                    <th>Ticket Sold</th><td>{{summary.sold_tickets}}</td>
                                </tr>
                                <tr>
                                    <th>Sold Amount</th><td>&#36; {{summary.total_sold}}</td>
                                </tr>
                                <tr>
                                    <th>Average Ticket Price</th><td>&#36; {{summary.avg_ticket_price}}</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <table class="table table-bordered table-hover" v-else>
                            <tbody>
                                <tr>
                                    <th>Sold Tickets</th><td>{{sales.sold_tickets}}</td>
                                </tr>
                                <tr>
                                    <th>Total Amount</th><td>{{sales.sold_amount}}</td>
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
            workers: [],
            areas: [],
            rider_coasters: [],
            maintenances: [],
            report_type: 'Purchase',
            reportTitle: 'Report 1: Ticket Purchase History',
            summary_type: 'Site',
            summaryTitle: 'Report 2: Overall Summary',
            summary: {
                customers:'',
                rides:'',
                maintenances: '',
                employees: '',
                total_sold: '',
                sold_tickets: '',
                avg_ticket_price: ''
            },
            sales: '',
            formData: {
                date_from:'',
                date_to:'',
                customer: '',
                rides_coaster: '',
                area: '',
                worker: ''
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
        this.fetchWorkers();
    },
    methods: {
        appDateFormat: function(date){
            let _date = new Date(date);
            let new_date = ('0' + (_date.getDate()+1)).slice(-2)+'/'+('0' + (_date.getMonth()+1)).slice(-2)+'/'+_date.getFullYear();
            console.log(new_date);
            return new_date;
        },
        fetchPurchases: function() {
            let currentDate = new Date();
            let datetime = currentDate.getFullYear() +'-'+ ('0' + (currentDate.getMonth()+1)).slice(-2) +'-' + currentDate.getDate();
            this.formData.date_from = datetime;
            this.formData.date_to = datetime;

            this.searchTicket();
        },
        fetchSummary: function() {
            let currentDate = new Date();
            let datetime = currentDate.getFullYear() +'-'+ ('0' + (currentDate.getMonth()+1)).slice(-2) +'-' + currentDate.getDate();
            this.summaryFormData.date_from = datetime;
            this.summaryFormData.date_to = datetime;

            this.searchSummary();
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
        fetchWorkers: function () {
            let that = this;
            callApi.getWorkers()
                .then(function (response) {
                    let _data = response.data.users ? response.data.users : [];

                    if(response.data.message) {
                        alert(response.data.message);
                    }
                    else that.workers = _data;
                })
                .catch(function (error) {
                    console.log(JSON.stringify(error))
                });
        },
        searchTicket : function () {
            let that = this;

            if(this.report_type === "Purchase"){
                this.reportTitle = "Report 1: Ticket Purchase History";
                this.maintenances = [];

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
            }else{
                that.tickets = [];
                this.reportTitle = "Report 3: Maintenance History"
                callApi.searchMaintenance(this.formData)
                    .then(function (response) {
                        let _data = response.data.maintenances ? response.data.maintenances : [];

                        if(response.data.message) {
                            alert(response.data.message);
                        }
                        else that.maintenances = _data;
                    })
                    .catch(function (error) {
                        console.log(JSON.stringify(error))
                    });
            }

        },
        searchSummary : function () {
            let that = this;
            if (this.summary_type === 'Site'){
                this.summaryTitle = 'Report 2: Overall Summary';
                this.sales = '';
                callApi.searchSiteSummary(this.summaryFormData)
                    .then(function (response) {
                        let customers = response.data.customers ? response.data.customers : 0;
                        let rides = response.data.rides ? response.data.rides : 0;
                        let maintenances = response.data.maintenances ? response.data.maintenances : 0;
                        let employees = response.data.employees ? response.data.employees : 0;
                        let avg_ticket_price = response.data.sold ? (response.data.sold.sold_amount/response.data.sold.sold_tickets).toFixed(2) : 0;
                        if(response.data.message) {
                            alert(response.data.message);
                        }
                        else{
                            that.summary.customers = customers;
                            that.summary.rides = rides;
                            that.summary.maintenances = maintenances;
                            that.summary.employees = employees;
                            that.summary.total_sold = response.data.sold ? response.data.sold.sold_amount : 0;
                            that.summary.sold_tickets = response.data.sold ? response.data.sold.sold_tickets : 0;
                            that.summary.avg_ticket_price = avg_ticket_price;
                        }
                    })
                    .catch(function (error) {
                        console.log(JSON.stringify(error))
                    });
            }else{
                this.summaryTitle = "Report 4: Sales Summary";
                callApi.searchSales(this.summaryFormData)
                    .then(function (response) {
                        let _data = response.data.sales ? response.data.sales : [];

                        if(response.data.message) {
                            alert(response.data.message);
                        }
                        else that.sales = _data[0];
                    })
                    .catch(function (error) {
                        console.log(JSON.stringify(error))
                    });
            }

        }
    }
}
