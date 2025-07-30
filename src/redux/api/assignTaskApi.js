import supabase from "../../SupabaseClient";

export const fetchUniqueDepartmentDataApi = async () =>{
    try {
       const { data, error } = await supabase
  .from('users')
  .select('department','given_by','user_name')
   .not('department', 'is', null)
  .order('department', { ascending: true });
  

const uniqueDepartments = [...new Set(data.map(d => d.department))];

        if (!error) {
            console.log("fetch succefully",uniqueDepartments)
            
        } else {
           console.log("error when fetching data",error) 
        } 
        return uniqueDepartments;
    } catch (error) {
       console.log("error from supabase",error);
        
    }
}

export const fetchUniqueGivenByDataApi = async () =>{
    try {
       const { data, error } = await supabase
  .from('users')
  .select('given_by')
   .not('given_by', 'is', null)
  .order('given_by', { ascending: true });
  

const uniqueGivenBy = [...new Set(data.map(d => d.given_by))];

        if (!error) {
            console.log("fetch succefully",uniqueGivenBy)
            
        } else {
           console.log("error when fetching data",error) 
        } 
        return uniqueGivenBy;
    } catch (error) {
       console.log("error from supabase",error);
        
    }
}

export const fetchUniqueDoerNameDataApi = async () =>{
    try {
       const { data, error } = await supabase
  .from('users')
  .select('user_name')
   .not('user_name', 'is', null)
  .order('user_name', { ascending: true });
  

const uniqueDoerName = [...new Set(data.map(d => d.user_name))];

        if (!error) {
            console.log("fetch succefully",uniqueDoerName)
            
        } else {
           console.log("error when fetching data",error) 
        } 
        return uniqueDoerName;
    } catch (error) {
       console.log("error from supabase",error);
        
    }
}

export const pushAssignTaskApi =async(generatedTasks)=>{
    const submitTable =
  generatedTasks[0]?.frequency === "one-time" ? "delegation" : "checklist";


    const tasksData = generatedTasks.map((task) => ({
    department: task.department,
    given_by: task.givenBy,
    name: task.doer,
    task_description: task.description,
    task_start_date: task.dueDate,
    frequency: task.frequency,
    enable_reminder: task.enableReminders ? "Yes" : "No",
  require_attachment: task.requireAttachment ? "Yes" : "No",
  }));


    try {
        const{data,error} = await supabase
        .from(submitTable)
         .insert(tasksData);
       
         if (!error) {
            console.log("post succefully",data)
            
        } else {
           console.log("error when posting data",error) 
        } 
        return data;
    } catch (error) {
       console.log("error from supabase",error);
        
    }
}


