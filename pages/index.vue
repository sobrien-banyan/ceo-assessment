<script setup>
import { ref } from 'vue';

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const title = ref('');
const role = ref('');
const specifiedRole = ref('');
const organizationName = ref('');
const workLocation = ref('');
const employeeCount = ref('');
const primaryReason = ref('');
const howDidYouHearAboutUs = ref('');

const submitForm = async () => {
    const data = await useFetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({
            "name": firstName.value + ' ' + lastName.value,
            "email": email.value,
            "title": title.value,
            "role": `${role.value === "Other: Specify" ? specifiedRole.value : role.value}`,
            "organizationName": organizationName.value,
            "workLocation": workLocation.value,
            "employeeCount": employeeCount.value,
            "primaryReason": primaryReason.value,
            "howDidYouHearAboutUs": howDidYouHearAboutUs.value,
        }),
    });
    if (data.data.value.id) {
        navigateTo(`/assessment/${data.data.value.id}?UserName=${data.data.value.name}&Email=${data.data.value.email}`);
    }
};



const titles = ['Associate', 'Manager', 'Director', 'Executive'];
const roles = [
    "Owner",
    "Human Resources",
    "Talent Acquisition",
    "Executive/ Leadership",
    "Operations/ Management",
    "Public/ Community Relations",
    "Other: Specify",
];
const employeeCounts = [
    "1-49",
    "50-999",
    "1,000-4,999",
    "5,000 or more",
    "Unsure",
];

const reasons = [
    "Talent Pipelines",
    "Corporate Social Responsibility",
    "Diversity, Equity, Inclusion",
    "Compliance with External Policy",
    "Compliance with Internal Policy",
    "Other",
];


const states =
    ['Nationwide', 'Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']

</script>

<template>
    <section class="welcome-container">
        <div class="green-circle"></div>

        <div class="flex top-container px-8 mx-auto items-center justify-between flex-col py-4 relative z-10 h-full">
            <div class="wrapper px-8 flex mx-auto items-center justify-between flex-col h-full">
                <div class="header-text-container">
                    <h1 class="header-text text-center text-5xl text-white">Fair Chance Employment</h1>
                    <h1 class="header-text text-center text-5xl text-white">Self-Assessment</h1>
                </div>
                <div class="text-wrapper">
                    <div class="text text-center">A fair chance employer is one that is willing to consider an applicant’s skills before considering a past criminal conviction. Please utilize this assessment to explore your company’s current hiring practices, and to learn more about how your fair chance hiring practices can grow!</div>
                    <div class="text text-center mt-8">To start the assessment, please fill out the form below.</div>
                </div>
            </div>
        </div>
    </section>


    <section class="flex mx-auto lg:items-center lg:justify-between flex-col py-4 bg-tan">
        <form @submit.prevent="submitForm">
            <div class="space-y-12 m-5 wrapper">
                <div class="pb-12">
                    <h2 class="text-2xl font-semibold leading-7 text-gray-900">Your information</h2>
                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-3 input-container">
                            <label for="firstName" class="block font-bold leading-6 text-gray-900">First name</label>
                            <div class="mt-2">
                                <input v-model="firstName" required type="text" name="firstName" id="firstName"
                                    placeholder="First name" autocomplete="given-name"
                                    class="block w-full h-14  border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 placeholder:pl-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6">
                            </div>
                        </div>
                        <div class="sm:col-span-3 input-container">
                            <label for="last-name" class="block  font-bold leading-6 text-gray-900">Last name</label>
                            <div class="mt-2">
                                <input v-model="lastName" required type="text" name="last-name" id="last-name"
                                    placeholder="Last name" autocomplete="family-name"
                                    class="block w-full h-14 border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 placeholder:pl-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6">
                            </div>
                        </div>
                        <div class="sm:col-span-3 input-container">
                            <label for="email" class="block font-bold leading-6 text-gray-900">Email</label>
                            <div class="mt-2">
                                <input v-model="email" required type="email" name="email" id="email"
                                    placeholder="Email" autocomplete="email"
                                    class="block w-full h-14  border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 placeholder:pl-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6">
                            </div>
                        </div>
                        <div class="sm:col-span-3 input-container">
                            <label for="title" class="block  font-bold leading-6 text-gray-900">What is your title?</label>
                            <div class="mt-2">
                                <select v-model="title" required id="title" name="title" autocomplete="title"
                                    class="block w-full h-14 border-0 px-4 p-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:leading-6">
                                    <option value="" disabled>Select a title</option>
                                    <option v-for="title in titles" :value="title">{{ title }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="sm:col-span-3 input-container">
                            <label for="role" class="block  font-bold leading-6 text-gray-900">What is your role in your
                                organization/ company?</label>
                            <div class="mt-2">
                                <select v-model="role" required id="role" name="role" autocomplete="role"
                                    class="block w-full h-14 border-0 px-4 p-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:leading-6">
                                    <option value="" disabled>Select a role</option>
                                    <option v-for="role in roles" :value="role">{{ role }}</option>
                                </select>
                            </div>
                        </div>
                        <Transition>
                        <div v-if="role === 'Other: Specify'" class="sm:col-span-3 input-container">
                            <label for="specifiedRole" class="block font-bold leading-6 text-gray-900">Specify Role</label>
                            <div class="mt-2">
                                <input required v-model="specifiedRole" type="text" name="specifiedRole"
                                    id="specifiedRole" placeholder="Specify Role" autocomplete="given-name"
                                    class="block w-full h-14  border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 placeholder:pl-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6">
                            </div>
                        </div>
                    </Transition>
                        <div class="col-span-full input-container">
                            <label for="organizationName"
                                class="block  font-bold leading-6 text-gray-900">Business/Organization
                                name</label>
                            <div class="mt-2">
                                <input v-model="organizationName" required type="text" name="organizationName"
                                    id="organizationName" placeholder="Business/Organization name"
                                    autocomplete="organizationName"
                                    class="block w-full h-14 border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 placeholder:pl-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6">
                            </div>
                        </div>
                        <div class="sm:col-span-3 input-container">
                            <label for="workLocation" class="block  font-bold leading-6 text-gray-900">Most of my company’s
                                employees work in:</label>
                            <div class="mt-2">
                                <select v-model="workLocation" required id="workLocation" name="workLocation"
                                    autocomplete="workLocation"
                                    class="block w-full h-14 border-0 px-4 p-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:leading-6">
                                    <option value="" disabled selected>Select location</option>
                                    <option v-for="state in states" :value="state">{{ state }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="sm:col-span-3 input-container">
                            <label for="employeeCount" class="block  font-bold leading-6 text-gray-900">Approximately how
                                many people are in your organization?</label>
                            <div class="mt-2">
                                <select v-model="employeeCount" required id="employeeCount" name="employeeCount"
                                    autocomplete="employeeCount"
                                    class="block w-full h-14 border-0 px-4 p-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:leading-6">
                                    <option value="" disabled selected>Select a range</option>
                                    <option v-for="range in employeeCounts" :value="range">{{ range }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="sm:col-span-3 input-container">
                            <label for="primaryReason" class="block  font-bold leading-6 text-gray-900">What is your primary
                                reason for exploring fair chance hiring?</label>
                            <div class="mt-2">
                                <select v-model="primaryReason" required id="primaryReason" name="primaryReason"
                                    autocomplete="primaryReason"
                                    class="block w-full h-14 border-0 px-4 p-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:leading-6">
                                    <option value="" disabled selected>Reason</option>
                                    <option v-for="reason in reasons" :value="reason">{{ reason }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-span-full input-container">
                            <label for="howDidYouHearAboutUs" class="block  font-bold leading-6 text-gray-900">How did you
                                hear about us?</label>
                            <div class="mt-2">
                                <input v-model="howDidYouHearAboutUs" required type="text"
                                    name="howDidYouHearAboutUs" id="howDidYouHearAboutUs" placeholder="Please share with us"
                                    autocomplete="howDidYouHearAboutUs"
                                    class="block w-full h-14 border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 placeholder:pl-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6">
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    class="h-10 input-container rounded-md w-full button-bg-ceogreen px-3 py-1 font-extrabold text-white hover:shadow-md transition duration-300"
                    type="submit">
                    Submit
                </button>
            </div>
        </form>
    </section>
</template>

<style scoped>
select {
    width: 100%;
    color: #999;
}

input {
    color: #999
}

.welcome-container {
    width: 100%;
    height: 80vh;
    position: relative;
    overflow: hidden;
}

.green-circle {
    position: absolute;
    top: -163%;
    left: -19%;
    background-color: #2da301;
    border-radius: 50%;
    width: 137vw;
    height: 200%;
}

.header-text-container {
    position: relative;
    top: 9%;
    font-weight: 600;
}

.text-wrapper {
    position: relative;
    bottom: 12%;
}

.text {
    font-family: proxima-nova, sans-serif;
    font-size: 1.4rem;
    line-height: 2.5rem;
    color: #555555;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

@media (max-width: 868px) {

    .header-text-container {
        top: 1%;
        font-size: 2rem;
    }
    .header-text {
        font-size: 2.5rem;
    }

    .text-wrapper {
        bottom: 4%;
    }

    .text {
        font-size: 1rem;
        line-height: 1.75rem;
    }

}
@media screen and (max-width: 640px) {
    .welcome-container {
    height: 60vh;
}

   .top-container {
       padding: 0;
       margin: 0;
   }

    .header-text {
        font-size: 1.5rem;
    }
    .green-circle {
    left: -39%;
    width: 179vw;
    height: 183%;
}
}
</style>