<script setup>
import { onMounted, defineEmits, defineProps } from 'vue'

const emit = defineEmits(['removeField'])

const props = defineProps({
    field: Object,
})



const removeField = () => {
    emit('removeField', '');
}

</script>

<template>
    <div>
        <div>
            <div v-if="field.inputType === 'radio'">
                <div class="display form-group">
                    <label :for="'extraFieldOptions' + field.id">Options (Comma-separated, max 5):</label>
                    <input v-model="field.options" class="form-control" :id="'extraFieldOptions' + field.id" type="text">
                </div>
                <div class="form-check" v-for="(option, index) in field.options.split(',')" :key="index">
                    <input name="radio" type="radio" :id="'extraFieldRadio' + field.id + '-' + index"
                        class="form-check-input">
                    <label :for="'extraFieldRadio' + field.id + '-' + index" class="form-check-label">{{ option }}</label>
                </div>
            </div>
            <div v-if="field.inputType === 'dropdown'">
                <div class="display form-group">
                    <label :for="'extraFieldOptions' + field.id">Options (Comma-separated, max 10):</label>
                    <input v-model="field.options" class="form-control" :id="'extraFieldOptions' + field.id" type="text">
                </div>

                <select v-if="field.inputType === 'dropdown'" class="form-control" multiple>
                    <option v-for="(option, index) in field.options.split(',')" :key="index">{{ option }}</option>
                </select>
            </div>
            <div v-if="field.inputType === 'checkbox'">
                <div class="display form-group">
                    <label :for="'extraFieldLabel' + field.id">Label:</label>
                    <input v-model="field.label" class="form-control" :id="'extraFieldLabel' + field.id" type="text">
                </div>
                <div class="form-check">
                    <input :type="field.inputType" :id="'extraFieldCheckbox' + field.id" class="form-check-input"
                        :required="field.required">
                    <label :for="'extraFieldCheckbox' + field.id" class="form-check-label">{{ field.label }}</label>
                </div>
            </div>
            <button class="btn btn-danger btn-sm" @click="removeField">Remove</button>
        </div>
    </div>
</template>