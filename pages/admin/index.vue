<script setup>
definePageMeta({
  layout: "main",
  middleware: 'auth'
});
import { ref, watchEffect } from 'vue';
import { responses } from '../assessment/data/responses';
import { pdfHelper } from '~/composables/pdfHelper';
const config = useRuntimeConfig();

const users = ref([]);
const emails = ref([]);
const isList = ref(true);

const isOpen = ref({});

const getUsers = async () => {
  await useFetch(`/api/user`, {
    method: 'GET',
  }).then((data) => {
    users.value = data.data.value;
  });
};
const getEmails = async () => {
  await useFetch(`/api/mailingList`, {
    method: 'GET',
  }).then((data) => {
    emails.value = data.data.value;
  });
};

watchEffect(() => {
            getUsers();
});

const toggle = (index) => {
  isOpen.value[index] = !isOpen.value[index];
};

const viewHandler = () => {
  isList.value = !isList.value;
  if (isList.value) {
    getUsers();
  } else {
    getEmails();
  }
};

const deleteHandler = (id) => {
  useFetch(`/api/user/${id}`, {
    method: 'DELETE',
  }).then(() => {
    getUsers();
  });
};
const deleteEmailHandler = (id) => {
  useFetch(`/api/mailingList/${id}`, {
    method: 'DELETE',
  }).then(() => {
    getEmails();
  });
};
const pdfHandler = (id) => {
  const userObject = users.value.find((user) => user.id === id);
  const score = userObject?.score;
  const Rating = score <= 6 ? 'Opportunities to improve' : score <= 12 ? 'Fair' : score <= 18 ? 'Good' : 'Excellent';
  const pdfJson = Rating && userObject?.results && pdfHelper(Rating, JSON.parse(userObject?.results));

  $fetch(config.public.vueEmailOptions.pdfGeneratorUrl, {
    method: 'POST',
    body: pdfJson,
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response], { type: 'application/pdf' }));
    const link = document.createElement('a');

    let fileName = 'CEOWorksAssessment.pdf';
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);

    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }).catch((err) => {
    console.log(err.message);
  })
};

const logoutHandler = () => {
  navigateTo(`/`);
};  
</script>

<template>
  <section class="flex  mx-auto lg:items-center lg:justify-between flex-col py-4 bg-tan h-full">
    <div class="space-y-6 m-5 wrapper h-full">
      <div class="flex justify-between">
      <button @click="viewHandler"
        class="h-10 w-200 rounded-md button-bg-ceogreen px-3 py-1 font-extrabold text-white hover:shadow-md transition duration-300">
        {{ !isList ? 'View Assessments' : 'View Emails' }}
      </button>
      <button @click="logoutHandler"
        class="h-10 w-200 rounded-md button-bg-ceogreen px-3 py-1 font-extrabold text-white hover:shadow-md transition duration-300">
        SignOut
      </button>
    </div>
      <div v-if="isList">
        <h1 class="mb-2 text-2xl font-semibold text-gray-900 ">Assessments</h1>
        <div class="h-full" v-if="users.length > 0">
          <ul v-for="user, key in users" class="w-full">
            <li class=" mb-2 p-4 bg-white border border-gray-200 rounded-lg">
              <div class="flex justify-between items-center mb-3">
                <p class="text-neutral-400 ">Name: <span class="text-black">{{ user.name }}</span></p>
                <button @click="deleteHandler(user.id)"
                  class="h-7 w-7  bg-red-400 rounded-md text-red-50 font-extrabold text-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-red-600 duration-300">X</button>
              </div>
              <hr>
              <div class="flex justify-between flex-wrap mt-3 info-wrapper">
                <div class="flex flex-col">
                  <p class="text-neutral-400">Email: <span class="text-black">{{ user.email }}</span></p>
                  <p class="text-neutral-400">Title: <span class="text-black">{{ user.title }}</span></p>
                  <p class="text-neutral-400">Organization: <span class="text-black">{{ user.organizationName }}</span>
                  </p>
                  <p class="text-neutral-400">Role: <span class="text-black">{{ user.role }}</span></p>
                </div>
                <div class="flex flex-col">
                  <p class="text-neutral-400">Location: <span class="text-black">{{ user.workLocation }}</span></p>
                  <p class="text-neutral-400">Employee count: <span class="text-black">{{ user.employeeCount }}</span></p>
                  <p class="text-neutral-400">Reason: <span class="text-black">{{ user.primaryReason }}</span></p>
                  <p class="text-neutral-400">Score: <span class="text-black">{{ user.score }}</span></p>
                </div>
                <div class="flex flex-col">
                  <p class="text-neutral-400">Date created: <span class="text-black">{{ new
                    Date(user.createdAt).getMonth() + 1
                  }}/</span><span class="text-black">{{ new Date(user.createdAt).getDate() }}/</span><span
                      class="text-black">{{ new Date(user.createdAt).getFullYear() }}</span></p>
                  <p class="text-neutral-400">How did you hear: <span class="text-black text-format">{{ user.howDidYouHearAboutUs
                  }}</span></p>
                </div>
              </div>

              <div>
                <button @click="pdfHandler(user.id)" class="textgreen mt-3">Download Report</button><br>
                <button @click="toggle(key)" class="textgreen mt-3">{{isOpen[key] == true ? 'Hide Assessment' :'View Assessment'}}</button>
                <Transition>
                  <div v-if="isOpen[key] == true" class="items-center w-full  ">
                    <ul class="mt-5" v-for="_, key in JSON.parse(user.results)">
                      <li v-if="key == 2">
                        <h3 class="text-lg lg:text-2xl text-center w-full mb-4">{{
                          JSON.parse(user.results)[key]['section'] }}</h3>
                          <div class="mb-2">For this section the score is: {{((parseInt(JSON.parse(user.results)[key]['value']) + parseInt(JSON.parse(user.results)[key - 1]['value'])/6*100).toFixed(0))}}%</div>
                        <div
                          v-if="parseInt(JSON.parse(user.results)[key]['value']) + parseInt(JSON.parse(user.results)[key - 1]['value']) < 4">
                          <div v-html="responses.for_1_2.less_than_4">
                          </div>
                        </div>
                        <div v-else>
                          <div v-html="responses.for_1_2.equal_to_or_greater_than_4">
                          </div>
                        </div>
                        <button @click="toggle(key)" class="textgreen">{{isOpen[key] == true ? 'Hide answers' :'See answers'}}</button>
                        <Transition>
                          <div v-if="isOpen[key] == true" class="items-center w-full  ">
                            <div class="w-full py-3 ml-2 text-gray-900">
                              <span class="mr-4 text-neutral-400">Question:</span> {{
                                JSON.parse(user.results)[key]['question'] }}
                            </div>
                            <div class="w-full py-3 ml-2 text-gray-900">
                              <span class="ml-6 mr-4 text-neutral-400">Answer:</span>{{
                                JSON.parse(user.results)[key]['answer'] }}
                            </div>
                            <div class="w-full py-3 ml-2 text-gray-900">
                              <span class="mr-4 text-neutral-400">Question:</span> {{ JSON.parse(user.results)[key -
                                1]['question']
                              }}
                            </div>
                            <div class="w-full py-3 ml-2 text-gray-900">
                              <span class="ml-6 mr-4 text-neutral-400">Answer:</span>{{ JSON.parse(user.results)[key -
                                1]['answer']
                              }}
                            </div>
                          </div>
                        </Transition>
                      </li>
                      <li v-else-if="key == 4">
                        <h3 class="text-lg lg:text-2xl text-center w-full mb-4">{{
                          JSON.parse(user.results)[key]['section'] }}</h3>
                          <div class="mb-2">For this section the score is: {{((parseInt(JSON.parse(user.results)[key]['value']) + parseInt(JSON.parse(user.results)[key - 1]['value'])/6*100).toFixed(0))}}%</div>
                        <div
                          v-if="parseInt(JSON.parse(user.results)[key]['value']) + parseInt(JSON.parse(user.results)[key - 1]['value']) < 4">
                          <div v-html="responses.for_3_4.less_than_4">
                          </div>
                        </div>
                        <div v-else>
                          <div v-html="responses.for_3_4.equal_to_or_greater_than_4">
                          </div>
                        </div>
                        <button @click="toggle(key)" class="textgreen">{{isOpen[key] == true ? 'Hide answers' :'See answers'}}</button>
                        <Transition>
                          <div v-if="isOpen[key] == true" class="items-center w-full  ">
                            <div class="w-full py-3 ml-2 text-gray-900">
                              <span class="mr-4 text-neutral-400">Question:</span> {{ JSON.parse(user.results)[key -
                                1]['question']
                              }}
                            </div>
                            <div class="w-full py-3 ml-2 text-gray-900">
                              <span class="ml-6 mr-4 text-neutral-400">Answer:</span>{{ JSON.parse(user.results)[key -
                                1]['answer']
                              }}
                            </div>
                            <div class="w-full py-3 ml-2 text-gray-900">
                              <span class="mr-4 text-neutral-400">Question:</span> {{
                                JSON.parse(user.results)[key]['question'] }}
                            </div>
                            <div class="w-full py-3 ml-2 text-gray-900">
                              <span class="ml-6 mr-4 text-neutral-400">Answer:</span>{{
                                JSON.parse(user.results)[key]['answer'] }}
                            </div>
                          </div>
                        </Transition>
                      </li>
                      <li v-else-if="key == 6">
                        <h3 class="text-lg lg:text-2xl text-center w-full mb-4">{{
                          JSON.parse(user.results)[key]['section'] }}</h3>
                          <div class="mb-2">For this section the score is: {{((parseInt(JSON.parse(user.results)[key]['value']) + parseInt(JSON.parse(user.results)[key - 1]['value'])/6*100).toFixed(0))}}%</div>
                        <div
                          v-if="parseInt(JSON.parse(user.results)[key]['value']) + parseInt(JSON.parse(user.results)[key - 1]['value']) < 4">
                          <div v-html="responses.for_5_6.less_than_4">
                          </div>
                        </div>
                        <div v-else>
                          <div v-html="responses.for_5_6.equal_to_or_greater_than_4">
                          </div>
                        </div>
                        <button @click="toggle(key)" class="textgreen">{{isOpen[key] == true ? 'Hide answers' :'See answers'}}</button>
                        <Transition>
                          <div v-if="isOpen[key] == true" class="items-center w-full  ">
                            <div class="w-full py-3 ml-2 text-gray-900">
                              <span class="mr-4 text-neutral-400">Question:</span> {{ JSON.parse(user.results)[key -
                                1]['question']
                              }}
                            </div>
                            <div class="w-full py-3 ml-2 text-gray-900">
                              <span class="ml-6 mr-4 text-neutral-400">Answer:</span>{{ JSON.parse(user.results)[key -
                                1]['answer']
                              }}
                            </div>
                            <div class="w-full py-3 ml-2 text-gray-900">
                              <span class="mr-4 text-neutral-400">Question:</span> {{
                                JSON.parse(user.results)[key]['question'] }}
                            </div>
                            <div class="w-full py-3 ml-2 text-gray-900">
                              <span class="ml-6 mr-4 text-neutral-400">Answer:</span>{{
                                JSON.parse(user.results)[key]['answer'] }}
                            </div>
                          </div>
                        </Transition>
                      </li>
                      <li v-else-if="key == 8">
                        <h3 class="text-lg lg:text-2xl text-center w-full mb-4">{{
                          JSON.parse(user.results)[key]['section'] }}</h3>
                          <div class="mb-2">For this section the score is: {{((parseInt(JSON.parse(user.results)[key]['value']) + parseInt(JSON.parse(user.results)[key - 1]['value'])/6*100).toFixed(0))}}%</div>
                        <div
                          v-if="parseInt(JSON.parse(user.results)[key]['value']) + parseInt(JSON.parse(user.results)[key - 1]['value']) < 4">
                          <div v-html="responses.for_7_8.less_than_4">
                          </div>
                        </div>
                        <div v-else>
                          <div v-html="responses.for_7_8.equal_to_or_greater_than_4">
                          </div>
                        </div>
                        <button @click="toggle(key)" class="textgreen">{{isOpen[key] == true ? 'Hide answers' :'See answers'}}</button>
                        <Transition>
                          <div v-if="isOpen[key] == true" class="items-center w-full  ">
                            <div class="w-full py-3 ml-2 text-gray-900">
                              <span class="mr-4 text-neutral-400">Question:</span> {{ JSON.parse(user.results)[key -
                                1]['question']
                              }}
                            </div>
                            <div class="w-full py-3 ml-2 text-gray-900">
                              <span class="ml-6 mr-4 text-neutral-400">Answer:</span>{{ JSON.parse(user.results)[key -
                                1]['answer']
                              }}
                            </div>
                            <div class="w-full py-3 ml-2 text-gray-900">
                              <span class="mr-4 text-neutral-400">Question:</span> {{
                                JSON.parse(user.results)[key]['question'] }}
                            </div>
                            <div class="w-full py-3 ml-2 text-gray-900">
                              <span class="ml-6 mr-4 text-neutral-400">Answer:</span>{{
                                JSON.parse(user.results)[key]['answer'] }}
                            </div>
                          </div>
                        </Transition>
                      </li>
                    </ul>
                  </div>
                </Transition>  
              </div>
            </li>
          </ul>
        </div>
        <div v-else>
          <h1 class="mb-2 h-20 text-2xl font-semibold text-gray-900 ">Loading...</h1>
        </div>
      </div>
      <div v-else>
        <h1 class="mb-2 text-2xl font-semibold text-gray-900 ">Emails</h1>
        <div class="h-full" v-if="emails.length > 0">
          <ul v-for="email in emails" class="w-full">
            <li class=" mb-2 p-4 bg-white border border-gray-200 rounded-lg">
              <div class="flex justify-end items-center mb-3">

                <button @click="deleteEmailHandler(email.id)"
                  class="h-7 w-7  bg-red-400 rounded-md text-red-50 font-extrabold text-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-red-600 duration-300">X</button>
              </div>
              <hr>
              <div class="flex justify-between flex-wrap mt-3 ">
                <div class="flex flex-col">
                  <p class="text-neutral-400 text-xl">Email: <span class="text-black">{{ email.email }}</span></p>
                </div>
                <div class="flex flex-col">
                  <p class="text-neutral-400">Date created: <span class="text-black">{{ new
                    Date(email.createdAt).getMonth() + 1
                  }}/</span><span class="text-black">{{ new Date(email.createdAt).getDate() }}/</span><span
                      class="text-black">{{ new Date(email.createdAt).getFullYear() }}</span></p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.text-format {
  white-space: break-spaces;
  word-break: break-all;
}
@media screen and (max-width: 640px) {
 .info-wrapper {
  flex-direction: column;
 }
}
</style>