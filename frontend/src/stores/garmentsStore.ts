import { fetchAllGarments } from "@/api/postApi.ts";
import type { GarmentType } from "@/types.ts";
import { ref } from "vue";

export const garments = ref<GarmentType[] | null>(
  JSON.parse(localStorage.getItem("garments") || "[]"),
);

export async function setGarments() {
  garments.value = await fetchAllGarments();
  localStorage.setItem("garments", JSON.stringify(garments.value));
}

export function clearGarments() {
  garments.value = null;
  localStorage.removeItem("garments");
}
