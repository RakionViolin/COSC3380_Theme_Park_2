/*import callApi from '../services/callApi.js';
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
                                    <th>Ride Coaster Id</th>
                                    <th>Started Date</th>
                                    <th>Completed Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                <tr v-for="maintenance in maintenances" :key="maintenance.Maintenance_ID">
                                    <td>{{maintenance.coaster.Name}}</td>
                                    <td>{{(new Date(maintenance.Date_Started)).toDateString()}}</td>
                                    <td>{{(new Date(maintenance.Date_Completed)).toDateString()}}</td>
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
        EditMaintenance: function (row) {
            this.formData = row;
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
*/export default {
    template: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="public/stylesheet.css">

    
    </head>
    <body>
    <div class="row mt-2">
        <div class="col-md-12">
            <div class="card dashboard-body">
                <div class="container">

                <div class="header">
                    <a href="/" style="font-size: 12px;">DASHBOARD</a>
                </div>
                <div class="header-r">
                    
                </div>

                <div class="navigation" style="border-right: 1px solid #000;">
                    
                <div class='bar'>View Report</div>
                <br>
                <!-- <a href="/ride_frequency">Search Ride Frequency</a></br></br>
                <a href="/rainouts">Rainouts</a></br></br> -->
                <a href="/search_rainouts">Search Rainouts</a></br></br>
                <a href="/search_maintenance">Search Maintenance</a></br></br>

                
                <div class='bar'>Add Report</div>
                <br>
                <!-- <a href="/report_admission">Daily Admission</a></br></br> -->
                <a href="/report_ridden_ride"> Add a Ride</a></br></br>
                <a href="/report_maintenance">Add a Maintenance</a></br></br>
                <a href="/report_rainout">Add a Rainout </a>

                </div>

                <div class="content">
                    <img src="../img/map1.png" alt="Roller Coaster" class='image'>            
                </div>

                <div class="footer"></div>
            </div>            
        </div>
    </div>
    </body>
</html>`,

    
}
