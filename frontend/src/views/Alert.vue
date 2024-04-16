<script setup>

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import SectionMain from "@/components/Base/SectionMain.vue";
import CardBox from "@/components/Card/CardBox.vue";
import FormField from "@/components/Forms/FormField.vue";
import {reactive, ref} from "vue";
import {mdiAccount, mdiBallotOutline, mdiMail} from "@mdi/js";
import SectionTitleLineWithButton from "@/components/Base/SectionTitleLineWithButton.vue";
import FormControl from "@/components/Forms/FormControl.vue";
import BaseDivider from "@/components/Base/BaseDivider.vue";
import BaseButton from "@/components/Base/BaseButton.vue";
import BaseButtons from "@/components/Base/BaseButtons.vue";
import SectionTitle from "@/components/Base/SectionTitle.vue";
import FormCheckRadioGroup from "@/components/Forms/FormCheckRadioGroup.vue";

const selectOptions = [
    {id: 1, label: 'Business development'},
    {id: 2, label: 'Marketing'},
    {id: 3, label: 'Sales'}
]

const form = reactive({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '',
    department: selectOptions[0],
    subject: '',
    question: ''
})

const customElementsForm = reactive({
    checkbox: ['lorem'],
    radio: 'one',
    switch: ['one'],
    file: null
})

const submit = () => {
    //
}

const formStatusCurrent = ref(0)

const formStatusOptions = ['info', 'success', 'danger', 'warning']

const formStatusSubmit = () => {
    formStatusCurrent.value = formStatusOptions[formStatusCurrent.value + 1]
        ? formStatusCurrent.value + 1
        : 0
}
</script>

<template>
    <default-layout>
        <section-main>
            <section-title-line-with-button :icon="mdiBallotOutline" title="Forms example" main>
            </section-title-line-with-button>
            <CardBox form @submit.prevent="submit">
                <FormField label="Grouped with icons">
                    <form-control v-model="form.name" :icon="mdiAccount"/>
                    <form-control v-model="form.email" type="email" :icon="mdiMail"/>
                </FormField>

                <form-field label="With help line" help="Do not enter the leading zero">
                    <form-control v-model="form.phone" type="tel" placeholder="Your phone number"/>
                </form-field>

                <FormField label="Dropdown">
                    <form-control v-model="form.department" :options="selectOptions"/>
                </FormField>

                <base-divider/>

                <form-field label="Question" help="Your question. Max 255 characters">
                    <form-control type="textarea" placeholder="Explain how we can help you"/>
                </form-field>

                <template #footer>
                    <base-buttons>
                        <base-button type="submit" color="info" label="Submit"/>
                        <base-button type="reset" color="info" outline label="Reset"/>
                    </base-buttons>
                </template>
            </CardBox>
        </section-main>

        <section-title>Custom elements</section-title>

        <section-main>
            <card-box>
                <form-field label="Checkbox">
                    <form-check-radio-group
                        v-model="customElementsForm.checkbox"
                        name="sample-checkbox"
                        :options="{ lorem: 'Lorem', ipsum: 'Ipsum', dolore: 'Dolore' }"
                    />
                </form-field>

                <base-divider/>

                <form-field label="Radio">
                    <form-check-radio-group
                        v-model="customElementsForm.radio"
                        name="sample-radio"
                        type="radio"
                        :options="{ one: 'One', two: 'Two' }"
                    />
                </form-field>

                <BaseDivider/>

                <form-field label="Switch">
                    <form-check-radio-group
                        v-model="customElementsForm.switch"
                        name="sample-switch"
                        type="switch"
                        :options="{ one: 'One', two: 'Two' }"
                    />
                </form-field>

                <base-divider/>
            </card-box>

            <section-title>Form with status example</section-title>

            <card-box
                class="md:w-7/12 lg:w-5/12 xl:w-4/12 shadow-2xl md:mx-auto"
                is-form
                is-hoverable
                @submit.prevent="formStatusSubmit"
            >
                <form-field label="Fields">
                    <form-control
                        v-model="form.name"
                        :icon-left="mdiAccount"
                        help="Your full name"
                        placeholder="Name"
                    />
                </form-field>

                <template #footer>
                    <base-button label="Trigger" type="submit" color="info"/>
                </template>
            </card-box>
        </section-main>
    </default-layout>
</template>