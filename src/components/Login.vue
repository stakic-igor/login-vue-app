<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-row
                :align="alignment"
                :justify="justify"
                class="grey lighten-5"
                style="height: 300px;"
                >
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                >
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
                        :checked="checked"
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
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'Login',
    data: () => ({
        checkbox: true,
        valid: true,
        password: '',
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
            
            fetch('https://reqres.in/api/login', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: "eve.holt@reqres.in",
                password: "cityslicka"
                })
            })
            .then(function (data) {
                alert('Request success: ', data);
            })
            .catch(function (error) {
                alert('Request failure: ', error);
            });
        }}
    }
</script>