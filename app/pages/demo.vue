<template>
  <div class="container mx-auto p-8">
    <h1 class="text-3xl font-bold mb-8">NuxtHub Features Demo</h1>

    <!-- Database Section -->
    <div class="mb-8 p-6 border rounded-lg">
      <h2 class="text-2xl font-semibold mb-4">📊 Database (D1)</h2>
      <div class="space-y-4">
        <UButton @click="fetchUsers">ดึงข้อมูล Users</UButton>
        <div v-if="users" class="bg-gray-100 p-4 rounded">
          <pre>{{ users }}</pre>
        </div>

        <div class="flex gap-2">
          <UInput v-model="newUser.name" placeholder="Name" />
          <UInput v-model="newUser.email" placeholder="Email" />
          <UButton @click="addUser">เพิ่ม User</UButton>
        </div>
      </div>
    </div>

    <!-- Blob Storage Section -->
    <div class="mb-8 p-6 border rounded-lg">
      <h2 class="text-2xl font-semibold mb-4">📁 Blob Storage</h2>
      <div class="space-y-4">
        <div>
          <input type="file" @change="onFileChange" class="mb-2" />
          <UButton @click="uploadFile">อัปโหลดไฟล์</UButton>
        </div>

        <UButton @click="listBlobs">ดูรายการไฟล์</UButton>
        <div v-if="blobs" class="bg-gray-100 p-4 rounded">
          <pre>{{ blobs }}</pre>
        </div>
      </div>
    </div>

    <!-- KV Storage Section -->
    <div class="mb-8 p-6 border rounded-lg">
      <h2 class="text-2xl font-semibold mb-4">🔑 KV Storage</h2>
      <div class="space-y-4">
        <div class="flex gap-2">
          <UInput v-model="kvForm.key" placeholder="Key" />
          <UInput v-model="kvForm.value" placeholder="Value" />
          <UButton @click="setKV">บันทึก</UButton>
        </div>

        <div class="flex gap-2">
          <UInput v-model="kvForm.getKey" placeholder="Key to get" />
          <UButton @click="getKV">ดึงข้อมูล</UButton>
        </div>

        <div v-if="kvResult" class="bg-gray-100 p-4 rounded">
          <pre>{{ kvResult }}</pre>
        </div>

        <UButton @click="listKeys">ดูรายการ Keys</UButton>
        <div v-if="kvKeys" class="bg-gray-100 p-4 rounded">
          <pre>{{ kvKeys }}</pre>
        </div>
      </div>
    </div>

    <!-- Cache Section -->
    <div class="mb-8 p-6 border rounded-lg">
      <h2 class="text-2xl font-semibold mb-4">⚡ Cache</h2>
      <div class="space-y-4">
        <UButton @click="fetchCachedUsers">ดึง Users (Cached 60s)</UButton>
        <div v-if="cachedUsers" class="bg-gray-100 p-4 rounded">
          <pre>{{ cachedUsers }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Database
const users = ref<Awaited<
  ReturnType<typeof $fetch<unknown, "/api/database/users">>
> | null>(null);
const newUser = ref({ name: "", email: "" });

const fetchUsers = async () => {
  users.value = await $fetch("/api/database/users");
};

const addUser = async () => {
  await $fetch("/api/database/users", {
    method: "POST",
    body: newUser.value,
  });
  newUser.value = { name: "", email: "" };
  await fetchUsers();
};

// Blob Storage
const selectedFile = ref<File | null>(null);
const blobs = ref<Record<string, unknown> | null>(null);

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0];
  }
};

const uploadFile = async () => {
  if (!selectedFile.value) return;

  const formData = new FormData();
  formData.append("file", selectedFile.value);

  await $fetch("/api/blob/upload", {
    method: "POST",
    body: formData,
  });

  await listBlobs();
};

const listBlobs = async () => {
  blobs.value = await $fetch("/api/blob/list");
};

// KV Storage
const kvForm = ref({
  key: "",
  value: "",
  getKey: "",
});
const kvResult = ref<Record<string, unknown> | null>(null);
const kvKeys = ref<Record<string, unknown> | null>(null);

const setKV = async () => {
  await $fetch("/api/kv/set", {
    method: "POST",
    body: {
      key: kvForm.value.key,
      value: kvForm.value.value,
    },
  });
  kvForm.value.key = "";
  kvForm.value.value = "";
};

const getKV = async () => {
  kvResult.value = await $fetch(`/api/kv/get?key=${kvForm.value.getKey}`);
};

const listKeys = async () => {
  kvKeys.value = await $fetch("/api/kv/keys");
};

// Cache
const cachedUsers = ref<Record<string, unknown> | null>(null);

const fetchCachedUsers = async () => {
  cachedUsers.value = await $fetch("/api/cache/users");
};
</script>
