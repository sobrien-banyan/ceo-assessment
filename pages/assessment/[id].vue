<script setup>
definePageMeta({
    layout: "main",
});
import { ref } from 'vue';
const route = useRoute();
const config = useRuntimeConfig();

import { questions } from './data/questions';
import { responses } from './data/responses';
import { useRender } from 'vue-email';
import template from '~/components/Email.vue';
import { pdfHelper } from '~/composables/pdfHelper';

const { UserName, Email } = route.query;


const Questions = ref(questions);

const showListItem = ref(0);
const showResults = ref(false);
const showSubmitButton = ref(false);
const total = ref(0);
const results = ref({});
const preamble = ref(true);
const isPulseNext = ref(false);
const isPulsePrevious = ref(false);

const runningScore = ref({});
const runningAnswers = ref({});
const length = questions.length;

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

const start = () => {
    if (preamble) {
        preamble.value = false;
    } else {
        preamble.value = true;
    }
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

const pdfHandler = () => {
    const score = total.value;
    const Rating = score <= 6 ? 'Have many opportunities to improve' : score > 6 && score <= 12 ? 'Fair' : score > 12 && score <= 18 ? 'Good' : 'Excellent';
    const pdfJson = pdfHelper(Rating, results.value);
    
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
    }).catch((error) => {
        console.log(error.message);
    });
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
    <section v-if="!showResults" class="flex mx-auto lg:items-center lg:justify-between flex-col py-4 bg-tan h-full">
     <div v-if="preamble"  class="wrapper">
        <div class="space-y-12 mt-5 h-full  bg-white border border-gray-200 rounded-lg p-4">
            <h1 class="answer font-semibold text-gray-900 ">Please answer the questions to the best of your ability; at the end of the assessment you will be provided a set of recommendations based upon the following four categories: Excellent, Good, Fair, Opportunities to improve.</h1>
                <div class="flex justify-between">
                        <div class="w-28"></div>
                        <div class="w-28"></div>
                         <button @click="start"
                        class="w-28 donate-button rounded-md button-bg-ceogreen px-3 py-1 font-extrabold text-white hover:shadow-md transition duration-300">Continue</button>
                </div>
        </div>
    </div>
        <div v-else class="space-y-12 m-5 wrapper h-full">
            <h1 class="question font-semibold text-gray-900 ">{{ Questions[showListItem].question }}</h1>
            <div class="h-full">
                <ul v-for="answer in Questions[showListItem].answers" class="w-full">
                    <li class="mb-2 font-medium bg-white border border-gray-200 rounded-lg cursor">
                        <div class="flex items-center pl-3 card cursor">
                            <input v-if="runningAnswers[Questions[showListItem].id] == answer.id" @click="clickHandler" type="radio" :name="answer.id"
                                :data-question-id="Questions[showListItem].id" :id="answer.id" :value="answer.value"
                                v-model=runningScore[Questions[showListItem].id]
                                class="w-6 h-6 cursor focus:ring-0 focus:ring-offset-0 focus:ring-offset-white focus:ring-opacity-100 radioInputSelected" />
                             <input v-else @click="clickHandler" type="radio" :name="answer.id"
                                :data-question-id="Questions[showListItem].id" :id="answer.id" :value="answer.value"
                                v-model=runningScore[Questions[showListItem].id]
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
    <section v-else class="results-container bg-white">
       <img class="green-circle-img" src="/assets/img/greenCircle.png" alt="green circle">
        <div class="flex px-8 mx-auto items-center flex-col py-4 relative z-10 h-full">
            <div class="wrapper px-8 flex mx-auto items-center flex-col h-full">
                <div class="header-text-container">
                    <h1 class=" text-center thank-you-text text-white" v-html="responses.header"></h1>
                </div>
                <div class="results-wrapper">
                    <div class="small-text" v-html="responses.subheader"></div><br>
                        <div class="small-text" v-html="responses.subheader1"></div><br>
                        <div class="text-center text-3xl small-text1" v-if="total <= 6">Have many opportunities to improve</div>
                        <div class="text-center text-3xl small-text1" v-else-if="total > 6 && total <= 12">Fair</div>
                        <div class="text-center text-3xl small-text1" v-else-if="total > 12 && total <= 18">Good</div>
                        <div class="text-center text-3xl small-text1" v-else="total > 18 && total <= 24">Excellent</div>
                        <br>
                        <div class="small-text"><span class="cursor-pointer rounded-md button-bg-ceogreen px-3 py-1 font-extrabold text-white hover:shadow-md transition duration-300" @click="pdfHandler">Click here</span> to access and download your personalized assessment report. </div><br>
                        <div class="small-text">The Inclusive Hiring team at the Center for Employment Opportunities helps employers catalyze shifts in employment practices by partnering with employers and community stakeholders to unlock career pathways that promote racial equity and provide economic mobility for people with convictions. Please reach out to <span class="underline decoration-solid text-blue-800">inclusivehiring@ceoworks.org</span> to discuss your recommendations and to learn more about fair chance hiring. </div><br>
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

.results-container {
    width: 100%;
    height: 88vh;
    position: relative;
    overflow-x: hidden;
    -ms-overflow-style: none; 
  scrollbar-width: none; 
}
.results-container::-webkit-scrollbar {
  display: none;
}

.results-wrapper {
    position: relative;
    top: 30%;
}
.question {
    font-size: 1.5rem;
}
.answer {
    font-size: 1rem;
}
.thank-you-text {
    font-size: 2rem;
}
@media (max-width: 868px) {

.question {
    height: fit-content;
}
p {
    word-break: break-all;
}
.results-container {
    height: 100vh;

}
.thank-you-text {
    font-size: 1.5rem;
}
}
@media screen and (max-width: 640px) {
    .question {
    font-size: 1rem;
    margin-top: 2rem;
}
.answer {
    font-size: .90rem;
}  
.thank-you-text {
    font-size: 1rem;
    margin-top: -10px;
}
.results-wrapper {
    top: 20%;
}
.small-text {
    font-size: .75rem;
}
.small-text1 {
    font-size: 1.5rem;
}
}

</style>