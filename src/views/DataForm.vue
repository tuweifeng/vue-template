
<template>
    <h1>{{ action }} form</h1>
    <div>
        <div v-for="field in formcache" :key="field.key">
            <label :for="`${field.key}`">{{ field.label }}</label>

            <input :disabled="field.key === 'id' ? true : false" type="text" :id="`${field.key}`" :name="`${field.key}`"
                v-model="field.data">
        </div>
        <p>{{ formcache }}</p>
        <button @click="submit()">提交</button>
    </div>
</template>

<script lang="ts">
import { reactive, ref, onMounted } from 'vue';
import store from '@/store';
import axios from '@/axios';

export default {
    props: {
        action: String,
        id: String,
        name: String
    },
    setup(props: any) {
        const formcache = reactive(store.state.formcache);
        const submit = () => {
            let formdata = {} as { [k: string]: string }
            formcache.forEach(field => {
                formdata[field.key] = field.data
            });
            if (props.action === "add") {
                axios.post("student/", formdata).then(response => {
                    console.log(response)
                    history.go(-1)
                })
            }
            if (props.action === "edit") {
                axios.put(`student/${props.id}`, formdata).then(response => {
                    console.log(response)
                    history.go(-1)
                })
            }
        }
        onMounted(() => {
            window.addEventListener('beforeunload', (event) => {
                // 此处可以执行一些代码，例如询问用户是否确定离开页面
                // event.preventDefault()
                // event.returnValue = ''
                console.log("beforeunload")
                localStorage.setItem("formcache", JSON.stringify(formcache))
            })
        })
        return {
            formcache,
            submit
        }

    }
}
</script>