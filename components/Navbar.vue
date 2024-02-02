
<template>
  <nav id="navbar" class="relative z-10 w-full text-neutral-800 shadow-md bg-white">
    <NuxtLink class="w-20 log-in-button px-3 py-1 font-extrabold absolute" to="/login">Log in</NuxtLink>
     <div class="flex max-w-screen-2xl px-14 items-center justify-between nav-container">
      <div class="w-full h-full flex flex-row justify-between my-2">
        <NuxtLink class="pt-2.5 pb-2" to="/">
          <img class=" logo" src="../assets/img/CEO.png" alt="CEO Works Logo" />
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>

.logo {
  width: 188px;
  height: 77px;
}

.log-in-button {
  right: 0px;
  top: 0px;
  z-index: 11;
}
.log-in-button2 {
  right: 0px;
  top: 30px;
  cursor: pointer;
}
@media (max-width: 868px) {
  .logo {
  width: 94px;
  height: 38.5px;
}
.nav-container {
  padding: 0px 1.5rem;
}
}

</style>
