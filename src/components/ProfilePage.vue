<template>
    <main class="main">
        <router-link to="/" class="back">Назад</router-link>
        <img :src="profile.image" alt="" class="img">
        <div class="data">
            <div class="titles">
                <div>Имя</div>
                <div>Фамилия</div>
                <div>Паспорт</div>
                <div>Национальность</div>
                <div>Лицензия на оружие</div>
                <div>Преступления</div>
            </div>
            <div class="content">
                <div class="content_name">{{ profile.name }}</div>
                <div class="content_lastname">{{ profile.lastname }}</div>
                <div class="content_user_id">{{ profile.passport }}</div>
                <div class="content_nat">{{ profile.nat }}</div>
                <div class="content_gunlic">{{ profile.gunlic }}</div>
                <div class="content_crime">{{ profile.crime }}</div>
            </div>
        </div>
    </main>
</template>

<script>
import axios from "axios"

export default {
    name: "ProfilePage",
    data: () => {
        return {
            profile: Object
        }
    },
    mounted() {
        const token = localStorage.getItem('token')
        if (token == null) {
            this.$router.push('/login')
            return
        }
        let user_id = this.$route.params.profile_id
        axios.get(
            `http://127.0.0.1:8000/api/v1/users/user/`,
            {
                params: {
                    user_id
                },
                headers: {
                    'Authorization': token
                }
            }
        )
            .then(res => {
                if (res.status === 200) {
                    this.profile = res.data
                }
            })
            .catch(err => {
                const response = err.response
                console.log(response)
                if (response.status === 401 && response.data.detail === 'Not authenticated') {
                    localStorage.clear()
                    this.$router.push('/login')
                }
                console.log('Что-то пошло не так:\n' + err)
            })
    }
}
</script>

<style lang="sass" scoped>
.main
    display: flex
    background-color: #7f8fa6
    min-height: 100vh
    max-width: 100vw
    justify-content: center
    align-items: center
    flex-direction: column
    padding-bottom: 100px
    @media screen and (max-width: 600px)
        width: 320px

    & .back
        font-size: 24px
        text-decoration: none
        color: #2f3640
        display: inline
        padding-bottom: 25px

    & .img
        width: 320px
        height: 320px
        border: 1px solid black
        outline: none
        margin-bottom: 30px
        @media screen and (max-width: 600px)
            width: 160px
            height: 160px

    & .data
        display: flex
        justify-content: space-between

        & .titles
            & div
                font-size: 32px
                margin-bottom: 15px
                border-bottom: 1px solid #353b48
                color: #353b48
                @media screen and (max-width: 600px)
                    font-size: 16px

        & .content
            display: flex
            flex-direction: column
            justify-content: flex-start
            align-items: center

            & div
                font-size: 32px
                margin-bottom: 15px
                text-align: right
                width: 300px
                border-bottom: 1px solid #353b48
                color: #353b48
                text-transform: capitalize
                @media screen and (max-width: 600px)
                    font-size: 16px
                    width: 120px
</style>