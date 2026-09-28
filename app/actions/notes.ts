import { supabase } from "@/lib/supabaseClient";

export async function getNotes() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { notes: [], error: "You must be logged in" };

    const { data: notes, error } = await supabase
        .from("notes")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    if (error) {
        return { notes: [], error: error.message };
    }

    return { notes, error: null };
}

export async function createNote(formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    if (!content && !title) {
        return { error: "Please write content for the note" };
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
        return { error: "You must be logged in to add a note" };
    }

    const { error } = await supabase.from("notes").insert([
        {
            title: title || null,
            content: content || "",
            user_id: user.id,
        },
    ]);

    if (error) {
        return { error: error.message };
    }

    return { success: true };
}