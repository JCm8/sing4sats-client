<script setup lang="ts">
import {LOCAL_STORAGE} from "@/utils/auth/auth";
import {computed, ref, defineEmits } from 'vue'
import { Button } from '@/components/ui/button'
import { PinInput, PinInputGroup, PinInputInput } from '@/components/ui/pin-input'
import { ReloadIcon } from '@radix-icons/vue'

const emit = defineEmits(['onAuth'])

const lightningAddress = ref('')
const roomCodeInput = ref<string[]>([])
const roomCode = computed(() => roomCodeInput.value.join(''))
const isLoading = ref(false)

async function attemptJoinRoom() {
  isLoading.value = true
  console.log('Joining room', lightningAddress.value, roomCode.value)
  window.localStorage.setItem(LOCAL_STORAGE.LIGHTNING_ADDRESS, lightningAddress.value)
  window.localStorage.setItem(LOCAL_STORAGE.ROOM_CODE, roomCode.value)
  window.localStorage.setItem(LOCAL_STORAGE.USER_ID, 'user-id')
  emit('onAuth')
}
</script>

<template>
  <div class="flex h-full w-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
        Sing4Sats! 🎤
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm mx-6">
      <form class="space-y-6" @submit.prevent="attemptJoinRoom">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-white">
            Lighting address
          </label>
          <div class="mt-2">
            <input
                id="email"
                name="email"
                type="email"
                autocomplete="off"
                required
                class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="room" class="block text-sm/6 font-medium text-white">
              Room code
            </label>
          </div>
          <div class="mt-2 flex justify-center">
              <PinInput
                  id="pin-input"
                  v-model="roomCodeInput"
                  placeholder="○"
                  class="flex"
                  type="number"
              >
                <PinInputGroup class="gap-10">
                  <PinInputInput
                      class="bg-white/5 rounded-md border"
                      v-for="(id, index) in 4"
                      :key="id"
                      :index="index"
                      otp
                  />
                </PinInputGroup>
              </PinInput>
          </div>
        </div>

        <div>
          <Button
              :disabled="isLoading"
              type="submit"
              class="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          >
            <ReloadIcon v-if="isLoading" class="w-4 h-6 mr-2 animate-spin" />
            {{ isLoading ? 'Loading...' : 'Join room'}}
          </Button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-400 italic">
        made by <a href="https://github.com/jaonoctus" class="font-semibold text-orange-400 hover:text-orange-300">jaonoctus</a> & <a href="https://github.com/ngoline" class="font-semibold text-orange-400 hover:text-orange-300">nGoline</a> with <span class="font-semibold text-red-400">love</span>.
      </p>
    </div>
  </div>
</template>
