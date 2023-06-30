<template>
    <div v-for="user, index in users" :key="index">
        <p>{{ user.name }} {{ user.age }} <button @click="del_user(index)">删除</button></p>
    </div>
</template>


<script lang="ts">

import { reactive } from 'vue';


interface User {
    name: string,
    age: number
}


export default {
    name: "UserView",
    data() {
        return {
            users: reactive<Array<User>>([
                { name: "tuweifeng", age: 18 },
                { name: "luowenfang", age: 18 },
            ])

        }
    },
    methods: {
        del_user: function (index: number) {
            // this.users.splice(index, 1);
        }
    }
}

</script>