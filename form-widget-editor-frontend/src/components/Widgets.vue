<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
const route = useRoute()

const htmlData = ref('')

const getLink = async () => {
    await axios.get(`http://127.0.0.1:8080/api/get-form-widget?uniqueId=${route.params.url}`)
        .then((res) => {
            htmlData.value = res.data.htmlCode
        })
    setTimeout(() => {
        hideElementsWithClass('display')
    }, 10)
}

const hideElementsWithClass = (className) => {
    const elements = document.getElementsByClassName(className);

    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
    }
}

onMounted(async () => {
    getLink()
})


</script>

<template>
    <div>
        <div v-html="htmlData">

        </div>
    </div>
</template>

<style scoped></style>