import callApi from "../services/callApi.js";

export default {
    template: `
    <div class="row mt-2">
        <div class="col-md-12">
            <div class="card dashboard-body">
                <div class="row">
                    <div class="col-md-8 p-4">
                        <h3>Active Ride Coaster List</h3>
                        <hr/>
                        <table class="table table-bordered table-hover">
                            <thead class="thead-dark">
                                <tr>
                                    <th>#</th>
                                    <th>name</th>
                                    <th>Type</th>
                                    <th>Price</th>
                                    <th>Capacity</th>
                                    <th>Area</th>
                                    <th>Open Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                <tr v-for="ride in rider_coasters" :key="ride.Ride_coaster_ID"> 
                                    <td>{{ride.Ride_coaster_ID}}</td>
                                    <td>{{ride.Name}}</td>
                                    <td>{{ride.Type}}</td>
                                    <td>{{ride.Price}}</td>
                                    <td>{{ride.Capacity}}</td>
                                    <td>{{ride.area.Area_Name}}</td>
                                    <td>{{new Date(ride.Date_opened)}}</td>
                                    <td>
                                        <button class="btn btn-outline-primary" @click="editRaider(ride)">Edit</button>
                                        <button class="btn btn-outline-danger" @click="deleteRaider(ride.Ride_coaster_ID)">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="col-md-4 pt-5 pr-5 pb-5">
                        <div class="card">
                            <div class="card-header bg-dark text-white">
                                <h5 class="text-center">
                                    <template v-if="is_edit">Edit Rider Coaster</template>
                                    <template v-else>Add Rider Coaster</template>
                                </h5>
                            </div>
                                
                            <form class="card-body">
                                <div class="form-group">
                                    <label>Name</label>
                                    <input type="text" class="form-control" name="name" placeholder="Enter Rider Coaster Name" v-model="formData.name">
                                </div>
                                
                                <div class="form-group">
                                    <label>Type</label>
                                    <input type="text" class="form-control" name="type" placeholder="Enter Type Here" v-model="formData.type">
                                </div>
                                
                                <div class="form-group">
                                    <label>Price</label>
                                    <input type="number" step=".01" class="form-control" name="contact" placeholder="Enter Price Here" v-model="formData.price"/>
                                </div>
                                
                                <div class="form-group">
                                    <label>Capacity</label>
                                    <input type="number" class="form-control" name="email" placeholder="Enter Capacity Here" v-model="formData.capacity">
                                </div>
                                
                                <div class="form-group">
                                    <label>Area</label>
                                    <select name="area" class="form-control" v-model="formData.area">
                                        <option>Select Area</option>
                                        <option v-for="area in areas" :key="area.Area_ID" :value="area.Area_ID">{{area.Area_Name}}</option>
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label>Date Opened</label>
                                    <input type="date" class="form-control" name="email" placeholder="Enter Capacity Here" v-model="formData.date_opened">
                                </div>                                
                                
                                <div class="form-group text-center">
                                    <button type="button" v-if="is_edit" class="btn btn-warning mt-4" @click="updateRider">Update</button>
                                    <button type="button" v-else class="btn btn-primary mt-4" @click="AddRider">Add</button>
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
                id: '',
                name: '',
                type: '',
                price: '',
                capacity: '',
                area: '',
                date_opened: '',
            },
            is_edit: false,
            rider_coasters: [],
            areas: [],
        }
    },
    created: function () {
        this.fetchRidesCoaster();
        this.fetchAreas();
    },
    methods: {
        AddRider: function() {
            let that = this;
            callApi.createRideCoaster(this.formData)
                .then(function (response) {
                    that.formData.name = '';
                    that.formData.type = '';
                    that.formData.price = '';
                    that.formData.capacity = '';
                    that.formData.area = '';
                    that.formData.date_opened = '';

                    that.fetchRidesCoaster();

                    alert(response.data.message);
                })
                .catch(function (error) {
                    console.log(JSON.stringify(error))
                });
        },
        editRaider: function(row){
            this.formData.id = row.Ride_coaster_ID ;
            this.formData.name = row.Name;
            this.formData.type = row.Type;
            this.formData.price = row.Price;
            this.formData.capacity = row.Capacity;
            this.formData.area = row.Area;
            this.formData.date_opened = row.Date_opened;
            this.is_edit = true;
            console.log(this.formData);
        },
        updateRider: function() {
            let that = this;
            callApi.updateRideCoaster(this.formData, this.formData.id)
                .then(function (response) {
                    that.formData.name = '';
                    that.formData.type = '';
                    that.formData.price = '';
                    that.formData.capacity = '';
                    that.formData.area = '';
                    that.formData.date_opened = '';

                    that.fetchRidesCoaster();

                    alert(response.data.message);
                })
                .catch(function (error) {
                    console.log(JSON.stringify(error))
                });
        },
        deleteRaider: function(id){
            if(confirm('Are you sure?')) {
                let that = this;
                callApi.deleteRideCoasterById(id)
                .then(function (response) {

                    that.fetchRidesCoaster();

                    alert(response.data.message);
                })
                .catch(function (error) {
                    console.log(JSON.stringify(error))
                });
            }
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
        fetchAreas: function () {
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
    }
}
