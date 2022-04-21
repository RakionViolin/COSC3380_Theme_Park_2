import callApi from '../services/callApi.js';
export default {
    template: `
    <div class="row mt-2">
        <div class="col-md-12">
        <div class="card dashboard-body">
                <div class="row">
                    <div class="col-md-7 pt-5 pl-5 pb-5">
                        <h3>Manage Maintenance</h3>
                        <table class="table table-bordered table-striped table-hover">
                            <thead class="thead-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Ride Coaster Id</th>
                                    <th>Started Date</th>
                                    <th>Completed Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                <tr v-for="(maintenance, index) in maintenances" :key="index">
                                    <td>{{index+1}}</td>
                                    <td>{{maintenance.coaster.Name}}</td>
                                    <td>{{appDateFormat(maintenance.Date_Started)}}</td>
                                    <td>{{appDateFormat(maintenance.Date_Started)}}</td>
                                    <td>
                                        <button class="btn btn-outline-primary" @click="EditMaintenance(maintenance)">Edit</button>
                                        <button class="btn btn-outline-danger" @click="DeleteMaintenance(maintenance.Maintenance_ID)">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                
                    <div class="col-md-5 pt-5 pr-5 pb-5">
                        <div class="card">
                            <div class="card-header bg-dark text-white">
                                <h5 class="text-center">
                                    <template v-if="edit_maintenance">Edit Maintenance</template>
                                    <template v-else>Add Maintenance</template>
                                </h5>
                            </div>
                            <form class="card-body">
                                <div class="form-group">
                                    <label for="rides_coaster">Rides Coaster</label>
                                    <select class="form-control" id="rides_coaster" v-model="formData.Rides_Coaster_ID">
                                        <option v-for="coaster in rider_coasters" :key="coaster.Ride_coaster_ID" :value="coaster.Ride_coaster_ID">{{coaster.Name}}</option> 
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label>Started Date</label>
                                    <input type="date" class="form-control" v-model="formData.Date_Started">
                                </div>
                                
                                <div class="form-group">
                                    <label>Completed Date</label>
                                    <input type="date" class="form-control" v-model="formData.Date_Completed">
                                </div>
                                
                                <div class="form-group text-center">
                                    <button class="btn btn-primary" v-if="edit_maintenance" @click="UpdateMaintenance">Update</button>
                                    <button class="btn btn-primary" v-else @click="AddMaintenance">Save</button>
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
                Maintenance_ID: '',
                Date_Started:'',
                Date_Completed: '',
                Rides_Coaster_ID: ''
            },
            rider_coasters: [],
            maintenances: [],
            edit_maintenance: false
        }
    },
    created: function () {
        this.fetchMaintenance();
        this.fetchRidesCoaster();
    },
    methods: {
        appDateFormat: function(date){
            let _date = new Date(date);
            let new_date = ('0' + (_date.getDate()+1)).slice(-2)+'/'+('0' + (_date.getMonth()+1)).slice(-2)+'/'+_date.getFullYear();
            console.log(new_date);
            return new_date;
        },
        dbDateFormat: function(date){
            let _date = new Date(date);
            let new_date = _date.getFullYear()+'-'+('0' + (_date.getMonth()+1)).slice(-2)+'-'+('0' + (_date.getDate()+1)).slice(-2);
            console.log(new_date);
            return new_date;
        },
        AddMaintenance: function(){
            let that = this;
            callApi.addMaintenance(this.formData)
                .then(function (response) {
                    that.formData.Date_Started = '';
                    that.formData.Date_Completed = '';
                    that.formData.Rides_Coaster_ID = '';

                    that.fetchMaintenance();

                    alert(response.data.message);
                })
                .catch(function (error) {
                    console.log(error.data.status);
                    console.log(JSON.stringify(error))
                });
        },
        EditMaintenance: function (row) {console.log(row);
            this.formData.Maintenance_ID = row.Maintenance_ID;
            this.formData.Date_Started = this.dbDateFormat(row.Date_Started);
            this.formData.Date_Completed = this.dbDateFormat(row.Date_Completed);
            this.formData.Rides_Coaster_ID = row.Rides_coaster_ID;
            this.edit_maintenance = true;
            console.log(this.formData);
        },
        UpdateMaintenance: function () {
            let that = this;
            callApi.updateMaintenance(this.formData.Maintenance_ID, this.formData)
                .then(function (response) {
                    that.formData.Maintenance_ID = '';
                    that.formData.Date_Started = '';
                    that.formData.Date_Completed = '';
                    that.formData.Rides_Coaster_ID = '';
                    that.edit_maintenance = false;

                    that.fetchMaintenance();

                    alert(response.data.message);
                })
                .catch(function (error) {
                    console.log(error.data.status);
                    console.log(JSON.stringify(error))
                });
        },
        DeleteMaintenance: function (id) {
            if(confirm('Are you sure?')){
                let that = this;
                callApi.deleteMaintenance(id)
                    .then(function (response) {

                        that.fetchMaintenance();

                        alert(response.data.message);
                    })
                    .catch(function (error) {
                        console.log(error.data.status);
                        console.log(JSON.stringify(error))
                    });
            }
        },
        fetchMaintenance: function () {
            let that = this;
            callApi.getMaintenance()
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
