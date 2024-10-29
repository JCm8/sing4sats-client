<script setup lang="ts">
import RequestSong from "@/components/pages/RequestSong.vue";
import SignIn from '@/components/pages/SignIn.vue'
import { useAuth } from './utils/auth/auth'

const { isSignedIn, onAuth, onLogout } = useAuth()
</script>

<template>
  <main class="flex min-h-full flex-1">
    <div class="w-full">
      <SignIn v-if="!isSignedIn" @onAuth="onAuth" />
      <RequestSong v-else @onLogout="onLogout" />
    </div>
  </main>
</template>
