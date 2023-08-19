<script setup lang="ts">
import { ref } from 'vue'
import { exportToPDF } from '#imports'
const pdfSection = ref();
const score = 12;
const Rating = score <= 6 ? `Poor, with a score of ${(score / 24 * 100).toFixed(0)}%` : score > 6 && score <= 12 ? `Fair, with a score of ${(score / 24 * 100).toFixed(0)}%` : score > 12 && score <= 18 ? `Good, with a score of ${(score / 24 * 100).toFixed(0)}%` : `Excellent , with a score of ${(score / 24 * 100).toFixed(0)}%`;


</script>
<template>
  <div>
    <div style="width:446px;height:auto" ref="pdfSection">
      <img src="../../assets/img/pdf/ceo-pdf-p-1-s-1.png" alt="pdf" />
      <div style="margin-left:28px;font-size:9px;font-weight:700;height:30px;"> {{ Rating }}</div>
      <img src="../../assets/img/pdf/ceo-pdf-p-1-s-2.png" alt="pdf" />
      <div style="margin-top:1px;margin-left:30px;">
        <span style="font-size:5px;margin-right:6px;">Center for Employment Opportunities</span>
        <span style="font-size:5px;margin-right:6px;">50 Broadway, Suite 1604</span>
        <span style="font-size:5px;margin-right:6px;">New York, NY</span>
        <span style="font-size:5px;margin-right:6px;">10004</span>
        <span style="font-size:5px;margin-right:6px;">P: 212.422.4430</span>
        <span style="font-size:5px;margin-right:6px;">E. info@ceoworks.org</span>
      </div>
      <img style="margin-top:20px;" src="../../assets/img/pdf/ceo-pdf-p-2.png" alt="pdf" />
      <div style="margin-top:17px;margin-left:30px;">
        <span style="font-size:5px;margin-right:6px;">Center for Employment Opportunities</span>
        <span style="font-size:5px;margin-right:6px;">50 Broadway, Suite 1604</span>
        <span style="font-size:5px;margin-right:6px;">New York, NY</span>
        <span style="font-size:5px;margin-right:6px;">10004</span>
        <span style="font-size:5px;margin-right:6px;">P: 212.422.4430</span>
        <span style="font-size:5px;margin-right:6px;">E. info@ceoworks.org</span>
      </div>
      <img style="margin-top:20px;" src="../../assets/img/pdf/ceo-pdf-p-3.png" alt="pdf" />
      <img style="margin-top:-10px;" src="../../assets/img/pdf/ceo-pdf-q.png" alt="pdf" />
      <div style="margin-top:-15px;margin-left:30px;">
        <span style="font-size:5px;margin-right:6px;">Center for Employment Opportunities</span>
        <span style="font-size:5px;margin-right:6px;">50 Broadway, Suite 1604</span>
        <span style="font-size:5px;margin-right:6px;">New York, NY</span>
        <span style="font-size:5px;margin-right:6px;">10004</span>
        <span style="font-size:5px;margin-right:6px;">P: 212.422.4430</span>
        <span style="font-size:5px;margin-right:6px;">E. info@ceoworks.org</span>
      </div>
    </div>
    <button @click="exportToPDF('my-pdf-file.pdf', pdfSection)">
      print card
    </button>
  </div>
</template>