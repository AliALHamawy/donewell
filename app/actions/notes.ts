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

    // الشرط الجديد: الوصف إجباري، أما العنوان فاختياري
    if (!content || content.trim() === "") {
        return { error: "Please write content for the note" };
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
        return { error: "You must be logged in to add a note" };
    }

    const { error } = await supabase.from("notes").insert([
        {
            title: title && title.trim() !== "" ? title : null, // إذا تركه فارغاً يُحفظ كـ null
            content: content,
            user_id: user.id,
        },
    ]);

    if (error) {
        return { error: error.message };
    }

    return { success: true };
}


export async function deleteNote(id: string) {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
        return { error: "You must be logged in to delete a note" };
    }

    const { error } = await supabase
        .from("notes")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id); // للتأكد أن المستخدم يحذف ملاحظاته الخاصة فقط للأمان

    if (error) {
        return { error: error.message };
    }

    return { success: true };
}

export async function updateNote(id: string, formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    // الوصف إجباري أيضاً عند التعديل
    if (!content || content.trim() === "") {
        return { error: "Please write content for the note" };
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
        return { error: "You must be logged in to update a note" };
    }

    const { error } = await supabase
        .from("notes")
        .update({
            title: title && title.trim() !== "" ? title : null,
            content: content,
        })
        .eq("id", id)
        .eq("user_id", user.id); // ضمان أن المستخدم يملك الملاحظة

    if (error) {
        return { error: error.message };
    }

    return { success: true };
}