<template>
    <main class="main">
        <router-link to="/" class="back">Назад</router-link>
        <img :src="`http://localhost:8000/api/v1/users/${profile.image}`" alt="" class="img">
        <div class="data">
            <div class="data__data">
                <div class="titles">
                    <div>Имя</div>
                    <div>Фамилия</div>
                    <div>Паспорт</div>
                    <div>Национальность</div>
                    <div>Прописка</div>
                </div>
                <div class="content">
                    <div class="content_name">{{ profile.name }}</div>
                    <div class="content_lastname">{{ profile.lastname }}</div>
                    <div class="content_user_id">{{ profile.passport }}</div>
                    <div class="content_nat">{{ profile.nationality }}</div>
                    <div class="content_nat">{{ profile.registration }}</div>
                </div>
            </div>

            <table>
                <tr>
                    <th>Автор</th>
                    <th>Дата</th>
                    <th>Пометка</th>
                    <th></th>
                </tr>
                <tr v-for="tag in profile.tags" v-bind:key="tag.id">
                    <th>{{ tag.author.username }}</th>
                    <td>{{ formatDate(tag.date) }}</td>
                    <td>{{ tag.value }}</td>
                    <td
                        class='remove'
                        :class="tag.may_be_deleted ? 'active' : ''"
                        @click="remove_mark(tag.id, tag.may_be_deleted)"
                    >
                        Удалить
                    </td>
                </tr>
            </table>

            <div class="new_mark">
                <button class="btn" @click="add_mark">
                    Добавить пометку
                </button>
                <input class="input" type="text" v-model="mark" placeholder="Пометка">
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
            profile: Object,
            mark: ''
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
    },
    methods: {
        add_mark() {
            axios.post(
                `http://127.0.0.1:8000/api/v1/users/${this.profile.id}/mark`,
                {
                    value: this.mark
                }, {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                }
            )
                .then(res => {
                        if (res.status === 200) {
                            this.$router.go()
                        }
                    }
                )
                .catch(err => {
                        console.log(err)
                        alert('Ты ввел хуйню, исправляй')
                    }
                )
        },
        remove_mark(mark_id, may_be_deleted) {
            if (may_be_deleted) {
                axios.delete(
                    `http://127.0.0.1:8000/api/v1/users/${this.profile.id}/mark`,
                    {
                        data: {
                            tag_id: mark_id
                        },
                        headers: {
                            'Authorization': localStorage.getItem('token')
                        }
                    }
                )
                    .then(res => {
                            if (res.status === 200) {
                                this.$router.go()
                            }
                        }
                    )
                    .catch(err => {
                            console.log(err)
                            alert('Ты ввел хуйню, исправляй')
                        }
                    )
            }
        },
        formatDate(dateString) {
            const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric"
            }
            return new Date(dateString).toLocaleDateString(undefined, options)
        }
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
        flex-direction: column

        &__data
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

        & .new_mark
            display: flex
            justify-content: space-between
            align-items: flex-end

            & .btn
                margin-top: 15px
                border: 1px solid black
                border-radius: 10px
                width: 40%
                height: 40px
                color: #353b48
                background-color: #7f8fa6
                font-size: 18px
                -webkit-transition: 0.2s
                -moz-transition: 0.2s
                -ms-transition: 0.2s
                -o-transition: 0.2s
                transition: 0.2s

                &:hover
                    cursor: pointer
                    -webkit-transform: scale(1.1)
                    -moz-transform: scale(1.1)
                    -ms-transform: scale(1.1)
                    -o-transform: scale(1.1)
                    transform: scale(1.1)

            & .input
                width: 55%
                padding: 5px 5px 5px 15px
                height: 40px
                border: 1px solid black
                border-radius: 10px
                color: #353b48
                background-color: #7f8fa6
                font-size: 18px
                outline: none


table, th, td
    border: 1px solid #353b48
    text-align: center

.remove
    color: gray

    &:hover
        cursor: pointer

    &.active
        color: black
</style>