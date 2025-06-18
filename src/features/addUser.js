import { supabase } from "@/supabaseConfig";

const addUserToDatabase = async (user) => {
  try {
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("auth_id", user.id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error fetching user:", fetchError.message);
      return;
    }

    if (!existingUser) {
      const { data, error: insertError } = await supabase.from("users").insert([
        {
          auth_id: user.id,
          email: user.email,
          name: user.user_metadata.full_name || user.email.split("@")[0],
          mobile_no: user?.phone,
        },
      ]);
      if (insertError) {
        console.error("Error inserting user:", insertError.message);
      } else {
        console.log("User added to database successfully");
      }
    }
  } catch (error) {
    console.error("Error in addUserToDatabase:", error.message);
  }
};

export default addUserToDatabase;
