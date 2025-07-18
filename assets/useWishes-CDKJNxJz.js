import{supabase as o}from"./supabase-CzT8qtRc.js";import{r as n,i as v}from"./index-fFjDkX5r.js";const F=()=>{const c=n([]),t=n(!1),d=v(()=>t.value),u=async r=>{t.value=!0;try{const{data:s,error:e}=await o.from("wishes").insert([{...r,visibility:r.visibility||"friends",is_bought:!1,is_received:!1}]).select(`
          *,
          created_for_user:profiles!wishes_created_for_user_id_fkey(*),
          created_by_user:profiles!wishes_created_by_user_id_fkey(*)
        `).single();if(e)throw e;return c.value.push(s),{data:s,error:null}}catch(s){return console.error("Error creating wish:",s),{data:null,error:s}}finally{t.value=!1}},h=async(r,s=!1)=>{if(!r)return;const e=t.value;e||(t.value=!0);try{let i=o.from("wishes").select(`
          *,
          created_for_user:profiles!wishes_created_for_user_id_fkey(*),
          created_by_user:profiles!wishes_created_by_user_id_fkey(*)
        `).eq("created_for_user_id",r).eq("created_by_user_id",r).order("created_at",{ascending:!1});s||(i=i.eq("is_received",!1));const{data:a,error:_}=await i;if(_)throw _;return c.value=a,{data:a,error:null}}catch(i){return console.error("Error fetching wishes:",i),{data:null,error:i}}finally{e||(t.value=!1)}},y=async(r,s=!1)=>{if(!r)return;const e=t.value;e||(t.value=!0);try{let i=o.from("wishes").select(`
          *,
          created_for_user:profiles!wishes_created_for_user_id_fkey(*),
          created_by_user:profiles!wishes_created_by_user_id_fkey(*)
        `).eq("created_for_user_id",r).order("created_at",{ascending:!1});s||(i=i.eq("is_received",!1));const{data:a,error:_}=await i;if(_)throw _;return c.value=a,{data:a,error:null}}catch(i){return console.error("Error fetching all wishes for user:",i),{data:null,error:i}}finally{e||(t.value=!1)}},w=async r=>{if(r){t.value=!0;try{const{data:s,error:e}=await o.from("friendships").select("friend_id, user_id").or(`user_id.eq.${r},friend_id.eq.${r}`).eq("status","accepted");if(e)throw e;const i=s?.map(f=>f.user_id===r?f.friend_id:f.user_id)||[];if(i.length===0)return c.value=[],{data:[],error:null};const{data:a,error:_}=await o.from("wishes").select(`
          *,
          created_for_user:profiles!wishes_created_for_user_id_fkey(*),
          created_by_user:profiles!wishes_created_by_user_id_fkey(*)
        `).in("created_for_user_id",i).in("visibility",["friends","public"]).eq("is_received",!1).order("created_at",{ascending:!1});if(_)throw _;return{data:a.filter(f=>f.created_for_user_id!==r),error:null}}catch(s){return console.error("Error fetching friends wishes:",s),{data:null,error:s}}finally{t.value=!1}}},l=async(r,s)=>{t.value=!0;try{const{data:e,error:i}=await o.from("wishes").update(s).eq("id",r).select(`
          *,
          created_for_user:profiles!wishes_created_for_user_id_fkey(*),
          created_by_user:profiles!wishes_created_by_user_id_fkey(*)
        `).single();if(i)throw i;const a=c.value.findIndex(_=>_.id===r);return a!==-1&&(c.value[a]=e),{data:e,error:null}}catch(e){return console.error("Error updating wish:",e),{data:null,error:e}}finally{t.value=!1}};return{wishes:c,isLoading:d,createWish:u,fetchWishes:h,fetchAllWishesForUser:y,fetchFriendsWishes:w,fetchReceivedWishes:async r=>{if(!r)return;const s=t.value;s||(t.value=!0);try{const{data:e,error:i}=await o.from("wishes").select(`
          *,
          created_for_user:profiles!wishes_created_for_user_id_fkey(*),
          created_by_user:profiles!wishes_created_by_user_id_fkey(*)
        `).eq("created_for_user_id",r).eq("created_by_user_id",r).eq("is_received",!0).order("updated_at",{ascending:!1});if(i)throw i;return{data:e,error:null}}catch(e){return console.error("Error fetching received wishes:",e),{data:null,error:e}}finally{s||(t.value=!1)}},refreshWishes:async(r,s=!1)=>{if(r)try{let e=o.from("wishes").select(`
          *,
          created_for_user:profiles!wishes_created_for_user_id_fkey(*),
          created_by_user:profiles!wishes_created_by_user_id_fkey(*)
        `).eq("created_for_user_id",r).eq("created_by_user_id",r).order("created_at",{ascending:!1});s||(e=e.eq("is_received",!1));const{data:i,error:a}=await e;if(a)throw a;return{data:i,error:null}}catch(e){return console.error("Error refreshing wishes:",e),{data:null,error:e}}},refreshAllWishesForUser:async(r,s=!1)=>{if(r)try{let e=o.from("wishes").select(`
          *,
          created_for_user:profiles!wishes_created_for_user_id_fkey(*),
          created_by_user:profiles!wishes_created_by_user_id_fkey(*)
        `).eq("created_for_user_id",r).order("created_at",{ascending:!1});s||(e=e.eq("is_received",!1));const{data:i,error:a}=await e;if(a)throw a;return{data:i,error:null}}catch(e){return console.error("Error refreshing all wishes for user:",e),{data:null,error:e}}},refreshReceivedWishes:async r=>{if(r)try{const{data:s,error:e}=await o.from("wishes").select(`
          *,
          created_for_user:profiles!wishes_created_for_user_id_fkey(*),
          created_by_user:profiles!wishes_created_by_user_id_fkey(*)
        `).eq("created_for_user_id",r).eq("created_by_user_id",r).eq("is_received",!0).order("updated_at",{ascending:!1});if(e)throw e;return{data:s,error:null}}catch(s){return console.error("Error refreshing received wishes:",s),{data:null,error:s}}},updateWish:l,deleteWish:async r=>{t.value=!0;try{const{error:s}=await o.from("wishes").delete().eq("id",r);if(s)throw s;return c.value=c.value.filter(e=>e.id!==r),{error:null}}catch(s){return console.error("Error deleting wish:",s),{error:s}}finally{t.value=!1}},toggleBought:async(r,s)=>{const{data:e,error:i}=await o.from("wishes").select("*").eq("id",r).single();return i||!e?{error:"Wish not found"}:e.created_for_user_id===s?{error:"Cannot mark your own wish as bought"}:l(r,{is_bought:!e.is_bought})},toggleReceived:async(r,s)=>{const{data:e,error:i}=await o.from("wishes").select("*").eq("id",r).single();return i||!e?{error:"Wish not found"}:e.created_for_user_id!==s?{error:"Cannot mark someone else's wish as received"}:l(r,{is_received:!e.is_received})}}};export{F as u};
