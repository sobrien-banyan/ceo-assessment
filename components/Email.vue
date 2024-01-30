<script setup>
const year = ref(new Date().getFullYear());
import { reportContent } from '~/pages/assessment/data/reportContent';
const props = defineProps({
  UserName: {
    type: String,
    default: 'Valued Client',
  },
  Rating: {
    type: String,
    default: 'Excellent!',
  },
  DateSubmitted: {
    type: Date,
    default: new Date(),
  },
})

const formattedDate = new Intl.DateTimeFormat('en', {
  dateStyle: 'long',
  timeStyle: 'short',
}).format(props.DateSubmitted)

const main = {
  backgroundColor: '#fff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}
const container = {
  width: '100%',
  maxWidth: '1000px', 
}

const paragraph = {
  fontSize: '16px',
}

const containerButton = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
}

const button = {
  backgroundColor: '#41ef00',
  padding: '12px 30px',
  borderRadius: 3,
  color: '#FFF',
  fontWeight: 'bold',
  border: '1px solid rgb(0,0,0, 0.1)',
  cursor: 'pointer',
}

const content = {
  border: '1px solid rgb(0,0,0, 0.1)',
  borderRadius: '3px',
  overflow: 'hidden',
}

const boxInfos = {
  padding: '20px 40px',
}

</script>

<template>
  <EHtml>
    <EHead />
    <EPreview>Fair Chance Employment Self Assessment</EPreview>
    <EBody :style="main">
      <EContainer :style="container">
        <ESection :style="content">

          <ERow :style="{
            ...boxInfos,
            paddingBottom: 0,
          }">
            <EColumn>
              <EHeading style="font-size: 32; font-weight: bold; text-align: center"> Hi {{ UserName }}, </EHeading>
              <EHeading as="h2" :style="{
                fontSize: '26px',
                fontWeight: 'bold',
                textAlign: 'center',
              }">
                Congratulations on finishing the report.
              </EHeading>

              <EText :style="paragraph">
                <b>Time: </b>
                {{ formattedDate }}
              </EText>
              <EText :style="{ ...paragraph, marginTop: '-5px' }">
                <b>Rating: </b>
                {{ Rating }}
              </EText>

              <EText :style="paragraph">
                <div>
                  <EHeading style="font-size: 28; font-weight: bold">Assessment Report</EHeading>
                  <div v-html="reportContent.content_one"></div>
                  <div :style="{ ...paragraph }" class="underline decoration-solid ml-7 text-lg lg:text-2xl">
                    {{ Rating }}</div>
                  <div v-html="reportContent.content_two"></div>
                </div>
              </EText>
              <EText :style="{ ...paragraph, marginTop: '-5px' }"> If you have additional questions, please see our
                support
                page. </EText>
            </EColumn>
          </ERow>
          <ERow :style="{ ...boxInfos, paddingTop: '0' }">
            <EColumn :style="containerButton" col-span="{2}">
              <EButton href="https://www.ceoworks.org" :style="button"> Learn More </EButton>
            </EColumn>
          </ERow>
        </ESection>
        <EText :style="{
          textAlign: 'center',
          fontSize: 12,
          color: 'rgb(0,0,0, 0.7)',
        }">
          PRIVACY POLICY | &copy; {{ year }} Center for Employment Opportunities
        </EText>
      </EContainer>
    </EBody>
  </EHtml>
</template>

