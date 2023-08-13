<script setup>
definePageMeta({
    layout: "main",
});
import { ref } from 'vue';
const route = useRoute();

import { questions } from './data/questions';
import { responses } from './data/responses';
import { reportContent } from '~/pages/assessment/data/reportContent';
import { reportContentPDF } from '~/pages/assessment/data/reportContentPDF';
import { useRender } from 'vue-email';
import template from '~/components/Email.vue';

const { UserName } = route.query;


const shuffledQuestions = ref(questions.map((obj) => {
    obj.answers.sort(() => Math.random() - 0.5);
    return obj;
}).sort(() => Math.random() - 0.5));

const showListItem = ref(0);
const total = ref(0);
const percentage = ref(0);
const results = ref({});
const isOpen = ref({});

const runningScore = ref({});
const length = questions.length;
const runningScoreLength = ref(Object.keys(runningScore.value).length);

const toggle = (index) => {
    isOpen.value[index] = !isOpen.value[index];
};

const next = () => {
    if (showListItem.value < length - 1) {
        showListItem.value++;
    }
};

const prev = () => {
    if (showListItem.value > 0) {
        showListItem.value--;
    }
};

const scrollHandler = () => {
    const pdfSection = document.querySelector('#pdf-report-section');
    pdfSection.scrollIntoView({ behavior: 'smooth' });
};

const pdfHandler = () => {
    const pdfSection = document.querySelector('#pdf-section');
    if (pdfSection.style.display === "none") {
        pdfSection.style.display = "block";
    };
    pdfSection.style.cssText += "width: 440px;padding: 4%;font-family: proxima-nova, sans-serif;font-size: .4rem;";
    exportToPDF('CeoWorksAssessment.pdf', pdfSection);
    setTimeout(() => {
        pdfSection.style.display = "none";
    }, 500);

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
    const Rating = score <= 6 ? 'Poor' : score > 6 && score <= 12 ? 'Fair' : score > 12 && score <= 18 ? 'Good' : 'Excellent';

    const html = async () => await useRender(template, { UserName, AssessmentScore: score, Rating: Rating }, {
        pretty: true,
    });
    html().then((result) => {
        console.log("result", result);
        useFetch(`/api/sendEmail`, {
        method: 'POST',
        body: {
            template: result,
        },
    });
        
    });

    setTimeout(() => {
        pdfHandler();
    }, 1000);
};
const clickHandler = (event) => {
    runningScore.value[event.target.dataset.questionId] = event.target.value;

    const questionObject = questions.filter((obj) => obj.id == event.target.dataset.questionId)[0];

    results.value[event.target.dataset.questionId] = {
        section: questionObject.section,
        question: questionObject.question,
        answer: questionObject.answers.filter((obj) => obj.id == event.target.id)[0].answer,
        value: event.target.value,
    };

    setTimeout(() => {
        next();
        runningScoreLength.value = Object.keys(runningScore.value).length;
    }, 300);

    if (runningScoreLength.value + 1 === length) {
        saveScore();
        percentage.value = (total.value / 24 * 100).toFixed(0);
    };

};


</script>

<template>
    <section class="flex px-8 mx-auto lg:items-center lg:justify-between flex-col py-4 bg-tan h-full"
        v-if="runningScoreLength != length">
        <div class="space-y-12 m-5 wrapper h-full">
            <h1 class="question mb-2 h-20 text-3xl font-semibold text-gray-900 ">{{ shuffledQuestions[showListItem].question }}</h1>
            <div class="h-full">
                <ul v-for="answer in shuffledQuestions[showListItem].answers" class="w-full">
                    <li class="mb-2 font-medium bg-white border border-gray-200 rounded-lg cursor">
                        <div class="flex items-center pl-3 card cursor">
                            <input @click="clickHandler" type="radio" :name="answer.id"
                                :data-question-id="shuffledQuestions[showListItem].id" :id="answer.id" :value="answer.value"
                                v-model=runningScore[shuffledQuestions[showListItem].id]
                                class="w-6 h-6 radioInput cursor focus:none focus:fill-none focus:ring-0 focus:outline-white focus:ring-offset-0 focus:ring-offset-white focus:ring-opacity-100" />
                            <label :for="answer.id" class=" answer w-full py-3 ml-2 text-lg font-medium text-gray-900 cursor">
                                {{ answer.answer }}</label>
                        </div>
                    </li>
                </ul>
                <div class="flex justify-between">
                    <button @click="prev"
                        class="w-28 donate-button rounded-md button-bg-ceogreen px-3 py-1 font-extrabold text-white hover:shadow-md transition duration-300">Previous</button>
                    <div>{{ showListItem + 1 }} / {{ length }}</div>
                    <button @click="next"
                        class="w-28 donate-button rounded-md button-bg-ceogreen px-3 py-1 font-extrabold text-white hover:shadow-md transition duration-300">Next</button>
                </div>
            </div>
        </div>
    </section>
    <section v-else>
        <div class="flex px-6 mx-auto lg:items-center lg:justify-between flex-col py-4 h-full bg-tan">
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
                <div class="text-center lg:text-4xl text-2x mb-6">
                    <div v-html="responses.header"></div>
                    <div class="flex flex-wrap mt-4 w-full justify-center">
                        <div v-html="responses.subheader"></div>
                        <div class="underline decoration-solid ml-4" v-if="total <= 6">Poor, with a score of {{ percentage
                        }}</div>
                        <div class="underline decoration-solid ml-4" v-else-if="total > 6 && total <= 12"><span>Fair, with a
                                score of {{ percentage }}%</span></div>
                        <div class="underline decoration-solid ml-4" v-else-if="total > 12 && total <= 18"><span>Good, with
                                a score of {{ percentage }}%</span></div>
                        <div class="underline decoration-solid ml-4" v-else="total > 18 && total <= 24"><span>Excellent,
                                with a score of {{ percentage }}%</span></div>
                    </div>
                </div>
                <div class="mb-10 lg:text-2xl">
                    <div v-if="total <= 6" v-html="responses.for_1_2.lessthan_equal_6"></div>
                    <div v-else-if="total > 6 && total <= 12" v-html="responses.greaterthan_6_and_lessthan_equal_12"></div>
                    <div v-else-if="total > 12 && total <= 18" v-html="responses.greaterthan_12_and_lessthan_equal_18">
                    </div>
                    <div v-else="total > 18 && total <= 24" v-html="responses.greaterthan_18"></div>
                </div>
                
                <div class="w-full bg-white border-gray-200 rounded-lg  px-6 py-3">
                    <ul class="mt-5" v-for="_, key in results">
                        <li v-if="key == 2">
                            <h3 class="text-lg lg:text-3xl text-center w-full mb-4">{{ results[key]['section'] }}</h3>
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
                                <div v-if="isOpen[key] == true" class="items-center w-full p-3 ">
                                    <div class="w-full py-3 ml-2 text-gray-900">
                                        <span class="mr-4 text-neutral-400">Question:</span> {{ results[key]['question'] }}
                                    </div>
                                    <div class="w-full py-3 ml-2 text-gray-900">
                                        <span class="ml-6 mr-4 text-neutral-400">Your answer:</span>{{
                                            results[key]['answer'] }}
                                    </div>
                                    <div class="w-full py-3 ml-2 text-gray-900">
                                        <span class="mr-4 text-neutral-400">Question:</span> {{ results[key - 1]['question']
                                        }}
                                    </div>
                                    <div class="w-full py-3 ml-2 text-gray-900">
                                        <span class="ml-6 mr-4 text-neutral-400">Your answer:</span>{{ results[key -
                                            1]['answer']
                                        }}
                                    </div>
                                </div>
                            </Transition>
                        </li>
                        <li v-else-if="key == 3">
                            <h3 class="text-lg lg:text-3xl text-center w-full mb-4">{{ results[key]['section'] }}</h3>
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
                                <div v-if="isOpen[key] == true" class="items-center w-full p-3 ">
                                    <div class="w-full py-3 ml-2 text-gray-900">
                                        <span class="mr-4 text-neutral-400">Question:</span> {{ results[key]['question'] }}
                                    </div>
                                    <div class="w-full py-3 ml-2 text-gray-900">
                                        <span class="ml-6 mr-4 text-neutral-400">Your answer:</span>{{
                                            results[key]['answer'] }}
                                    </div>
                                    <div class="w-full py-3 ml-2 text-gray-900">
                                        <span class="mr-4 text-neutral-400">Question:</span> {{ results[key - 1]['question']
                                        }}
                                    </div>
                                    <div class="w-full py-3 ml-2 text-gray-900">
                                        <span class="ml-6 mr-4 text-neutral-400">Your answer:</span>{{ results[key -
                                            1]['answer']
                                        }}
                                    </div>
                                </div>
                            </Transition>
                        </li>
                        <li v-else-if="key == 5">
                            <h3 class="text-lg lg:text-3xl text-center w-full mb-4">{{ results[key]['section'] }}</h3>
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
                                <div v-if="isOpen[key] == true" class="items-center w-full p-3 ">
                                    <div class="w-full py-3 ml-2 text-gray-900">
                                        <span class="mr-4 text-neutral-400">Question:</span> {{ results[key]['question'] }}
                                    </div>
                                    <div class="w-full py-3 ml-2 text-gray-900">
                                        <span class="ml-6 mr-4 text-neutral-400">Your answer:</span>{{
                                            results[key]['answer'] }}
                                    </div>
                                    <div class="w-full py-3 ml-2 text-gray-900">
                                        <span class="mr-4 text-neutral-400">Question:</span> {{ results[key - 1]['question']
                                        }}
                                    </div>
                                    <div class="w-full py-3 ml-2 text-gray-900">
                                        <span class="ml-6 mr-4 text-neutral-400">Your answer:</span>{{ results[key -
                                            1]['answer']
                                        }}
                                    </div>
                                </div>
                            </Transition>
                        </li>
                        <li v-else-if="key == 7">
                            <h3 class="text-lg lg:text-3xl text-center w-full mb-4">{{ results[key]['section'] }}</h3>
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
                                <div v-if="isOpen[key] == true" class="items-center w-full p-3 ">
                                    <div class="w-full py-3 ml-2 text-gray-900">
                                        <span class="mr-4 text-neutral-400">Question:</span> {{ results[key]['question'] }}
                                    </div>
                                    <div class="w-full py-3 ml-2 text-gray-900">
                                        <span class="ml-6 mr-4 text-neutral-400">Your answer:</span>{{
                                            results[key]['answer'] }}
                                    </div>
                                    <div class="w-full py-3 ml-2 text-gray-900">
                                        <span class="mr-4 text-neutral-400">Question:</span> {{ results[key - 1]['question']
                                        }}
                                    </div>
                                    <div class="w-full py-3 ml-2 text-gray-900">
                                        <span class="ml-6 mr-4 text-neutral-400">Your answer:</span>{{ results[key -
                                            1]['answer']
                                        }}
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
                        <h3 class="text-lg lg:text-3xl text-center w-full mb-4">Assessment Report</h3>
                        <div v-html="reportContent.content_one"></div>
                        <div class="underline decoration-solid ml-7 text-lg lg:text-2xl" v-if="total <= 6">Poor, with a
                            score of {{ percentage }}</div>
                        <div class="underline decoration-solid ml-7 text-lg lg:text-2xl"
                            v-else-if="total > 6 && total <= 12"><span>Fair, with a score of {{ percentage }}%</span></div>
                        <div class="underline decoration-solid ml-7 text-lg lg:text-2xl"
                            v-else-if="total > 12 && total <= 18"><span>Good, with a score of {{ percentage }}%</span></div>
                        <div class="underline decoration-solid ml-7 text-lg lg:text-2xl" v-else="total > 18 && total <= 24">
                            <span>Excellent, with a score of {{ percentage }}%</span>
                        </div>
                        <div v-html="reportContent.content_two"></div>
                    </div>
                    <div class="pdf-container">
                        <div class="pdf-wrapper">
                            <div id="pdf-section">
                                <h4 class="pdf-header text-center w-full mb-4">Fair Chance Employment Assessment Report</h4>
                                <div v-html="reportContentPDF.content_one"></div>
                                <div class="ml-3 pdf-score" v-if="total <= 6">Poor, with a
                                    score of {{ percentage }}</div>
                                <div class="ml-3 pdf-score" v-else-if="total > 6 && total <= 12"><span>Fair, with a score of
                                        {{
                                            percentage }}%</span></div>
                                <div class="ml-3 pdf-score" v-else-if="total > 12 && total <= 18"><span>Good, with a score
                                        of {{
                                            percentage }}%</span></div>
                                <div class="ml-3 pdf-score" v-else="total > 18 && total <= 24">
                                    <span>Excellent, with a score of {{ percentage }}%</span>
                                </div>
                                <div v-html="reportContentPDF.content_two"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.card {
    min-height: 7rem;
}
.pdf-container {
  position: relative;
  overflow: hidden;
}
.pdf-wrapper {
  position: absolute;
  left: 1000%;
} 
.pdf-header {
    font-size: .75rem;
    font-weight: 700;
}

.pdf-score {
    font-size: .65rem;
    font-weight: 600;
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

.text-wrapper {
    margin-top: 20%;
}

.text {
    font-family: proxima-nova, sans-serif;
    font-size: 1.4rem;
    line-height: 2.5rem;
    color: #555555;
}

.radioInput {
    background-color: transparent;
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