<script setup>
import { ref } from 'vue';

const year = ref(new Date().getFullYear());

const email = ref('');

const submit = async () => {
  useFetch('/api/mailingList', {
    method: 'POST',
    body: JSON.stringify({
      "email": email.value,
    }),
  });
};
</script>

<template>
  <footer class="bg-white flex mt-10">
    <div class="mx-auto w-full max-w-screen-xxl p-4 lg:pt-8">
      <div>

        <div class="flex mt-4 mb-8 sm:mt-0 justify-around info-container w-full">
          <div>
            <ul class="font-medium flex flex-col space-y-1">
              <li class="text-2xl font-bold">
                <p class="font-serif">Media</p>
              </li>
              <li class="text-2xl font-bold">
                <p class="font-serif">Contact</p>
              </li>
              <li class="text-2xl font-bold">
                <p class="font-serif">Careers</p>
              </li>
              <li class="text-2xl font-bold">
                <p class="font-serif">CEO Nest</p>
              </li>
            </ul>
          </div>
          <div>

            <ul class="font-medium flex flex-col space-y-2">
              <li>
                <p>50 Broadway, Suite 1604</p>
              </li>
              <li>
                <p>New York, NY</p>
              </li>
              <li>
                <p>10004</p>
              </li>
            </ul>
          </div>
          <div>

            <ul class="font-medium flex flex-col space-y-2">
              <li>
                <p>P: 212.422.4430</p>
              </li>
              <li>
                <p>F: 212.248.4432</p>
              </li>
              <li>
                <p>E. info@ceoworks.org</p>
              </li>
              <li>
                <div class="mt-2 sm:flex sm:items-center sm:justify-between">
                  <div class="flex mt-4 space-x-1 sm:justify-center sm:mt-0">
                    <a href="https://www.facebook.com/ceoworks" class="textgreen social-icon" target="_blank">
                      <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clip-rule="evenodd" />
                      </svg>
                      <span class="sr-only">Facebook page</span>
                    </a>
                    <a href="https://www.twitter.com/ceoworks" class="textgreen social-icon" target="_blank">
                      <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                      <span class="sr-only">Twitter page</span>
                    </a>
                    <a href="https://www.linkedin.com/company/center-for-employment-opportunities/"
                      class="textgreen social-icon" target="_blank">
                      <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                        <circle cx="24" cy="24" r="20" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M18.7747 14.2839C18.7747 15.529 17.8267 16.5366 16.3442 16.5366C14.9194 16.5366 13.9713 15.529 14.0007 14.2839C13.9713 12.9783 14.9193 12 16.3726 12C17.8267 12 18.7463 12.9783 18.7747 14.2839ZM14.1199 32.8191V18.3162H18.6271V32.8181H14.1199V32.8191Z"
                          fill="white" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M22.2393 22.9446C22.2393 21.1357 22.1797 19.5935 22.1201 18.3182H26.0351L26.2432 20.305H26.3322C26.9254 19.3854 28.4079 17.9927 30.8101 17.9927C33.7752 17.9927 35.9995 19.9502 35.9995 24.219V32.821H31.4922V24.7838C31.4922 22.9144 30.8404 21.6399 29.2093 21.6399C27.9633 21.6399 27.2224 22.4999 26.9263 23.3297C26.8071 23.6268 26.7484 24.0412 26.7484 24.4574V32.821H22.2411V22.9446H22.2393Z"
                          fill="white" />
                      </svg>
                      <span class="sr-only">Linkedin</span>
                    </a>
                    <a href="https://www.instagram.com/ceoworks/" class="textgreen social-icon" target="_blank">
                      <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clip-rule="evenodd" />
                      </svg>
                      <span class="sr-only">Instagram page</span>
                    </a>
                    <a href="https://www.youtube.com/channel/UCjjv7swi2Xx9J3uGwI4PY1A" class="textgreen social-icon"
                      target="_blank">
                      <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
                        <g fill="none" fill-rule="evenodd">
                          <path
                            d="M36,72 L36,72 C55.882251,72 72,55.882251 72,36 L72,36 C72,16.117749 55.882251,-3.65231026e-15 36,0 L36,0 C16.117749,3.65231026e-15 -2.4348735e-15,16.117749 0,36 L0,36 C2.4348735e-15,55.882251 16.117749,72 36,72 Z"
                            fill="currentColor" />
                          <path
                            d="M31.044,42.269916 L31.0425,28.6877416 L44.0115,35.5022437 L31.044,42.269916 Z M59.52,26.3341627 C59.52,26.3341627 59.0505,23.003199 57.612,21.5363665 C55.7865,19.610299 53.7405,19.6012352 52.803,19.4894477 C46.086,19 36.0105,19 36.0105,19 L35.9895,19 C35.9895,19 25.914,19 19.197,19.4894477 C18.258,19.6012352 16.2135,19.610299 14.3865,21.5363665 C12.948,23.003199 12.48,26.3341627 12.48,26.3341627 C12.48,26.3341627 12,30.2467232 12,34.1577731 L12,37.8256098 C12,41.7381703 12.48,45.6492202 12.48,45.6492202 C12.48,45.6492202 12.948,48.9801839 14.3865,50.4470165 C16.2135,52.3730839 18.612,52.3126583 19.68,52.5135736 C23.52,52.8851913 36,53 36,53 C36,53 46.086,52.9848936 52.803,52.4954459 C53.7405,52.3821478 55.7865,52.3730839 57.612,50.4470165 C59.0505,48.9801839 59.52,45.6492202 59.52,45.6492202 C59.52,45.6492202 60,41.7381703 60,37.8256098 L60,34.1577731 C60,30.2467232 59.52,26.3341627 59.52,26.3341627 L59.52,26.3341627 Z"
                            fill="#FFF" />
                        </g>

                      </svg>

                      <span class="sr-only">Youtube</span>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="flex mt-4 sm:mt-0 justify-around  w-full">
        <div>

          <label class="text-xs text-slate-500 font-bold">
            Subscribe to our mailing list
          </label>

          <div class="flex items-center space-x-2 mt-2">
            <form @submit="submit">
              <input type="email" v-model="email"
                class="w-72 h-8 px-2 py-4 sm:py-3 text-sm focus:outline-none border border-[#AAAAAA] placeholder-[#888]"
                placeholder="Enter your email" />
              <button type="submit"
                class="h-8 button-bg-ceogreen px-3 py-1 font-extrabold text-white hover:shadow-md transition duration-300">
                Subscribe
              </button>
            </form>
          </div>


          <div class="pt-10 pb-3 text-sm text-[#666666] hover:text-gray-900">
            PRIVACY POLICY | &copy; {{ year }} Center for Employment Opportunities
          </div>


        </div>
        <div class="w-5"></div>
        <div class="w-5"></div>
      </div>
    </div>
    <div class="bg-ceogreen newwletter-container">
      <div class="round-white">

        <div class="text-2xl text-center font-semibold">Stay Connected</div>
      </div>
      <a href="https://www.ceoworks.org/join-us" target="_blank" class="underline font-semibold text-white">Join our newsletter</a>
    </div>
  </footer>
</template>

<style>
.newwletter-container {
  width: 203px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.round-white {
  height: 144px;
  width: 144px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 19px;
}

@media screen and (max-width: 640px) {
  .newwletter-container {
    display: none;
  }
  .info-container {
    flex-direction: column;
  } 
}
  
</style>