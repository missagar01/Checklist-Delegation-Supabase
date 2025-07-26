import supabase from "../../SupabaseClient";

export const fetchDashboardDataApi = async (dashboardType) => {
  try {
    console.log(dashboardType)
    const { data, error } = await supabase
      .from(dashboardType)
      .select('*');

    if (error) {
      console.log("Error when fetching data", error);
      return [];
    }

   

    console.log("Fetched successfully", data);
    return data;

  } catch (error) {
    console.log("Error from Supabase", error);
    return [];
  }
};



