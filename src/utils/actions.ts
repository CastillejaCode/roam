"use server";

import { PlaceT } from "@/types";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const cookieStore = cookies();
const supabase = createClient(cookieStore);

// Create //

export async function createPlace(place: PlaceT) {
  try {
    const { error } = await supabase.from("places").insert(place);
    if (error) throw new Error(`Supabase error: ${error.message}`);
    revalidatePath("/map");
  } catch (error) {
    console.log(error);
  }
}

export async function createTrip(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const rawFormData = {
    name: formData.get("name"),
  };
  try {
    const { error } = await supabase.from("trips").insert(rawFormData);
    if (error) throw new Error(`Supabase error: ${error.message}`);
    revalidatePath("/trips");
  } catch (error) {
    console.log(error);
  }
}

// Update //

export async function updateDuration(formData: FormData) {
  const id = formData.get("id");
  const rawFormData = {
    duration: formData.get("duration"),
  };
  try {
    const { error } = await supabase
      .from("places")
      .update(rawFormData)
      .eq("id", id);
    if (error) throw new Error(`Supabase error: ${error.message}`);
    revalidatePath("/map");
  } catch (error) {
    console.log(error);
  }
}

export async function updateStartTime(formData: FormData) {
  const rawFormData = {
    start_time: formData.get("startTime"),
  };
  try {
    const { error } = await supabase
      .from("days")
      .update(rawFormData)
      .eq("id", 3);
    if (error) throw new Error(`Supabase error: ${error.message}`);
    revalidatePath("/map");
  } catch (error) {
    console.log(error);
  }
}

// Delete //

export async function deletePlace(place: PlaceT) {
  try {
    const { error } = await supabase.from("places").delete().eq("id", place.id);
    if (error) throw new Error(`Supabase error: ${error.message}`);
    revalidatePath("/map");
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTrip(id: number) {
  const { error } = await supabase.from("trips").delete().eq("id", id);
  if (error) throw new Error(`Supabase error: ${error.message}`);
  revalidatePath("/trips");
}
