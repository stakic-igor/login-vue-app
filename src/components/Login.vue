<template>
    <v-container>
        <v-layout row justify-center>
           <v-flex xs2>

                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                    >
                        <div v-if="isLoading">Loading, please wait....</div>
                        <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="password"
                            :counter="1"
                            :rules="passwordRules"
                            label="Password"
                            required
                        ></v-text-field>
                        <v-checkbox
                            v-model="checkbox"
                            label="Remember me"
                        ></v-checkbox>

                        <v-btn
                            :disabled="!valid"
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
    data: () => ({
        checkbox: true,
        valid: true,
        password: '',
        isLoading: false,
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
            this.$refs.form.resetValidation()
        },
        submit() {

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
                    password: 'blabal',
                })
            })
            .then( response => {
                response.json()
                //this.isLoading = true;
            })
            .then(data => {
                document.cookie = n + '=' + data.token;
                //this.isLoading = false;
                })
            .catch(function (error) {
                alert('Request failure: ', error);
            });
        }}
    }

</script>
