<template>
    <div id="app">
        <form @submit.prevent="login">
            <input v-model="username" placeholder="username">
            <input v-model="password" placeholder="password" type="password">
            <input type="submit" value="log in">
        </form>
    </div>
</template>

<script>
import axios from "axios"

export default {
    name: "LoginPage",
    data() {
        return {
            username: "",
            password: ""
        };
    },
    methods: {
        login() {
            let body = new FormData()
            body.append('username', this.username)
            body.append('password', this.password)
            axios.post(
                'http://127.0.0.1:8000/api/v1/users/token',
                body
            )
                .then(res => {
                        if (res.status === 200) {
                            localStorage.setItem('token', `${res.data.token_type} ${res.data.access_token}`)
                            this.$router.push('/')
                        }
                    }
                )
                .catch(err => {
                        localStorage.clear()
                        console.log(err)
                        alert('Ты ввел хуйню, исправляй')
                    }
                )
        }
    },
    mounted() {
        axios.get(
            'http://127.0.0.1:8000/api/v1/users/',
            {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
        )
            .then(res => {
                    if (res.status === 200) {
                        this.$router.push('/')
                    }
                }
            )
            .catch(err => {
                    localStorage.clear()
                    console.log(err)
                    console.log('Солнышко, твой токен не действителен, надо б ещё разик залогиниться')
                }
            )
    }
}
</script>
<style scoped>

</style>