<script setup>
definePageMeta({
    layout: "main",
});
import { ref } from 'vue';
const route = useRoute();

import { questions } from './data/questions';
import { responses } from './data/responses';
import { reportContent } from '~/pages/assessment/data/reportContent';
import { useRender } from 'vue-email';
import template from '~/components/Email.vue';
import { pdfHelper } from '~/composables/pdfHelper';

const { UserName, Email } = route.query;


const shuffledQuestions = ref(questions.map((obj) => {
    obj.answers.sort(() => Math.random() - 0.5);
    return obj;
}).sort(() => Math.random() - 0.5));

const showListItem = ref(0);
const showResults = ref(false);
const showSubmitButton = ref(false);
const total = ref(0);
const percentage = ref(0);
const results = ref({});
const isOpen = ref({});
const isPulseNext = ref(false);
const isPulsePrevious = ref(false);

const runningScore = ref({});
const runningAnswers = ref({});
const length = questions.length;

const toggle = (index) => {
    isOpen.value[index] = !isOpen.value[index];
};

const pluseDirection = () => {
    const runningLength = Object.keys(runningAnswers.value).length;
    if (runningLength < 8 && runningLength >= showListItem.value + 1) {
        isPulseNext.value = true;
    } else if (runningLength < 8) {
        isPulsePrevious.value = true;
    };
      if (isPulsePrevious.value) {
       setTimeout(() => {
        isPulsePrevious.value = false;
    }, 4000);
    };  
      if (isPulseNext.value) {
       setTimeout(() => {
        isPulseNext.value = false;
    }, 4000);
    };  
};

const next = () => {
    isPulseNext.value = false;
    if (showListItem.value < length - 1) {
        showListItem.value++;
    }
};

const prev = () => {
    isPulsePrevious.value = false;
    if (showListItem.value > 0) {
        showListItem.value--;
    };
};

const scrollHandler = () => {
    const pdfSection = document.querySelector('#pdf-report-section');
    pdfSection.scrollIntoView({ behavior: 'smooth' });
};

const pdfHandler = () => {
  const score = total.value;
  const Rating = score <= 6 ? 'Have many opportunities to improve' : score > 6 && score <= 12 ? 'Fair' : score > 12 && score <= 18 ? 'Good' : 'Excellent'
const pdfJson = pdfHelper((total.value / 24 * 100).toFixed(0), Rating, results.value);
useFetch(`http://localhost:3000/pdf`, {
            method: 'POST',
            body: pdfJson,
    }).then((result) => {
        const blob = new Blob([result.data], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'Assessment Report.pdf';
        link.click();
    }).catch((error) => {
        console.log(error.message);
    })
};


const saveScore = () => {
    const score = Object.values(runningScore.value).reduce((a, b) => parseInt(a) + parseInt(b), 0);
    total.value = score;
    useFetch(`/api/user/${route.params.id}`, {
        method: 'PUT',
        body: {
            score,
            results: JSON.stringify(results.value),
        },
    });
    const Rating = score <= 6 ? 'Have many opportunities to improve' : score > 6 && score <= 12 ? 'Fair' : score > 12 && score <= 18 ? 'Good' : 'Excellent';

    const html = async () => await useRender(template, { UserName, AssessmentScore: score, Rating: Rating }, {
        pretty: true,
    });
    html().then((result) => {
        useFetch(`/api/sendEmail`, {
            method: 'POST',
            body: {
                template: result,
                toAddress: Email,
        },
    });
    showResults.value = true;
    percentage.value = (total.value / 24 * 100).toFixed(0);
});
};
const clickHandler = (event) => {
    runningScore.value[event.target.dataset.questionId] = event.target.value;
    
    const questionObject = questions.filter((obj) => obj.id == event.target.dataset.questionId)[0];
    const answerObject = questionObject.answers.filter((obj) => obj.id == event.target.id)[0];
    if (runningAnswers.value[event.target.dataset.questionId] != answerObject.id) {
        runningAnswers.value[event.target.dataset.questionId] = answerObject.id;
    };

    results.value[event.target.dataset.questionId] = {
        section: questionObject.section,
        question: questionObject.question,
        answer: answerObject.answer,
        value: event.target.value,
    };
    showSubmitButton.value = Object.keys(runningAnswers.value).length == 8;
    pluseDirection();
};


</script>

<template>
    <section class="flex mx-auto lg:items-center lg:justify-between flex-col py-4 bg-tan h-full"
        v-if="!showResults">
        <div class="space-y-12 m-5 wrapper h-full">
            <h1 class="question text-2xl font-semibold text-gray-900 ">{{ shuffledQuestions[showListItem].question }}</h1>
            <div class="h-full">
                <ul v-for="answer in shuffledQuestions[showListItem].answers" class="w-full">
                    <li class="mb-2 font-medium bg-white border border-gray-200 rounded-lg cursor">
                        <div class="flex items-center pl-3 card cursor">
                            <input v-if="runningAnswers[shuffledQuestions[showListItem].id] == answer.id" @click="clickHandler" type="radio" :name="answer.id"
                                :data-question-id="shuffledQuestions[showListItem].id" :id="answer.id" :value="answer.value"
                                v-model=runningScore[shuffledQuestions[showListItem].id]
                                class="w-6 h-6 cursor focus:ring-0 focus:ring-offset-0 focus:ring-offset-white focus:ring-opacity-100 radioInputSelected" />
                             <input v-else @click="clickHandler" type="radio" :name="answer.id"
                                :data-question-id="shuffledQuestions[showListItem].id" :id="answer.id" :value="answer.value"
                                v-model=runningScore[shuffledQuestions[showListItem].id]
                                class="w-6 h-6 cursor focus:ring-0 focus:ring-offset-0 focus:ring-offset-white focus:ring-opacity-100 radioInput" />
                            <label :for="answer.id" class="answer noselect w-full py-3 ml-2 pr-2 font-medium text-gray-900 cursor">
                                {{ answer.answer }}</label>
                        </div>
                    </li>
                </ul>
                <div class="flex justify-between">
                    <button v-if="showListItem > 0" @click="prev"
                    :class="isPulsePrevious && 'animate-pulse'"
                        class="w-28 donate-button rounded-md button-bg-ceogreen px-3 py-1 font-extrabold text-white hover:shadow-md transition duration-300">Previous</button>
                        <div class="w-28" v-else></div>
                    <div>{{ showListItem + 1 }} / {{ length }}</div>
                    <button v-if="showSubmitButton && showListItem == 7" @click="saveScore"
                        class="w-28 donate-button rounded-md button-bg-ceogreen px-3 py-1 font-extrabold text-white hover:shadow-md transition duration-300">Submit</button>
                    <button v-else-if="showListItem < 7" @click="next"
                        :class="isPulseNext && 'animate-pulse'"
                        class="w-28 donate-button rounded-md button-bg-ceogreen px-3 py-1 font-extrabold text-white hover:shadow-md transition duration-300">Next</button>
                    <div class="w-28" v-else></div>
                </div>
            </div>
        </div>
    </section>
    <section v-else>
        <div class="flex mx-auto lg:items-center lg:justify-between flex-col py-4 h-full bg-tan">
            <div class="m-5 wrapper h-full">
                <div class="flex mb-6">
                    <button @click="pdfHandler"
                        class="h-10 w-200 mr-6 rounded-md button-bg-ceogreen px-3 py-1 font-extrabold text-white hover:shadow-md transition duration-300">
                        Download Report
                    </button>
                    <button @click="scrollHandler"
                        class="h-10 w-200 rounded-md button-bg-ceogreen px-3 py-1 font-extrabold text-white hover:shadow-md transition duration-300">
                        View Report
                    </button>
                </div>
                <div class=" mb-6">
                    <div class="text-center text-3xl" v-html="responses.header"></div>
                    <div class="flex flex-wrap mt-4 w-full">
                        <div class="lg:text-xl" v-html="responses.subheader"></div>
                        <div class="underline decoration-solid lg:text-xl" v-if="total <= 6">Have many opportunities to improve, with a score of {{ percentage
                        }}</div>
                        <div class="underline decoration-solid lg:text-xl" v-else-if="total > 6 && total <= 12"><span>Fair, with a
                                score of {{ percentage }}%</span></div>
                        <div class="underline decoration-solid lg:text-xl" v-else-if="total > 12 && total <= 18"><span>Good, with
                                a score of {{ percentage }}%</span></div>
                        <div class="underline decoration-solid lg:text-xl" v-else="total > 18 && total <= 24"><span>Excellent,
                                with a score of {{ percentage }}%</span></div>
                    </div>
                </div>
                <div class="mb-10 lg:text-xl">
                    <div v-if="total <= 6" v-html="responses.for_1_2.lessthan_equal_6"></div>
                    <div v-else-if="total > 6 && total <= 12" v-html="responses.greaterthan_6_and_lessthan_equal_12"></div>
                    <div v-else-if="total > 12 && total <= 18" v-html="responses.greaterthan_12_and_lessthan_equal_18">
                    </div>
                    <div v-else="total > 18 && total <= 24" v-html="responses.greaterthan_18"></div>
                </div>
                
                <div class="w-full bg-white border-gray-200 rounded-lg  px-6 py-3">
                    <ul class="mt-5" v-for="_, key in results">
                        <li v-if="key == 2">
                            <h3 class="text-lg lg:text-2xl text-center w-full mb-4">{{ results[key]['section'] }}</h3>
                            <div class="mb-2">For this section your score is: {{((parseInt(results[key]['value']) + parseInt(results[key - 1]['value'])/16*100).toFixed(0))}}%</div>
                            <div v-if="parseInt(results[key]['value']) + parseInt(results[key - 1]['value']) < 4">
                                <div v-html="responses.for_1_2.less_than_4">
                                </div>
                            </div>
                            <div v-else>
                                <div v-html="responses.for_1_2.equal_to_or_greater_than_4">
                                </div>
                            </div>
                            <button @click="toggle(key)" class="textgreen">{{isOpen[key] == true ? 'Hide your answers' :'See your answers'}}</button>
                            <Transition>
                                <div v-if="isOpen[key] == true" class="items-center w-full ">
                                    <div class="w-full py-3 text-gray-900">
                                        <span class="mr-4 text-neutral-400">Question:</span> {{ results[key]['question'] }}
                                    </div>
                                    <div class="w-full py-3 text-gray-900">
                                        <span class="ml-6 mr-4 text-neutral-400">Your answer:</span>{{
                                            results[key]['answer'] }}
                                    </div>
                                    <div class="w-full py-3 text-gray-900">
                                        <span class="mr-4 text-neutral-400">Question:</span> {{ results[key - 1]['question']
                                        }}
                                    </div>
                                    <div class="w-full py-3 text-gray-900">
                                        <span class="ml-6 mr-4 text-neutral-400">Your answer:</span>{{ results[key -
                                            1]['answer']
                                        }}
                                    </div>
                                </div>
                            </Transition>
                        </li>
                        <li v-else-if="key == 4">
                            <h3 class="text-lg lg:text-2xl text-center w-full mb-4">{{ results[key]['section'] }}</h3>
                            <div class="mb-2">For this section your score is: {{((parseInt(results[key]['value']) + parseInt(results[key - 1]['value'])/12*100).toFixed(0))}}%</div>
                            <div v-if="parseInt(results[key]['value']) + parseInt(results[key - 1]['value']) < 4">
                                <div v-html="responses.for_3_4.less_than_4">
                                </div>
                            </div>
                            <div v-else>
                                <div v-html="responses.for_3_4.equal_to_or_greater_than_4">
                                </div>
                            </div>
                            <button @click="toggle(key)" class="textgreen">{{isOpen[key] == true ? 'Hide your answers' :'See your answers'}}</button>
                            <Transition>
                                <div v-if="isOpen[key] == true" class="items-center w-full ">
                                    <div class="w-full py-3 text-gray-900">
                                        <span class="mr-4 text-neutral-400">Question:</span> {{ results[key - 1]['question']
                                        }}
                                    </div>
                                    <div class="w-full py-3 text-gray-900">
                                        <span class="ml-6 mr-4 text-neutral-400">Your answer:</span>{{ results[key -
                                            1]['answer']
                                        }}
                                    </div>
                                    <div class="w-full py-3 text-gray-900">
                                        <span class="mr-4 text-neutral-400">Question:</span> {{ results[key]['question'] }}
                                    </div>
                                    <div class="w-full py-3 text-gray-900">
                                        <span class="ml-6 mr-4 text-neutral-400">Your answer:</span>{{
                                            results[key]['answer'] }}
                                    </div>
                                </div>
                            </Transition>
                        </li>
                        <li v-else-if="key == 6">
                            <h3 class="text-lg lg:text-2xl text-center w-full mb-4">{{ results[key]['section'] }}</h3>
                            <div class="mb-2">For this section your score is: {{((parseInt(results[key]['value']) + parseInt(results[key - 1]['value'])/12*100).toFixed(0))}}%</div>
                            <div v-if="parseInt(results[key]['value']) + parseInt(results[key - 1]['value']) < 4">
                                <div v-html="responses.for_5_6.less_than_4">
                                </div>
                            </div>
                            <div v-else>
                                <div v-html="responses.for_5_6.equal_to_or_greater_than_4">
                                </div>
                            </div>
                            <button @click="toggle(key)" class="textgreen">{{isOpen[key] == true ? 'Hide your answers' :'See your answers'}}</button>
                            <Transition>
                                <div v-if="isOpen[key] == true" class="items-center w-full ">
                                    <div class="w-full py-3 text-gray-900">
                                        <span class="mr-4 text-neutral-400">Question:</span> {{ results[key - 1]['question']
                                        }}
                                    </div>
                                    <div class="w-full py-3 text-gray-900">
                                        <span class="ml-6 mr-4 text-neutral-400">Your answer:</span>{{ results[key -
                                            1]['answer']
                                        }}
                                    </div>
                                    <div class="w-full py-3 text-gray-900">
                                        <span class="mr-4 text-neutral-400">Question:</span> {{ results[key]['question'] }}
                                    </div>
                                    <div class="w-full py-3 text-gray-900">
                                        <span class="ml-6 mr-4 text-neutral-400">Your answer:</span>{{
                                            results[key]['answer'] }}
                                    </div>
                                </div>
                            </Transition>
                        </li>
                        <li v-else-if="key == 8">
                            <h3 class="text-lg lg:text-2xl text-center w-full mb-4">{{ results[key]['section'] }}</h3>
                            <div class="mb-2">For this section your score is: {{((parseInt(results[key]['value']) + parseInt(results[key - 1]['value'])/12*100).toFixed(0))}}%</div>
                            <div v-if="parseInt(results[key]['value']) + parseInt(results[key - 1]['value']) < 4">
                                <div v-html="responses.for_7_8.less_than_4">
                                </div>
                            </div>
                            <div v-else>
                                <div v-html="responses.for_7_8.equal_to_or_greater_than_4">
                                </div>
                            </div>
                            <button @click="toggle(key)" class="textgreen">{{isOpen[key] == true ? 'Hide your answers' :'See your answers'}}</button>
                            <Transition>
                                <div v-if="isOpen[key] == true" class="items-center w-full ">
                                    <div class="w-full py-3 text-gray-900">
                                        <span class="mr-4 text-neutral-400">Question:</span> {{ results[key - 1]['question']
                                        }}
                                    </div>
                                    <div class="w-full py-3 text-gray-900">
                                        <span class="ml-6 mr-4 text-neutral-400">Your answer:</span>{{ results[key -
                                            1]['answer']
                                        }}
                                    </div>
                                    <div class="w-full py-3 text-gray-900">
                                        <span class="mr-4 text-neutral-400">Question:</span> {{ results[key]['question'] }}
                                    </div>
                                    <div class="w-full py-3 text-gray-900">
                                        <span class="ml-6 mr-4 text-neutral-400">Your answer:</span>{{
                                            results[key]['answer'] }}
                                    </div>
                                </div>
                            </Transition>
                        </li>
                    </ul>
                </div>
                <div id="pdf-report-section" class="w-full mt-20 bg-white border-gray-200 rounded-lg  px-6 py-3">
                    <button @click="pdfHandler"
                        class="h-10 w-200 mb-6 rounded-md button-bg-ceogreen px-3 py-1 font-extrabold text-white hover:shadow-md transition duration-300">
                        Download Report
                    </button>
                    <div>
                        <h3 class="text-lg lg:text-2xl text-center w-full mb-4">Assessment Report</h3>
                        <div v-html="reportContent.content_one"></div>
                        <div class="underline decoration-solid text-lg lg:text-2xl" v-if="total <= 6">Have many opportunities to improve, with a
                            score of {{ percentage }}</div>
                        <div class="underline decoration-solid text-lg lg:text-2xl"
                            v-else-if="total > 6 && total <= 12"><span>Fair, with a score of {{ percentage }}%</span></div>
                        <div class="underline decoration-solid text-lg lg:text-2xl"
                            v-else-if="total > 12 && total <= 18"><span>Good, with a score of {{ percentage }}%</span></div>
                        <div class="underline decoration-solid text-lg lg:text-2xl" v-else="total > 18 && total <= 24">
                            <span>Excellent, with a score of {{ percentage }}%</span>
                        </div>
                        <div v-html="reportContent.content_two"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.card {
    min-height: 4rem;
}
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
.cursor {
    cursor: pointer !important;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
.radioInput {
    background-color: #ffffff;
    border: 1px solid #2da301 !important;
}
.radioInput:checked {
    background-color: #ffffff !important;
    color: #ffffFF;
}
.radioInputSelected {
    background-color: #2da301;
    border: 1px solid #2da301 !important;
}
.radioInputSelected:checked {
    background-color: #2da301 !important;
    color: #2da301;
}

@media (max-width: 868px) {

.question {
    height: fit-content;
}
p {
    word-break: break-all;
}
}
@media screen and (max-width: 640px) {
    .question {
    font-size: 1.5rem;
    margin-top: 2rem;
}
.answer {
    font-size: 1rem;
}  
}
</style>