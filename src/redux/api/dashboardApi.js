// Updated API functions - replace your existing functions with these:

import supabase from "../../SupabaseClient";

export const fetchDashboardDataApi = async (dashboardType, staffFilter = null) => {
  try {
    console.log(dashboardType, staffFilter)
    let query = supabase.from(dashboardType).select('*');
    
    // Apply staff filter if provided and not "all"
    if (staffFilter && staffFilter !== 'all') {
      query = query.eq('name', staffFilter);
    }

    const { data, error } = await query;

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


export const countTotalTaskApi = async (dashboardType, staffFilter = null) => {
  const role = localStorage.getItem('role');
  const username = localStorage.getItem('user-name');
  try {
    let query = supabase
      .from(dashboardType)
      .select('*', { count: 'exact', head: true });

    // Apply staff filter logic
    if (staffFilter && staffFilter !== 'all') {
      // If staff filter is specified, use it regardless of role
      query = query.eq('name', staffFilter);
    } else if (role === 'user' && username) {
      // If no staff filter but user role, filter by username
      query = query.eq('name', username);
    }

    const { count, error } = await query;

    if (!error) {
      console.log('Total checklist rows:', count);
    } else {
      console.log("Error when fetching data", error);
    }

    return count;
  } catch (error) {
    console.log("Error from Supabase", error);
    return null;
  }
};

export const countCompleteTaskApi = async (dashboardType, staffFilter = null) => {
  const role = localStorage.getItem('role');
  const username = localStorage.getItem('user-name');
  try {
    let query;

    if (dashboardType === 'delegation') {
      query = supabase
        .from('delegation')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'done')
        .eq('color_code_for', 1);
    } else {
      query = supabase
        .from('checklist')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Yes');
    }

    // Apply staff filter logic
    if (staffFilter && staffFilter !== 'all') {
      query = query.eq('name', staffFilter);
    } else if (role === 'user' && username) {
      query = query.eq('name', username);
    }

    const { count, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return null;
    }

    console.log(`Total ${dashboardType} complete count:`, count);
    return count;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
};

export const countPendingOrDelayTaskApi = async (dashboardType, staffFilter = null) => {
  const role = localStorage.getItem('role');
  const username = localStorage.getItem('user-name');
  try {
    const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'
    let query;

    if (dashboardType === 'delegation') {
      query = supabase
        .from('delegation')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'done')
        .eq('color_code_for', 2);
    } else {
      query = supabase
        .from('checklist')
        .select('*', { count: 'exact', head: true })
        .or('status.is.null')
        .lte('task_start_date', `${today}T23:59:59`);
    }

    // Apply staff filter logic
    if (staffFilter && staffFilter !== 'all') {
      query = query.eq('name', staffFilter);
    } else if (role === 'user' && username) {
      query = query.eq('name', username);
    }

    const { count, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return null;
    }

    console.log(`Total ${dashboardType} pending/delay count:`, count);
    return count;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
};

export const countOverDueORExtendedTaskApi = async (dashboardType, staffFilter = null) => {
  const role = localStorage.getItem('role');
  const username = localStorage.getItem('user-name');
  try {
    let query;
    const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'

    if (dashboardType === 'delegation') {
      query = supabase
        .from('delegation')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'done')
        .gt('color_code_for', 2);
    } else {
      query = supabase
        .from('checklist')
        .select('*', { count: 'exact', head: true })
        .is('status', null)
        .lt('task_start_date', today); // exclude today
    }

    // Apply staff filter logic
    if (staffFilter && staffFilter !== 'all') {
      query = query.eq('name', staffFilter);
    } else if (role === 'user' && username) {
      query = query.eq('name', username);
    }

    const { count, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return null;
    }

    console.log(`Total ${dashboardType} count:`, count);
    return count;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
};