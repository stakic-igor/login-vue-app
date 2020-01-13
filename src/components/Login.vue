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
                            :disabled="disableField"
                        ></v-text-field>
                        <v-text-field
                            v-model="password"
                            :counter="1"
                            :rules="passwordRules"
                            label="Password"
                            required
                            type="password"
                            :disabled="disableField"
                        ></v-text-field>
                        <v-checkbox
                            v-model="checkbox"
                            label="Remember me"
                        ></v-checkbox>

                        <v-btn
                            :disabled='!isComplete'
                            color="success"
                            class="mr-6"
                            @click="onSubmit"
                        >
                        Log In
                        </v-btn>
                        <v-btn
                            color="error"
                            class="mr-6"
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
        disableField: false,
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
        reset() {
            //this.$refs.form.reset()
            this.email = '';
            this.password = '';
            this.isLoading = false;
            this.$refs.form.resetValidation();
        },
        onSubmit() {
            this.disableField = true;
            this.isLoading = true;
            let tokenName = 'x-auth-token';
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
                    this.$store.dispatch('setEmail',{email: this.email})
                    this.$store.dispatch('authUser',{isAutenticated: true})
                    window.localStorage.setItem('saveEmail', this.email)
                    window.localStorage.setItem('authUser', true)
                    this.$router.replace('welcome');
                    return  response.json()
                } else {
                    this.reset();
                    this.disableField = false;
                    this.isLoading = true;
                    this.loadingText = "Wrong user name or password! Please try again."
                }
            })
            .then(data => {
                let now = new Date();
                now.setTime(now.getTime() + 1 * 3600 * 1000);
                document.cookie = tokenName + '=' + data.token + "; expires="+ now.toUTCString() + "; path=/";

                this.isLoading = false;
            })
        }
    }
}

</script>
