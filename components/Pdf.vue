<script setup>
import { responses } from '~/pages/assessment/data/responses';

const props = defineProps({
    total: {
        type: Number,
        default: 100,
    },
    percentage: {
        type: Number,
        default: 100,
    },
    results: {
        type: Object,
        default: () => ({}),
    },
})
console.log('resyke', props.results);
</script>

<template>
    <div class="pdf-box bg-ceogreen">
        <div class="pdf-img-wrapper">
            <img src="~/assets/pdfs/CEO_PDF_1.png" alt="pdf1" class="pdf-img" />
            <div v-if="total <= 6">
                <div class="pdf-rating">Many opportunities to improve</div>
                <div class="pdf-score">with a score of {{ percentage }}%</div>
            </div>
            <div v-else-if="total > 6 && total <= 12">
                <div class="pdf-rating">Fair</div>
                <div class="pdf-score">with a score of {{ percentage }}%</div>
            </div>
            <div v-else-if="total > 12 && total <= 18">
                <div class="pdf-rating">Good </div>
                <div class="pdf-score">with a score of {{ percentage }}%</div>
            </div>
            <div v-else="total > 18 && total <= 24">
                <div class="pdf-rating">Excellent </div>
                <div class="pdf-score">with a score of {{ percentage }}%</div>
            </div>
        </div>
    </div>
    <div class="pdf-box bg-ceogreen">
        <div class="pdf-img-wrapper bg-ceogreen">
            <img src="~/assets/pdfs/CEO_PDF_2.png" alt="pdf2" class="pdf-img" />
        </div>
    </div>
    <div class="pdf-box">
        <div class="pdf-img-wrapper">
            <img src="~/assets/pdfs/CEO_PDF_3.png" alt="pdf3" class="pdf-img" />
        </div>
    </div>
    <div class="pdf-box">
        <div class="pdf-img-wrapper">
            <img src="~/assets/pdfs/CEO_PDF_4.png" alt="pdf4" class="pdf-img" />
        </div>
    </div>
    <div class="pdf-box">
        <div class="pdf-img-wrapper">
            <img src="~/assets/pdfs/CEO_PDF_5.png" alt="pdf5" class="pdf-img" />
        </div>
    </div>
    <div class="pdf-box bg-tan">
        <div class="pdf-img-wrapper bg-tan">
            <img src="~/assets/pdfs/CEO_PDF_6.png" alt="pdf6" class="pdf-img" />
        </div>
    </div>
        <div class="w-full bg-white border-gray-200 rounded-lg  px-4 py-1 results-text">
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
                           
                                <div class="items-center w-full ">
                                    <div class="w-full py-1 text-gray-900">
                                        <span class="mr-4 text-neutral-400">Question:</span> {{ results[key]['question'] }}
                                    </div>
                                    <div class="w-full py-1 text-gray-900">
                                        <span class="ml-6 mr-4 text-neutral-400">Your answer:</span>{{
                                            results[key]['answer'] }}
                                    </div>
                                    <div class="w-full py-1 text-gray-900">
                                        <span class="mr-4 text-neutral-400">Question:</span> {{ results[key - 1]['question']
                                        }}
                                    </div>
                                    <div class="w-full py-1 text-gray-900">
                                        <span class="ml-6 mr-4 text-neutral-400">Your answer:</span>{{ results[key -
                                            1]['answer']
                                        }}
                                    </div>
                                </div>
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
                           
                                <div class="items-center w-full ">
                                    <div class="w-full py-1 text-gray-900">
                                        <span class="mr-4 text-neutral-400">Question:</span> {{ results[key - 1]['question']
                                        }}
                                    </div>
                                    <div class="w-full py-1 text-gray-900">
                                        <span class="ml-6 mr-4 text-neutral-400">Your answer:</span>{{ results[key -
                                            1]['answer']
                                        }}
                                    </div>
                                    <div class="w-full py-1 text-gray-900">
                                        <span class="mr-4 text-neutral-400">Question:</span> {{ results[key]['question'] }}
                                    </div>
                                    <div class="w-full py-1 text-gray-900">
                                        <span class="ml-6 mr-4 text-neutral-400">Your answer:</span>{{
                                            results[key]['answer'] }}
                                    </div>
                                </div>
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
                           
                                <div class="items-center w-full ">
                                    <div class="w-full py-1 text-gray-900">
                                        <span class="mr-4 text-neutral-400">Question:</span> {{ results[key - 1]['question']
                                        }}
                                    </div>
                                    <div class="w-full py-1 text-gray-900">
                                        <span class="ml-6 mr-4 text-neutral-400">Your answer:</span>{{ results[key -
                                            1]['answer']
                                        }}
                                    </div>
                                    <div class="w-full py-1 text-gray-900">
                                        <span class="mr-4 text-neutral-400">Question:</span> {{ results[key]['question'] }}
                                    </div>
                                    <div class="w-full py-1 text-gray-900">
                                        <span class="ml-6 mr-4 text-neutral-400">Your answer:</span>{{
                                            results[key]['answer'] }}
                                    </div>
                                </div>
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
                           
                                <div class="items-center w-full ">
                                    <div class="w-full py-1 text-gray-900">
                                        <span class="mr-4 text-neutral-400">Question:</span> {{ results[key - 1]['question']
                                        }}
                                    </div>
                                    <div class="w-full py-1 text-gray-900">
                                        <span class="ml-6 mr-4 text-neutral-400">Your answer:</span>{{ results[key -
                                            1]['answer']
                                        }}
                                    </div>
                                    <div class="w-full py-1 text-gray-900">
                                        <span class="mr-4 text-neutral-400">Question:</span> {{ results[key]['question'] }}
                                    </div>
                                    <div class="w-full py-1 text-gray-900">
                                        <span class="ml-6 mr-4 text-neutral-400">Your answer:</span>{{
                                            results[key]['answer'] }}
                                    </div>
                                </div>
                        </li>
                    </ul>
                </div>

</template>

<style scoped>
.pdf-box {
    width: 446px;
    height: 631.25px;
    position: relative;
    overflow: hidden;
}

.pdf-img-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 484px;
    height: 631.25px;
}

.pdf-img {
    height: 631.25px;
    width: 100%;
}
.pdf-rating {
    position: absolute;
    z-index: 1;
    width: 100%;
    word-wrap: none;
    font-size: 1.95rem;
    font-weight: 800;
    display: flex;
    justify-content: center;
    color: #ffffff;
    top: 44%;
    left: 50%;
    transform: translate(-50%);
    font-family: proxima-nova, sans-serif;
}
.pdf-score {
    position: absolute;
    z-index: 1;
    font-size: 1.05rem;
    font-weight: 800;
    color: #ffffff;
    top: 52%;
    left: 50%;
    transform: translate(-50%);
    font-family: proxima-nova, sans-serif;
}
.results-text {
    font-size: .5rem;
}
</style>