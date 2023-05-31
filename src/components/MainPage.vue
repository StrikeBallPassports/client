<template>
    <main class="main">
        <div class="header">
            <input type="search" class="search" v-model="search">
<!--            <div class="filter">-->
<!--                <button class="filter-btn" @click="filter" id="oto">отовичанин</button>-->
<!--                <button class="filter-btn" @click="filter" id="bar">барсогорец</button>-->
<!--            </div>-->
        </div>
        <div class="cards">
            <CardComp v-for="card in searchCards" :key="card.id"
                      :name="card.name"
                      :lastname="card.lastname"
                      :user_id="card.passport"
                      :nat="card.nationality"
                      :registration="card.registration"
                      :image="card.image"
                      :pk="card.id"
            />
        </div>
    </main>
</template>

<script>
import axios from "axios"
import CardComp from "@/components/CardComp";

export default {
    name: "MainPage",
    components: {CardComp},
    data: () => {
        return {
            cards: [],
            search: '',
            nats: ['Отовичанин', 'Барсогорец']
        }
    },
    methods: {
        filter(event) {
            this.search = event.srcElement.innerText
            if (this.search === this.nats[0]) {
                document.querySelectorAll('#bar').forEach(elem => {
                    elem.classList.remove('active')
                })
            } else if (this.search === this.nats[1]) {
                document.querySelectorAll('#oto').forEach(elem => {
                    elem.classList.remove('active')
                })
            }
        }
    },
    mounted() {
        const token = localStorage.getItem('token')
        if (token == null) {
            this.$router.push('/login')
            return
        }
        axios.get(`http://127.0.0.1:8000/api/v1/users/`, {
            headers: {
                'Authorization': token
            }
        })
            .then(res => {
                if (res.status === 200) {
                    this.cards = res.data
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
    computed: {
        searchCards() {
            if (this.search === this.nats[0]) {
                document.querySelectorAll('#oto').forEach(elem => {
                    elem.classList.add('active')
                })
            } else if (this.search === this.nats[1]) {
                document.querySelectorAll('#bar').forEach(elem => {
                    elem.classList.add('active')
                })
            } else {
                document.querySelectorAll('#bar, #oto').forEach(elem => {
                    elem.classList.remove('active')
                })
            }
            return this.cards.filter(user => user.name.toLowerCase().includes(this.search.toLowerCase()) ||
                user.lastname.toLowerCase().includes(this.search.toLowerCase()) ||
                user.user_id.toLowerCase().includes(this.search.toLowerCase()) ||
                user.nat.toLowerCase().includes(this.search.toLowerCase())
            )
        }
    }
}
</script>

<style lang="sass" scoped>
.main
    background-color: #7f8fa6
    min-height: 100vh
    max-width: 100vw

.header
    display: flex
    justify-content: center
    margin-left: 90px
    align-items: center
    padding-top: 25px
    margin-bottom: 10px
    @media screen and (max-width: 600px)
        flex-direction: column
        margin-left: 0

    .search
        width: 360px
        height: 35px
        outline: none
        border: 1px solid gray
        padding: 5px 10px
        margin-right: 25px
        border-radius: 10px
        color: #2f3640
        font-weight: 600
        @media screen and (max-width: 600px)
            width: 180px
            margin-right: 0
            margin-bottom: 10px

    .filter
        display: flex
        justify-content: center
        align-items: center

        &-btn
            text-transform: capitalize
            height: 35px
            border: none
            border-radius: 10px
            padding: 10px
            color: #192a56
            font-size: 18px
            display: flex
            justify-content: center
            align-items: center

            &:hover
                cursor: pointer

            &.active
                background-color: #4cd137

            &:first-child
                border-bottom-right-radius: 0
                border-top-right-radius: 0

            &:last-child
                border-bottom-left-radius: 0
                border-top-left-radius: 0


.cards
    display: flex
    flex-wrap: wrap
    width: 100%
    justify-content: center
    align-items: center

</style>