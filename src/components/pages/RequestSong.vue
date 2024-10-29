<script setup lang="ts">
import {LOCAL_STORAGE} from "@/utils/auth/auth";
import { requestProvider } from 'webln'
import {onBeforeMount, ref} from 'vue'
import {Button} from "@/components/ui/button";
import {ReloadIcon, ExitIcon} from "@radix-icons/vue";
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

const emits = defineEmits(['onLogout'])

const profileURL = ref('')

function onLogout() {
  emits('onLogout')
}

async function requestSong() {
  const webln = await requestProvider()
  await webln.enable()
  const res = await webln.getInfo()
  await webln.sendPayment('lnbc210n1pnjqwnspp5nul3lajcel0jgr5v4jc7twm74w9ucwd4xlj248rw4cw32kc34k7sdq5g9kxy7fqd9h8vmmfvdjscqzzsxqyz5vqsp5jhduqdnxzdc0pj6pjwhs42qv08w0uam2dx3sth3a04njwrrj7ezs9qxpqysgq7cpew6fhrzguvh943rylpdezsp999l4lyurvc9rv49rfrkqrshhp7495n2nv8sdrlef26zaayufj4tp32ka3qpdpddvwan02ljvjtysqrpwtt9')
}

onBeforeMount(async () => {
  const lnaddress = window.localStorage.getItem(LOCAL_STORAGE.LIGHTNING_ADDRESS)
  const userId = window.localStorage.getItem(LOCAL_STORAGE.USER_ID)
  profileURL.value = `https://robohash.org/${userId}.png?set=set1&bgset=bg2`
})
</script>

<template>
  <div class="flex w-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-2 text-center text-2xl/9 font-bold tracking-tight text-white">
        Sing4Sats! 🎤
      </h2>
    </div>

    <div class="mx-auto mt-10 flex flex-col items-center">
      <Avatar size="base">
        <AvatarImage :src="profileURL" alt="@radix-vue" />
      </Avatar>
      <Badge class="mt-5">jaonoctus@zbd.gg</Badge>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm mx-6">
      <form class="space-y-6" @submit.prevent="requestSong">
        <div>
          <label for="url" class="block text-sm/6 font-medium text-white">
            YouTube URL
          </label>
          <div class="mt-2">
            <input
                id="url"
                name="url"
                type="url"
                autocomplete="off"
                required
                class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <Button
              :disabled="false"
              type="submit"
              class="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          >
            <ReloadIcon v-if="false" class="w-4 h-6 mr-2 animate-spin" />
            {{ false ? 'Loading...' : 'Request Song' }}
          </Button>
        </div>
      </form>

      <div class="mx-auto mt-10 flex flex-col items-center text-center">
        <span @click.prevent="onLogout" class="font-semibold text-orange-400 hover:text-orange-300">exit <ExitIcon class="inline" /></span>
      </div>

      <p class="mt-10 text-center text-sm/6 text-gray-400 italic">
        made by <a href="https://github.com/jaonoctus" class="font-semibold text-orange-400 hover:text-orange-300">jaonoctus</a> & <a href="https://github.com/ngoline" class="font-semibold text-orange-400 hover:text-orange-300">nGoline</a> with <span class="font-semibold text-red-400">love</span>.
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>
