<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { deleteRecord, getRecords } from '@/services/RecordsService'
import { formatDate } from '@/utils/formatDate'
import { FormatRecord, Record } from '@/interfaces/Record'
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

const toast = useToast()
const records = ref<FormatRecord[]>([])
const selectedRecord = ref<Record | null>(null)
const deleteRecordDialog = ref<boolean>(false)

const page = ref<number>(0)
const limit = ref<number>(5)
const sortField = ref<string>('');
const sortOrder = ref<number>(1);
const rowsPerPageOptions = ref<number[]>([5, 10, 15, 20])
const totalRecords = ref<number>(0)
const loading = ref<boolean>(false)
const authStore = useAuthStore()

const user = computed(() => {
  return authStore.userDetail
})
const getRecordsService = async (): Promise<void> => {
  try {
    loading.value = true
    const res = await getRecords(user.value.id, page.value, limit.value, sortField.value, sortOrder.value, {})
    const formattedRecords: FormatRecord[] = res.records.map((record: Record) => {
      return {
        ...record,
        created_at: formatDate(record.created_at)
      }
    })
    records.value = formattedRecords
    totalRecords.value = res.total_records
    loading.value = false
  } catch (error) {
    console.log(error)
  }
}

onMounted(async (): Promise<void> => {
  await getRecordsService()
})

const confirmDeleteSelected = (): void => {
  deleteRecordDialog.value = true
}
const hideDeletedDialog = (): void => {
  deleteRecordDialog.value = false
  selectedRecord.value = null
}

const deleteRecordApi = async (): Promise<void> => {
  try {
    await deleteRecord(selectedRecord.value!._id, {})
    await getRecordsService()
    toast.add({
      severity: 'success',
      summary: 'Success Message',
      detail: 'Record deleted successfully',
      life: 3000
    })
  } catch (error) {
    console.log(error)
    toast.add({
      severity: 'error',
      summary: 'Error Message',
      detail: 'This Record can not be deleted',
      life: 3000
    })
  }
  deleteRecordDialog.value = false
  selectedRecord.value = null
}

const handlePageChange = async (event): Promise<void> => {
  if (page.value !== event.page || limit.value !== event.rows) {
    page.value = event.page
    limit.value = event.rows
    await getRecordsService()
  }
}
const onSort = async(event): Promise<void> => {
  sortField.value = event.sortField;
  sortOrder.value = event.sortOrder === 1 ? 1 : -1;
  await getRecordsService();
};
</script>

<template>
  <h1 class="text-center">User Records</h1>
  <Toast position="top-center" />
  <div class="card mx-4">
    <DataTable
      v-model:selection="selectedRecord"
      paginator
      lazy
      :loading="loading"
      :value="records"
      :totalRecords="totalRecords"
      :rows="limit"
      :rowsPerPageOptions="rowsPerPageOptions"
      tableStyle="min-width: 50rem"
      dataKey="_id"
      :onPage="handlePageChange"
      :sortField="sortField"
      :sortOrder="sortOrder"
      @sort="onSort"
    >
      <template #header>
        <div class="flex justify-content-between">
          <div>
            <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined />
            <Button
              label="Delete"
              icon="pi pi-trash"
              severity="danger"
              :disabled="!selectedRecord"
              class="mx-4"
              @click="confirmDeleteSelected"
            />
          </div>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText placeholder="Keyword Search" />
          </span>
        </div>
      </template>
      <Column selectionMode="single" headerStyle="width: 3rem" class="text-center"></Column>
      <Column field="_id" header="Id" sortable style="width: 5%"></Column>
      <Column field="operation_id" header="Operation Id" sortable style="width: 15%"></Column>
      <Column field="user_id" header="User Id" sortable style="width: 15%"></Column>
      <Column field="amount" header="Amount" sortable style="width: 10%"></Column>
      <Column field="user_balance" header="User Balance" sortable style="width: 10%"></Column>
      <Column
        field="operation_response"
        header="Operation Response"
        sortable
        style="width: 15%"
      ></Column>
      <Column field="created_at" header="Created At" sortable style="width: 15%"></Column>
    </DataTable>
  </div>
  <Dialog
    v-model:visible="deleteRecordDialog"
    :style="{ width: '450px' }"
    header="Confirm"
    :modal="true"
  >
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="selectedRecord">
        Are you sure you want to delete operation
        <b>{{ selectedRecord._id }}</b
        >?
      </span>
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" text @click="hideDeletedDialog" />
      <Button label="Yes" icon="pi pi-check" text @click="deleteRecordApi" />
    </template>
  </Dialog>
</template>
