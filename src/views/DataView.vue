<template>
    <button @click="to_add">add</button>
    <router-link :to="{ name: 'hello', params: { 'msg': 'tuweifeng' } }">hello</router-link>
    <table>
        <tr>
            <th v-for="label, field in field_lables" :key="field">{{ label }}</th>
            <th>操作</th>
        </tr>
        <tbody>
            <tr v-for="item, index in itemlist" :key="index">
                <td v-for="lable, field in field_lables" :key="field">{{ get_field_value(item, field) }}</td>
                <td>
                    <button @click="to_delete(index)">删除</button>
                    <button @click="to_edit(index)">修改</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>


<script lang="ts">

import { reactive, toRefs } from 'vue'
import axios from '@/axios'
import router from '@/router'
import store from '@/store'

export default {
    setup() {
        const data = reactive({
            itemlist: [],
            field_lables: {} as { [k: string]: string }
        })
        axios.get("student/fields/").then(function (response) {
            let a = {};
            data.field_lables = response.data

        }).then(function () {
            // const fields = Object.keys(data.field_lables).join(",")
            const query_param = "fields=id,name,age&offset=0&limit=20"
            axios.get(`student?${query_param}`).then(function (response) {
                data.itemlist = reactive(response.data.results)
            })
        })

        const get_field_value = (target: object, filed: string | number): string | number => {
            return Reflect.get(target, filed)
        }


        const to_add = () => {
            let formcache: any[] = [];
            for (let field in data.field_lables) {
                formcache.push({ key: field, label: data.field_lables[field], data: "" })
            }
            store.commit("update_formcache", formcache)
            router.push({ name: 'form', params: { name: "student", action: "add", id: "-1" } })

        }

        const to_delete = (index: number) => {
            const target = data.itemlist[index];
            axios.delete(`student/${target['id']}`).then(response => {
                console.log(response)
                data.itemlist.splice(index, 1)
            })
        }

        const to_edit = (index: number) => {
            let formcache: any[] = [];
            const target = data.itemlist[index];
            for (let field in data.field_lables) {
                formcache.push({ key: field, label: data.field_lables[field], data: target[field] })
            }
            store.commit("update_formcache", formcache)
            router.push({ name: 'form', params: { name: "student", action: "edit", id: target["id"] } })

        }

        return {
            ...toRefs(data),
            get_field_value,
            to_add,
            to_edit,
            to_delete
        }

    },
}
</script>
