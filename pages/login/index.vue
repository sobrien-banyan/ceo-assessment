<script setup>
definePageMeta({
  layout: "main",
});
import { ref } from 'vue';

const username = ref('');
const password = ref('');

const signInHandler = async () => {
    if (username.value === '' || password.value === '') {
        return;
    }
  await useFetch(`/api/auth`, {
    method: 'POST',
    body: {
      username: username.value,
      password: password.value,
    },
  }).then((res) => {
    if (res.data.value.status === 'authenticated') {
        navigateTo({path: '/admin', query: {token: res.data.value.token}});
    };
  });
};

</script>
<template>
    <section>
        <div class="login-container flex flex-col items-center px-6 py-8 mx-auto lg:py-0">
            <div class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                Log in
            </div>
            <div class="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Welcome back
                    </h1>
                    <form class="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Your
                                Username</label>
                            <input v-model="username" type="username" name="username" id="username"
                                class="block w-full h-10 bg-green-100  border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 placeholder:pl-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                                placeholder="Your name" required>
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input v-model="password" type="password" name="password" id="password" placeholder="••••••••"
                                class="block w-full h-10 bg-green-100  border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 placeholder:pl-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                                required>
                        </div>
                        <button @click.prevent="signInHandler" type="submit"
                            class="w-full bg-green-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign
                            in</button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            <img class="w-19 h-8 mr-2" src="~/assets/img/CEO.png" alt="CEO Works Logo" />
                        </p>
                    </form>

                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.log-in-button2 {
  left: 0px;
  cursor: pointer;
}
.login-container {
        margin-top: 25px;
    }
  @media (max-width: 868px) {
    .login-container {
        margin-top: 5px;
    }
}
</style>