import callApi from "../services/callApi.js";

export default {
    template: `
    <div class="row mt-2">
        <div class="col-md-12">
            <div class="card dashboard-body">
                <div class="row">
                    <div class="col-md-8 p-4">
                        <h3>Active User List</h3>
                        <table class="table table-bordered table-hover">
                            <thead class="thead-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Full name</th>
                                    <th>Date of Birth</th>
                                    <th>Contact No</th>
                                    <th>Email Address</th>
                                    <th>User Type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                <tr v-for="(user, index) in users" :key="user.user_id">
                                    <td>{{index}}</td>
                                    <td>{{user.full_name}}</td>
                                    <td>{{ new Date(user.dob)}}</td>
                                    <td>{{user.contact}}</td>
                                    <td>{{user.email_address}}</td>
                                    <td>{{user.user_type}}</td>
                                    <td>
                                        <button class="btn btn-outline-primary" @click="editUser(user)">Edit</button>
                                        <button class="btn btn-outline-danger" @click="DeleteUser(user.user_id)">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="col-md-4 pt-5 pr-5 pb-5">
                        <div class="card">
                            <div class="card-header bg-dark text-white">
                                <h6 class="text-center">
                                    <template v-if="is_edit">Edit User</template>
                                    <template v-else>Add User</template>
                                </h6>
                            </div>
                            
                            <form class="card-body">
                                <div class="form-group">
                                    <label>Full Name</label>
                             
                                    <input type="text" class="form-control" name="full_name" placeholder="Enter Full Name Here" v-model="formData.full_name">
                                </div>
                                
                                <div class="form-group">
                                    <label>Date of Birth</label>
                             
                                    <input type="date" class="form-control" name="dob" placeholder="Enter DOB Here" v-model="formData.dob">
                                </div>
                                
                                
                                <div class="form-group">
                                    <label>Contact</label>
                             
                                    <input type="text" class="form-control" name="contact" placeholder="Enter Contact Here" v-model="formData.contact">
                                </div>
                                
                                <div class="form-group" v-if="!is_edit">
                                    <label>Email Address</label>
                             
                                    <input type="email" class="form-control" name="email" placeholder="Enter Email Here" v-model="formData.email">
                                </div>
                                
                                <div class="form-group" v-if="!is_edit">
                                    <label>Password</label>
                                    <input type="password" class="form-control" name="" placeholder="Enter Password Here" v-model="formData.password">
                                </div>
                                
                                <div class="form-group">
                                    <label>User Type</label>
                                    <select class="form-control" name="user_type" v-model="formData.user_type">
                                        <option value="Admin">Admin</option>
                                        <option value="Employee">Employee</option>
                                        <option value="Customer">Customer</option>
                                    </select>
                                </div>
                                
                                <div class="form-group text-center">
                                    <button type="button" v-if="is_edit" class="btn btn-warning mt-4" @click="UpdateUser">Update</button>
                                    <button type="button" v-else class="btn btn-primary mt-4" @click="AddUser">Add</button>
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
                user_id: '',
                full_name: '',
                dob: '',
                contact: '',
                email: '',
                password: '',
                user_type: ''
            },
            is_edit: false,
            users: [],
        }
    },
    created: function () {
        this.fetchUsers();
    },
    methods: {
        AddUser: function() {
            let that = this;
            callApi.createUser(this.formData)
            .then(function (response) {
                that.formData.full_name = '';
                that.formData.dob = '';
                that.formData.contact = '';
                that.formData.email = '';
                that.formData.password = '';
                that.formData.user_type = '';

                that.fetchUsers();

                alert(response.data.message);
            })
            .catch(function (error) {
                console.log(JSON.stringify(error))
            });
        },
        editUser: function(row) {
            this.formData.full_name = row.full_name;
            this.formData.dob = row.dob;
            this.formData.contact = row.contact;
            this.formData.email = row.email_address;
            this.formData.user_type = row.user_type;
            this.formData.user_id = row.user_id;

            this.is_edit = true;
        },
        UpdateUser: function() {
            let that = this;
            callApi.updateUser(this.formData, this.formData.user_id)
                .then(function (response) {
                    that.formData.full_name = '';
                    that.formData.dob = '';
                    that.formData.contact = '';
                    that.formData.email = '';
                    that.formData.password = '';
                    that.formData.user_type = '';

                    that.fetchUsers();

                    alert(response.data.message);
                })
                .catch(function (error) {
                    console.log(JSON.stringify(error))
                });
        },
        DeleteUser: function(id) {
            if(confirm('Are you sure?')) {
                let that = this;
                callApi.deleteUser(id)
                    .then(function (response) {

                        that.fetchUsers();

                        alert(response.data.message);
                    })
                    .catch(function (error) {
                        console.log(JSON.stringify(error))
                    });
            }
        },
        fetchUsers: function() {
            let that = this;
            callApi.getUsers()
                .then(function (response) {
                    let _data = response.data.users ? response.data.users : [];

                    if(response.data.message) {
                        alert(response.data.message);
                    }
                    else that.users = _data;
                })
                .catch(function (error) {
                    console.log(JSON.stringify(error))
                });
        },
    }
}
