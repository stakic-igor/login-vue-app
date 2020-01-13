<template>
    <v-container>
        <v-layout row justify-center>
           <v-flex xs4>
                <v-form
                    ref="form"
                    v-model="valid"
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
                    <v-layout row wrap justify-space-between>
                        <v-flex>
                            <v-btn
                                color="error"
                                @click="reset"
                            >
                            Reset
                            </v-btn>
                        </v-flex>
                        <v-flex xs12 md6>
                            <v-btn
                                :disabled='!valid'
                                color="success"
                                @click="onSubmit"
                            >
                            Log In
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-form>
           </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

export default {
    name: 'Login',
    data: () => ({
        disableField: false,
        checkbox: true,
        valid: false,
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
            // this could be set to store and dispatch action as well
            // it is set on this way just to demostrate different approach
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
                    password: this.password,
                })
            })
            .then( response => {
                this.isLoading = true;
                this.loadingText = "Loading, please wait..."
                if(response.status === 200 ) {
                    this.$store.dispatch('setEmail',{email: this.email})
                    this.$store.dispatch('authUser',{isAutenticated: true})
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
