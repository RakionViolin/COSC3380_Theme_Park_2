import callApi from '../services/callApi.js';

export default {
    template: `
    <div class="row mt-2">
        <div class="col-md-12">
            <div class="card dashboard-body">
                <div class="row">
                    <div class="col-md-8 p-4">
                        <h3>Active Area List</h3>
                        <hr/>
                        <table class="table table-bordered table-hover">
                            <thead class="thead-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Area name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                <tr v-for="area in areas" :key="area.Area_ID">
                                    <td>{{area.Area_ID}}</td>
                                    <td>{{area.Area_Name}}</td>
                                    <td>
                                        <button class="btn btn-outline-primary" @click="EditArea(area)">Edit</button>
                                        <button class="btn btn-outline-danger" @click="DeleteArea(area.Area_ID)">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-md-4 pt-5 pr-5 pb-5">
                        <div class="card">
                            <div class="card-header bg-dark text-white">
                                <h5 class="text-center">
                                    <template v-if="is_edit">Edit Area</template>
                                    <template v-else>Add Area</template>
                                </h5>
                            </div>
                                
                            <form class="card-body">
                                <div class="form-group">
                                    <label>Area Name</label>
                             
                                    <input type="text" class="form-control" name="area_name" placeholder="Enter Email Here" v-model="formData.area_name">
                                </div>
                                
                                <div class="form-group text-center">
                                    <button type="button" v-if="is_edit" class="btn btn-warning mt-4" @click="updateArea">Update</button>
                                    <button type="button" v-else class="btn btn-primary mt-4" @click="AddArea">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <hr/>
                    <div class="col-md-8 p-4">
                        <h3>Rainout Area List</h3>
                        <hr/>
                        <table class="table table-bordered table-hover">
                            <thead class="thead-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Area ID</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                <tr v-for="area in rainout_areas" :key="area.Area_ID">
                                    <td>{{area.Rainout_ID}}</td>
                                    <td>{{area.Area_ID}}</td>
                                    <td>{{area.Date_}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="col-md-4 pt-5 pr-5 pb-5">
                        <div class="card">
                            <div class="card-header bg-dark text-white">
                                <h5 class="text-center">Add Rainout Area</h5>
                            </div>
                                
                            <form class="card-body">
                                <div class="form-group">
                                    <label>Area Name</label>
                             
                                    <select class="form-control" name="area_id" v-model="RainoutFormData.area_id">
                                        <option v-for="area in areas" :key="area.Area_ID" :value="area.Area_ID">{{area.Area_Name}}</option>
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label for="admission_date">Date</label>
                                    <input type="date" class="form-control" id="date" v-model="RainoutFormData.date">
                                </div>
                                
                                <div class="form-group text-center">
                                    <button type="button" class="btn btn-primary mt-4" @click="AddRainOutArea">Add</button>
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
                area_name: '',
                area_id: '',
            },
            RainoutFormData: {
                date: '',
                area_id: '',
            },
            is_edit: false,
            areas: [],
            rainout_areas: []
        }
    },
    created: function() {
        this.fetchAreas();
        this.fetchRainOutAreas();
    },
    methods: {
        AddArea: function() {
            let that = this;
            callApi.createArea(this.formData)
            .then(function (response) {
                that.formData.area_name = '';

                that.fetchAreas();

                alert(response.data.message);
            })
            .catch(function (error) {
                console.log(error.data.status);
                console.log(JSON.stringify(error))
            });
        },
        EditArea: function(row){
            this.formData.area_name = row.Area_Name;
            this.formData.area_id = row.Area_ID;
            this.is_edit = true;
        },
        updateArea: function() {
            let that = this;
            callApi.updateArea(this.formData, this.formData.area_id)
                .then(function (response) {
                    that.formData.area_name = '';
                    that.formData.area_id = '';
                    that.is_edit = false;
                    that.fetchAreas();

                    alert(response.data.message);
                })
                .catch(function (error) {
                    console.log(error.data.status);
                    console.log(JSON.stringify(error))
                });
        },
        DeleteArea: function(id){
            if(confirm('Are you sure?')) {
                let that = this;
                callApi.deleteAreaById(id)
                    .then(function (response) {

                        that.fetchAreas();

                        alert(response.data.message);
                    })
                    .catch(function (error) {
                        console.log(error.data.status);
                        console.log(JSON.stringify(error))
                    });
            }
        },
        AddRainOutArea: function() {
            let that = this;
            callApi.addRainOut(this.RainoutFormData)
                .then(function (response) {
                    that.RainoutFormData.area_id = '';
                    that.RainoutFormData.date = '';

                    that.fetchRainOutAreas();

                    alert(response.data.message);
                })
                .catch(function (error) {
                    console.log(error.data.status);
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
        fetchRainOutAreas: function () {
            let that = this;
            callApi.getRainOutAreas()
                .then(function (response) {
                    let _data = response.data.areas ? response.data.areas : [];

                    if(response.data.message) {
                        alert(response.data.message);
                    }
                    else that.rainout_areas = _data;
                })
                .catch(function (error) {
                    console.log(JSON.stringify(error))
                });
        }
    }
}
