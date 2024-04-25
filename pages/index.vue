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
    "Executive/Leadership",
    "Operations",
    "Public/Community Relations",
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
    "Recruiting Talent",
    "Improve Retention",
    "Corporate Social Responsibility/DEI",
    "Legal Compliance with Fair Chance Laws",
    "Other",
];


const states =
    ['Nationwide', 'Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']

</script>

<template>
    <section class="welcome-container">
        <img class="green-circle-img" src="/assets/img/greenCircle.png" alt="green circle">
        <div class="header-text-container">
                <h1 class="header-text text-center  text-white">Fair Chance Employer Assessment</h1>
                <h1 class="header-text text-center  text-white mb-6">Self-Assessment</h1>
             </div>
            <div class="wrapper mx-auto items-center h-full">
                <div class="text-wrapper">
                    <div class="text text-center">A fair chance employer prioritizes evaluating an applicant's skills for a job before considering prior criminal convictions. Please utilize this assessment to evaluate your company's existing hiring procedures. You will gain deeper insights into ways your company can successfully implement or expand fair chance hiring.</div>
                    <div class="text text-center mt-8">The assessment is free and takes about 10 minutes to complete. To get started fill out the information below.</div>
                </div>
        </div>
    </section>


    <section class="flex mx-auto lg:items-center lg:justify-between flex-col py-4 bg-tan">
        <form @submit.prevent="submitForm">
            <div class="space-y-12 m-5 wrapper">
                <div>
                    <h2 class="text-2xl font-semibold leading-7 text-gray-900">Your information</h2>
                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-3 input-container">
                            <label for="firstName" class="block font-medium leading-6 text-gray-900">First Name</label>
                            <div class="mt-2">
                                <input v-model="firstName" required type="text" name="firstName" id="firstName"
                                    placeholder="First name" autocomplete="given-name"
                                    class="block w-full h-14  border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 placeholder:pl-2 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:leading-6">
                            </div>
                        </div>
                        <div class="sm:col-span-3 input-container">
                            <label for="last-name" class="block font-medium leading-6 text-gray-900">Last Name</label>
                            <div class="mt-2">
                                <input v-model="lastName" required type="text" name="last-name" id="last-name"
                                    placeholder="Last name" autocomplete="family-name"
                                    class="block w-full h-14 border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 placeholder:pl-2 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:leading-6">
                            </div>
                        </div>
                        <div class="sm:col-span-3 input-container">
                            <label for="email" class="block font-medium leading-6 text-gray-900">Email</label>
                            <div class="mt-2">
                                <input v-model="email" required type="email" name="email" id="email"
                                    placeholder="Email" autocomplete="email"
                                    class="block w-full h-14  border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 placeholder:pl-2 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:leading-6">
                            </div>
                        </div>
                        <div class="sm:col-span-3 input-container">
                            <label for="title" class="block font-medium leading-6 text-gray-900">What is your title?</label>
                            <div class="mt-2">
                                <select v-model="title" required id="title" name="title" autocomplete="title"
                                    class="block w-full h-14 border-0 px-4 p-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-emerald-500  sm:leading-6">
                                    <option value="" disabled>Select a title</option>
                                    <option v-for="title in titles" :value="title">{{ title }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="sm:col-span-3 input-container">
                            <label for="role" class="block font-medium leading-6 text-gray-900">What department do you work in your company?</label>
                            <div class="mt-2">
                                <select v-model="role" required id="role" name="role" autocomplete="role"
                                    class="block w-full h-14 border-0 px-4 p-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-emerald-500  sm:leading-6">
                                    <option value="" disabled>Select a role</option>
                                    <option v-for="role in roles" :value="role">{{ role }}</option>
                                </select>
                            </div>
                        </div>
                        <Transition>
                        <div v-if="role === 'Other: Specify'" class="sm:col-span-3 input-container">
                            <label for="specifiedRole" class="block font-medium leading-6 text-gray-900">Specify Role</label>
                            <div class="mt-2">
                                <input required v-model="specifiedRole" type="text" name="specifiedRole"
                                    id="specifiedRole" placeholder="Specify Role" autocomplete="given-name"
                                    class="block w-full h-14  border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 placeholder:pl-2 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:leading-6">
                            </div>
                        </div>
                    </Transition>
                        <div class="col-span-full input-container">
                            <label for="organizationName"
                                class="block font-medium leading-6 text-gray-900">Business/Organization Name</label>
                            <div class="mt-2">
                                <input v-model="organizationName" required type="text" name="organizationName"
                                    id="organizationName" placeholder="Business/Organization name"
                                    autocomplete="organizationName"
                                    class="block w-full h-14 border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 placeholder:pl-2 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:leading-6">
                            </div>
                        </div>
                        <div class="sm:col-span-3 input-container">
                            <label for="employeeCount" class="block font-medium leading-6 text-gray-900">Approximately how many people does your organization/ company employ?</label>
                            <div class="mt-2">
                                <select v-model="employeeCount" required id="employeeCount" name="employeeCount"
                                autocomplete="employeeCount"
                                class="block w-full h-14 border-0 px-4 p-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-emerald-500  sm:leading-6">
                                <option value="" disabled selected>Select a range</option>
                                <option v-for="range in employeeCounts" :value="range">{{ range }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="sm:col-span-3 input-container">
                        <label for="primaryReason" class="block font-medium leading-6 text-gray-900 primary-reason">What is your primary reason for exploring fair chance hiring?</label>
                            <div class="mt-2">
                                <select v-model="primaryReason" required id="primaryReason" name="primaryReason"
                                autocomplete="primaryReason"
                                class="block w-full h-14 border-0 px-4 p-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-emerald-500  sm:leading-6">
                                <option value="" disabled selected>Reason</option>
                                <option v-for="reason in reasons" :value="reason">{{ reason }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="sm:col-span-3 input-container">
                        <label for="workLocation" class="block font-medium leading-6 text-gray-900">Most of my company’s
                            employees work in:</label>
                        <div class="mt-2">
                            <select v-model="workLocation" required id="workLocation" name="workLocation"
                                autocomplete="workLocation"
                                class="block w-full h-14 border-0 px-4 p-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-emerald-500  sm:leading-6">
                                <option value="" disabled selected>Select location</option>
                                <option v-for="state in states" :value="state">{{ state }}</option>
                            </select>
                        </div>
                    </div>
                        <div class="col-span-full input-container">
                            <label for="howDidYouHearAboutUs" class="block font-medium leading-6 text-gray-900">How did you
                                hear about us?</label>
                            <div class="mt-2">
                                <textarea v-model="howDidYouHearAboutUs" type="textarea" rows="4"
                                    name="howDidYouHearAboutUs" id="howDidYouHearAboutUs" placeholder="Optional"
                                    class="block w-full border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 placeholder:pl-2 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:leading-6"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    class="h-10 mt-0 rounded-md w-full button-bg-ceogreen font-bold text-white hover:shadow-md transition duration-300"
                    type="submit">
                    Submit
                </button>
            </div>
        </form>
    </section>
</template>

<style scoped>
.primary-reason {
    min-height: 48px;
}
select {
    width: 100%;
    color: #999;
}

input {
    color: #999
}

.welcome-container {
    width: 100%;
    position: relative;
}
.header-text-container {
    position: relative;
    font-weight: 600;
    padding: 5vh 0;
    width: 100%;
    margin-bottom: 10px;
}
.header-text {
    font-size: 2.7vw;
   
}

.text-wrapper {
    padding: 7vh 0 18vh;
    position: relative;
    z-index: 1;
}
.text {
  font-family: proxima-nova, sans-serif;
  font-size: 1.2rem;
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
@media screen and (min-width: 1400px){
    .header-text {
    font-size: 40px;
}
}

@media (max-width: 868px) {
    .header-text-container {
        padding: 1vh 0;
}
      .header-text {
        font-size: 3.5vw;
      }
  

      .text-wrapper {
    padding: 5vh 0;
}
      .text {
        font-size: 1rem;
        line-height: 1.75rem;
    }

}

@media screen and (max-width: 640px) {

.text {
    font-size: 0.9rem;
    line-height: 1.5rem;
}
.primary-reason {
    min-height: fit-content;
}
}
@media screen and (max-width: 400px) {
    .header-text-container {
        padding: 2px;
}
    
}
</style>