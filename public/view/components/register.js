import callApi from '../services/callApi.js';

export default {
    template: `
    <div class="row mt-2">
        <div class="col-md-8">
            <div class="content">
                <h1>Thrills n' Chills <br><span>Theme park</span> <br></h1>
                <p class="par"> The experience of a lifetime is closer than you think! Thrills n' Chills theme park will immerse you<br>  
                with fun times, exciting activites, and unforgettable memories.<br> Are you ready to expeirence some Thrills n' Chills?</p>

               <button class="cn"><a href="about-us.html">LEARN MORE</a></button>
            </div>
        </div>
        
        <div class="col-md-4">
            <div class="card p-4 card-login-form">
                <h2 class="card-title text-center">Sign Up</h2>
                <div class="form-group">
                    <label>Full Name</label>
             
                    <input type="text" class="form-control" name="full_name" placeholder="Enter Full Name Here" v-model="full_name">
                </div>
                
                <div class="form-group">
                    <label>Date of Birth</label>
             
                    <input type="date" class="form-control" name="dob" placeholder="Enter DOB Here" v-model="dob">
                </div>
                
                
                <div class="form-group">
                    <label>Contact</label>
             
                    <input type="text" class="form-control" name="contact" placeholder="Enter Contact Here" v-model="contact">
                </div>
                
                <div class="form-group">
                    <label>Email Address</label>
             
                    <input type="email" class="form-control" name="email" placeholder="Enter Email Here" v-model="email">
                </div>
                
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" name="" placeholder="Enter Password Here" v-model="password">
                </div>
                
                <div class="form-group text-center">
                    <button class="btn btn-outline-primary" @click="created">Register</button>
                </div>
                
                <div class="row pl-4">
                    <p class="link">Already have an account? <a href="#/login">Login </a> here</a></p>
                </div>
                
            </div>
        </div>
    </div>`,

    data () {
        return {
            full_name: '',
            dob: '',
            contact: '',
            email: '',
            password: ''
        }
    },
    methods: {
        created: function () {
            let data = {
                full_name: this.full_name,
                dob: this.dob,
                contact: this.dob,
                email: this.email,
                password: this.password
            }

            callApi.register(data)
                .then(function (response) {
                    if(response.data.status == 200) {
                        localStorage.setItem('loggedInUser', JSON.stringify(response.data.user));
                        localStorage.setItem('ThemeParkaccessToken', response.data.accessToken);
                        window.location.reload();
                    }
                    else alert(response.data.message);
                })
                .catch(function (error) {
                    console.log(error.data.status);
                    console.log(JSON.stringify(error))
                });
        }
    }
}
