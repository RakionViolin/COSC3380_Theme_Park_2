import callApi from '../services/callApi.js';

export default {
    template: `
    <div class="row mt-2">
        <div class="col-md-12">
        <div class="card dashboard-body">
                <div class="row">
                    <div class="col-md-7 pt-5 pl-5 pb-5">
                        <h3>Purchase history</h3>
                        <table class="table table-bordered table-striped table-hover">
                            <thead class="thead-dark">
                                <tr class="text-center">
                                    <th>#</th>
                                    <th>Ride Coaster ID</th>
                                    <th>Date</th>
                                    <th>No of Tickets</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                <tr v-for="(ticket, index) in tickets" :key="index">
                                    <td class="text-center">{{index+1}}</td>
                                    <td>{{ticket.tickets.Name}}</td>
                                    <td class="text-center">{{appDateFormat(ticket.admission_date)}}</td>
                                    <td class="text-center">{{ticket.Number_of_Passenger}}</td>
                                    <td class="text-center">&#36; {{ticket.Price}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                
                    <div class="col-md-5 pt-5 pr-5 pb-5">
                        <div class="card">
                            <div class="card-header bg-dark text-white">
                                <h6 class="text-center">Buy Ticket</h6>
                            </div>
                            <form class="card-body">
                                <div class="form-group">
                                    <label for="rides_coaster">Rides Coaster</label>
                                    <select class="form-control" id="rides_coaster" v-model="formData.rides_coaster" v-on:change="getPrice($event)">
                                        <option v-for="coaster in rider_coasters" :key="coaster.Ride_coaster_ID" :value="coaster.Ride_coaster_ID">{{coaster.Name}}</option>                             
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label for="admission_date">Date</label>
                                    <input type="date" class="form-control" id="admission_date" v-model="formData.admission_date">
                                </div>
                                
                                <div class="form-group">
                                    <label for="admission_date">No of Passenger</label>
                                    <input type="number" class="form-control" id="no_of_passenger" v-model="formData.no_of_passenger">
                                </div>
                                
                                <div class="form-group">
                                    <label for="price">Price</label>
                                    <input type="number" class="form-control" id="price" v-model="formData.price">
                                </div>
                                
                                <div class="form-group text-center">
                                    <button class="btn btn-primary" @click="Purchase">Purchase</button>
                                </div>
                            </form> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`,

    data () {
        return {
            formData: {
                rides_coaster:'',
                admission_date: '',
                price: '',
                no_of_passenger: ''
            },
            tickets: [],
            rider_coasters: []
        }
    },
    created: function () {
        this.fetchTickets();
        this.fetchRidesCoaster();
    },

    methods: {
        appDateFormat: function(date){
            let _date = new Date(date);
            let new_date = ('0' + (_date.getDate()+1)).slice(-2)+'/'+('0' + (_date.getMonth()+1)).slice(-2)+'/'+_date.getFullYear();
            console.log(new_date);
            return new_date;
        },
        getPrice: function(e){
            let rc = this.rider_coasters.findIndex(row => row.Ride_coaster_ID == e.target.value);
            console.log(rc);
            this.formData.price = this.rider_coasters[rc].Price;
        },
        Purchase: function(){
            let that = this;
            callApi.createTicket(this.formData)
                .then(function (response) {
                    that.formData.rides_coaster = '';
                    that.formData.admission_date = '';
                    that.formData.no_of_passenger = '';
                    that.formData.price = '';
                    that.fetchTickets();
                    alert(response.data.message)
                })
                .catch(function (error) {
                    console.log(JSON.stringify(error))
                });
        },
        fetchTickets: function () {
            let that = this;
            callApi.getPurchaseHistory()
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
        }
    }
}
