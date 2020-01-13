<template>
    <v-container>
        <v-layout row justify-center>
           <v-flex xs4>

                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                    >
                        <div v-if="isLoading">{{loadingText}}</div>
                        <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                            :disabled="t ? true : false"
                        ></v-text-field>
                        <v-text-field
                            v-model="password"
                            :counter="1"
                            :rules="passwordRules"
                            label="Password"
                            required
                            type="password"
                            :disabled="t ? true : false"
                        ></v-text-field>
                        <v-checkbox
                            v-model="checkbox"
                            label="Remember me"
                            @change="check($event)"
                        ></v-checkbox>

                        <v-btn
                            :disabled='!isComplete'
                            color="success"
                            class="mr-4"
                            @click="submit"
                        >
                        Log In
                        </v-btn>
                        <v-btn
                            color="error"
                            class="mr-4"
                            @click="reset"
                        >
                        Reset
                        </v-btn>
                    </v-form>
           </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

export default {
    name: 'Login',
    computed: {
        isComplete() {
            return this.password && this.email;
        }
    },
    data: () => ({
        t: false,
        checkbox: true,
        valid: true,
        password: '',
        isLoading: false,
        loadingText: 'Loading, please wait...',
        passwordRules: [
            v => !!v || 'Password is required',
            v => (v && v.length >= 1) || 'Password must be longer than 1 character',
        ],
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
    }),
    methods: {
        check() {
            alert('checked')
        },
        reset() {
            //this.$refs.form.reset()
            this.email = '';
            this.password = '';
            this.isLoading = false;
            this.$refs.form.resetValidation();
        },
        submit() {
            this.t = true;
            this.isLoading = true;
            let n = 'x-auth-token';
            let url = 'https://reqres.in/api/login';
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.email,
                    password: 'cityslicka',
                })
            })
            .then( response => {
                this.isLoading = true;
                this.loadingText = "Loading, please wait..."
                if(response.status === 200 ) {
                    return  response.json()
                } else {
                    this.reset();
                    this.t = false;
                    this.isLoading = true;
                    this.loadingText = "Wrong user name or password! Please try again."
                }
            })
            .then(data => {
                this.$store.dispatch('setEmail',{email: this.email})
                document.cookie = n + '=' + data.token;
                this.$router.push('welcome');
                this.isLoading = false;
            })
        }
    }
}

</script>
