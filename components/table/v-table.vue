<template>
  <div class="relative w-full rounded-lg border-gray-200" v-bind="$attrs">
    <Transition name="page" mode="out-in">
      <table v-if="!isEmpty" class="min-w-full">
        <thead
          v-if="!pending || !data"
          class="rounded-t-lg text-sm font-normal text-gray-400"
        >
          <slot name="header"></slot>
        </thead>
        <Transition name="page" mode="out-in">
          <tbody v-if="!pending && !!data">
            <tr
              v-for="(row, i) in data?.data"
              @click="onRowClick?.(row)"
              :class="[
                'group mb-4 rounded-xl text-gray-600 transition-all odd:bg-gray-50 even:bg-white hover:-ml-3 hover:border-l-2 hover:border-gray-600 hover:bg-gray-100',
                onRowClick ? 'cursor-pointer' : ''
              ]"
            >
              <slot v-bind="{ row, i }"> </slot>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td class="py-2"></td>
            </tr>
            <tr v-for="_ in fakeRows" class="animate-pulse">
              <td class="px-0.5 py-1.5">
                <div
                  class="flex h-16 w-full items-center bg-gray-200 text-sm delay-100"
                ></div>
              </td>
              <td v-for="_ in fakeColumns" class="px-0.5 py-1.5">
                <div
                  class="flex h-16 w-full min-w-4 items-center bg-gray-200 text-sm delay-100"
                ></div>
              </td>
            </tr>
          </tbody>
        </Transition>
      </table>
      <slot v-else name="empty">
        <Empty class="flex w-full" />
      </slot>
    </Transition>
  </div>

  <Pagination
    v-if="data?.meta"
    v-bind="data.meta"
    @paginate="(p) => emit('paginate', p)"
    class="flex h-full w-full items-end"
  />
</template>

<script setup lang="ts">
export type TableRow<T> = { i: number; row: T }
import { ApiList } from '~~/composables/fetch'
import Empty from '../ui/empty.vue'
import Pagination from './pagination.vue'

// defines
const props = defineProps<{
  data: ApiList<any> | null
  pending?: boolean
  skeleton?: { rows: number; columns: number }
  onRowClick?: (row: any) => void
}>()
const emit =
  defineEmits<
    (e: 'paginate', pagination: { page: number; perPage: number }) => void
  >()

// refs
const fakeRows = new Array(props.skeleton?.rows ?? 3)
const fakeColumns = new Array(props.skeleton?.columns ?? 4)
const isEmpty = computed(() => !props.pending && props.data?.data.length === 0)
</script>
