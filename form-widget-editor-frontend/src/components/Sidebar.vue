<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import CustomField from './CustomField.vue'


const baseUrl = window.location.origin
const title = ref('Form Title')
const subtitle = ref('Form Subtitle')
const titleFontSize = ref('16px')
const titleColor = ref('#000000')
const titleAlignment = ref('left')
const subtitleFontSize = ref('14px')
const subtitleColor = ref('#333333')
const subtitleAlignment = ref('left')
const submitButtonBackground = ref('007bff')
const submitButtonText = ref('Submit')
const firstNameRequired = ref(true)
const lastNameRequired = ref(true)
const emailLabel = ref('Email')
const extraFields = ref([])
const uniqueId = ref('')

const addInputField = () => {
    extraFields.value.push({ id: Date.now(), inputType: 'text', label: 'Custom Input' });
}

const addCheckboxField = () => {
    if (extraFields.value.filter(field => field.inputType === 'checkbox').length < 3) {
        extraFields.value.push({ id: Date.now(), inputType: 'checkbox', label: 'Custom Checkbox', required: false });
    } else {
        alert('You can only add up to 3 checkboxes.');
    }
}

const addRadioButtonField = () => {
    if (extraFields.value.filter(field => field.inputType === 'radio').length < 3) {
        extraFields.value.push({ id: Date.now(), inputType: 'radio', label: 'Custom Radio', options: '', maxOptions: 5 });
    } else {
        alert('You can only add up to 3 radio buttons.');
    }
}

const addDropdownField = () => {
    if (extraFields.value.filter(field => field.inputType === 'dropdown').length < 3) {
        extraFields.value.push({ id: Date.now(), inputType: 'dropdown', label: 'Custom Dropdown', options: '', maxOptions: 10 });
    } else {
        alert('You can only add up to 3 dropdowns.');
    }
}

const removeExtraField = (i) => {
    extraFields.value.splice(i, 1);
}

const saveForm = async () => {
    var htmlCode = document.getElementById('priview_form')
    await axios.post('http://127.0.0.1:8080/api/form-settings', { htmlCode: htmlCode.outerHTML }).then((res) => {
        uniqueId.value = res.data.uniqueId
        getLink()
    })
}

const getLink = async () => {
    if (uniqueId.value) {
        await axios.get(`http://127.0.0.1:8080/api/get-form-widget?uniqueId=${uniqueId.value}`).then((res) => {
        })
    }
}


</script>

<template>
    <div>
        <div class="row w-100vh">
            <div class="col-6">
                <div class="sidebar">
                    <h2>Sidebar Settings</h2>
                    <div class="title row flex-wrap align-items-center">
                        <div class="form-group col-6">
                            <label for="title">Title:</label>
                            <input v-model="title" class="form-control" id="title" type="text">
                        </div>
                        <div class="form-group col-6">
                            <label for="titleFontSize">Title Font Size:</label>
                            <input v-model="titleFontSize" class="form-control" id="titleFontSize" type="text">
                        </div>
                        <div class="form-group col-6">
                            <label for="titleColor">Title Color:</label>
                            <input v-model="titleColor" class="form-control" id="titleColor" type="color">
                        </div>
                        <div class="form-group col-6">
                            <label for="titleAlignment">Title Text Alignment:</label>
                            <select v-model="titleAlignment" class="form-control" id="titleAlignment">
                                <option value="left">Left</option>
                                <option value="center">Center</option>
                                <option value="right">Right</option>
                            </select>
                        </div>
                    </div>
                    <div class="subtitle row flex-wrap align-items-center">
                        <div class="form-group col-6">
                            <label for="subtitle">Subtitle:</label>
                            <input v-model="subtitle" class="form-control" id="subtitle" type="text">
                        </div>
                        <div class="form-group col-6">
                            <label for="subtitleFontSize">Subtitle Font Size:</label>
                            <input v-model="subtitleFontSize" class="form-control" id="subtitleFontSize" type="text">
                        </div>
                        <div class="form-group col-6">
                            <label for="subtitleColor">Subtitle Color:</label>
                            <input v-model="subtitleColor" class="form-control" id="subtitleColor" type="color">
                        </div>
                        <div class="form-group col-6">
                            <label for="subtitleAlignment">Subtitle Text Alignment:</label>
                            <select v-model="subtitleAlignment" class="form-control" id="subtitleAlignment">
                                <option value="left">Left</option>
                                <option value="center">Center</option>
                                <option value="right">Right</option>
                            </select>
                        </div>
                    </div>
                    <div class="row align-items-center flex-wrap">
                        <div class="form-group col-6">
                            <label for="submitButtonBackground">Submit Button Background Color:</label>
                            <input v-model="submitButtonBackground" class="form-control" id="submitButtonBackground"
                                type="color">
                        </div>
                        <div class="form-group col-6">
                            <label for="submitButtonText">Submit Button Text:</label>
                            <input v-model="submitButtonText" class="form-control" id="submitButtonText" type="text">
                        </div>
                    </div>
                    <h3>Input Fields</h3>
                    <div class="row align-items-center flex-wrap">
                        <div class="form-check col-6">
                            <input type="checkbox" v-model="firstNameRequired" class="form-check-input">
                            <label class="form-check-label">First Name Required</label>
                        </div>
                        <div class="form-check col-6">
                            <input type="checkbox" v-model="lastNameRequired" class="form-check-input">
                            <label class="form-check-label">Last Name Required</label>
                        </div>
                        <div class="form-group col-6">
                            <label for="extraFieldLabel">Email Label:</label>
                            <input v-model="emailLabel" class="form-control" id="extraFieldLabel" type="text">
                        </div>
                    </div>
                    <!-- <button class="btn btn-primary" @click="addInputField">Add Input</button> -->
                    <div class="d-flex align-items-center flex-wrap">
                        <button class="btn my-2 mr-2 btn-primary" @click="addCheckboxField">Add Checkbox</button>
                        <button class="btn my-2 mr-2 btn-primary" @click="addRadioButtonField">Add Radio Button</button>
                        <button class="btn my-2 mr-2 btn-primary" @click="addDropdownField">Add Dropdown</button>
                        <button class="btn my-2 mr-2 btn-success" @click="saveForm">Save</button>
                    </div>
                </div>
            </div>

            <div class="col-6 d-flex justify-content-center">
                <div class="preview">
                    <h2>Dynamic Preview</h2>
                    <div id="priview_form" class="form-preview">
                        <h3 :style="{
                            'font-size': titleFontSize,
                            'color': titleColor,
                            'text-align': titleAlignment
                        }">{{ title }}</h3>
                        <p :style="{
                            'font-size': subtitleFontSize,
                            'color': subtitleColor,
                            'text-align': subtitleAlignment
                        }">{{ subtitle }}</p>
                        <form>
                            <div class="form-group">
                                <label for="firstName">First Name:</label>
                                <input type="text" class="form-control" id="firstName" :required="firstNameRequired">
                            </div>
                            <div class="form-group">
                                <label for="lastName">Last Name:</label>
                                <input type="text" class="form-control" id="lastName" :required="lastNameRequired">
                            </div>
                            <div class="form-group">
                                <label for="email">Email Address:</label>
                                <input type="email" class="form-control" id="email" :required="true">
                            </div>

                            <!-- Render extra fields dynamically -->
                            <custom-field v-for="(field, index) in extraFields" :key="index" :field="field"
                                @removeField="removeExtraField(index)"></custom-field>

                            <button type="submit" class="btn mt-2 btn-primary" :style="{
                                'background-color': submitButtonBackground
                            }">{{ submitButtonText }}</button>

                            <div v-if="uniqueId" class="mt-3">
                                <router-link :to="{ name: 'widgets', params: { url: uniqueId } }">{{
                                    `${baseUrl}/widgets/${uniqueId}` }}</router-link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scopped>
.w-100vh {
    width: 100vh;
}
</style>