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
                        :disabled="isDisableField"
                    ></v-text-field>
                    <v-text-field
                        v-model="password"
                        :counter="1"
                        :rules="passwordRules"
                        label="Password"
                        required
                        type="password"
                        :disabled="isDisableField"
                    ></v-text-field>
                    <v-checkbox
                        v-model="checkbox"
                        label="Remember me"
                    ></v-checkbox>
                    <v-layout row wrap>
                        <v-flex class="text-md-left">
                            <v-btn
                                color="error"
                                @click="onReset"
                            >
                            Reset
                            </v-btn>
                        </v-flex>
                        <v-flex xs12 md6 class="text-md-right">
                            <v-btn
                                :disabled='!valid'
                                color="success"
                                @click="onSubmit"
                            >
                            Log In
                            </v-btn>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap class="mt-6">
                        <v-flex xs12 class="text-md-center">
                            <v-btn
                                @click="onShowDetails"
                            >
                            Forgot email or password
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
        isDisableField: false,
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
        onReset() {
            //this.$refs.form.reset()
            this.email = '';
            this.password = '';
            this.isLoading = false;
            this.valid = true;
            this.$refs.form.resetValidation();
        },
        onSubmit() {
            this.valid = false;
            // this could be set to store and dispatch action as well
            // it is set on this way just to demostrate different approach
            this.isDisableField = true;
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
                    this.onReset();
                    this.isDisableField = false;
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
        },
        onShowDetails() {
            alert('Please use this email: eve.holt@reqres.in. For password type any character')
        }
    }
}

</script>
