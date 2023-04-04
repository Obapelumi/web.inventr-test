<template>
  <div class="flex flex-col w-full">
    <div v-for="_ in fakeRows" class="flex space-x-4">
      <div
        v-for="_ in fakeColumns"
        class="mx-auto mb-4 hidden w-full max-w-sm rounded-lg shadow first:flex md:flex"
      >
        <div class="flex w-full animate-pulse space-x-4 pr-4">
          <div class="w-20 bg-gray-200"></div>
          <div class="w-full flex-1 space-y-4 py-4">
            <div class="h-3 rounded bg-gray-200"></div>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div class="col-span-2 h-3 rounded bg-gray-200"></div>
                <div class="col-span-1 h-3 rounded bg-gray-200"></div>
              </div>
              <div class="h-3 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ rows: number; columns: number }>()
const fakeRows = new Array(props.rows)
const fakeColumns = new Array(props.columns)
</script>
