import{supabase as c}from"./supabase-CI4kAcGq.js";import{a as A,u as x}from"./auth-store-CNvokGra.js";import{r as g,m as v}from"./index-v3dJaZ__.js";const T=()=>{const l=g([]),o=g(0),p=v(()=>o.value>0),{shouldShowLoading:_,markDataLoaded:f}=A(),b=v(()=>p.value),m=async s=>{o.value++;try{const{data:r,error:e}=await c.from("wishes").insert([{...s,visibility:s.visibility||"friends",is_bought:!1,is_received:!1}]).select(`
          *,
          created_for_user:profiles!wishes_created_for_user_id_fkey(*),
          created_by_user:profiles!wishes_created_by_user_id_fkey(*)
        `).single();if(e)throw e;return l.value.push(r),{data:r,error:null}}catch(r){return console.error("Error creating wish:",r),{data:null,error:r}}finally{o.value--}},q=async(s,r=!1,e="active")=>{console.log("fetchWishes called with userId:",s,"isBackgroundRefresh:",r,"context:",e);const t=x(),i=s||t.user?.id;if(!i)return console.log("No user ID found, returning empty array"),{data:[],error:null};console.log("User ID:",i),console.log("About to build query"),!r&&_("wishes")&&o.value++;try{let a=c.from("wishes").select(`
          *,
          created_for_user:profiles!wishes_created_for_user_id_fkey(*),
          created_by_user:profiles!wishes_created_by_user_id_fkey(*)
        `).eq("created_for_user_id",i).eq("created_by_user_id",i);console.log("Base query built"),e==="active"?(a=a.eq("is_received",!1),console.log("Added active filter")):(a=a.eq("is_received",!0),console.log("Added archived filter")),a=a.order("created_at",{ascending:!1}),console.log("Added ordering"),console.log("About to execute query with timeout");const y=async()=>{try{return await a}catch(h){throw console.error("Query execution error:",h),h}},n=new Promise((h,E)=>setTimeout(()=>E(new Error("Query timeout after 10 seconds")),1e4)),{data:w,error:d}=await Promise.race([y(),n]);if(console.log("Query executed"),console.log("Query data:",w),console.log("Query error:",d),d)throw console.error("Error in fetchWishes:",d),d;return r||f("wishes"),{data:w||[],error:null}}catch(a){return console.error("Error fetching wishes:",a),{data:null,error:a}}finally{!r&&_("wishes")&&o.value--}},W=async(s,r=!1)=>{if(s){!r&&_("wishes")&&o.value++;try{const e=c.from("wishes").select(`
          *,
          created_for_user:profiles!wishes_created_for_user_id_fkey(*),
          created_by_user:profiles!wishes_created_by_user_id_fkey(*)
        `).eq("created_for_user_id",s).order("created_at",{ascending:!1}),{data:t,error:i}=await e;if(i)throw i;return l.value=t,r||f("wishes"),{data:t,error:null}}catch(e){return console.error("Error fetching all wishes for user:",e),{data:null,error:e}}finally{!r&&_("wishes")&&o.value--}}},k=async s=>{if(s){o.value++;try{const{data:r,error:e}=await c.from("friendships").select("friend_id, user_id").or(`user_id.eq.${s},friend_id.eq.${s}`).eq("status","accepted");if(e)throw e;const t=r?.map(n=>n.user_id===s?n.friend_id:n.user_id)||[];if(t.length===0)return l.value=[],{data:[],error:null};const{data:i,error:a}=await c.from("wishes").select(`
          *,
          created_for_user:profiles!wishes_created_for_user_id_fkey(*),
          created_by_user:profiles!wishes_created_by_user_id_fkey(*)
        `).in("created_for_user_id",t).in("visibility",["friends","public"]).eq("is_received",!1).order("created_at",{ascending:!1});if(a)throw a;return{data:i.filter(n=>n.created_for_user_id!==s),error:null}}catch(r){return console.error("Error fetching friends wishes:",r),{data:null,error:r}}finally{o.value--}}},u=async(s,r)=>{o.value++;try{const{data:e,error:t}=await c.from("wishes").update(r).eq("id",s).select(`
          *,
          created_for_user:profiles!wishes_created_for_user_id_fkey(*),
          created_by_user:profiles!wishes_created_by_user_id_fkey(*)
        `).single();if(t)throw t;const i=l.value.findIndex(a=>a.id===s);return i!==-1&&(l.value[i]=e),{data:e,error:null}}catch(e){return console.error("Error updating wish:",e),{data:null,error:e}}finally{o.value--}};return{wishes:l,isLoading:b,createWish:m,fetchWishes:q,fetchAllWishesForUser:W,fetchFriendsWishes:k,fetchReceivedWishes:async(s,r=!1)=>{if(s){!r&&_("wishes")&&o.value++;try{const{data:e,error:t}=await c.from("wishes").select(`
          *,
          created_for_user:profiles!wishes_created_for_user_id_fkey(*),
          created_by_user:profiles!wishes_created_by_user_id_fkey(*)
        `).eq("created_for_user_id",s).eq("created_by_user_id",s).eq("is_received",!0).order("updated_at",{ascending:!1});if(t)throw t;return r||f("wishes"),{data:e,error:null}}catch(e){return console.error("Error fetching received wishes:",e),{data:null,error:e}}finally{!r&&_("wishes")&&o.value--}}},refreshWishes:async(s,r=!1)=>{if(s)try{let e=c.from("wishes").select(`
          *,
          created_for_user:profiles!wishes_created_for_user_id_fkey(*),
          created_by_user:profiles!wishes_created_by_user_id_fkey(*)
        `).eq("created_for_user_id",s).eq("created_by_user_id",s).order("created_at",{ascending:!1});r||(e=e.eq("is_received",!1));const{data:t,error:i}=await e;if(i)throw i;return{data:t,error:null}}catch(e){return console.error("Error refreshing wishes:",e),{data:null,error:e}}},refreshAllWishesForUser:async(s,r=!1)=>{if(s)try{let e=c.from("wishes").select(`
          *,
          created_for_user:profiles!wishes_created_for_user_id_fkey(*),
          created_by_user:profiles!wishes_created_by_user_id_fkey(*)
        `).eq("created_for_user_id",s).order("created_at",{ascending:!1});r||(e=e.eq("is_received",!1));const{data:t,error:i}=await e;if(i)throw i;return{data:t,error:null}}catch(e){return console.error("Error refreshing all wishes for user:",e),{data:null,error:e}}},refreshReceivedWishes:async s=>{if(s)try{const{data:r,error:e}=await c.from("wishes").select(`
          *,
          created_for_user:profiles!wishes_created_for_user_id_fkey(*),
          created_by_user:profiles!wishes_created_by_user_id_fkey(*)
        `).eq("created_for_user_id",s).eq("created_by_user_id",s).eq("is_received",!0).order("updated_at",{ascending:!1});if(e)throw e;return{data:r,error:null}}catch(r){return console.error("Error refreshing received wishes:",r),{data:null,error:r}}},updateWish:u,deleteWish:async s=>{o.value++;try{const{error:r}=await c.from("wishes").delete().eq("id",s);if(r)throw r;return l.value=l.value.filter(e=>e.id!==s),{error:null}}catch(r){return console.error("Error deleting wish:",r),{error:r}}finally{o.value--}},toggleBought:async(s,r)=>{const{data:e,error:t}=await c.from("wishes").select("*").eq("id",s).single();return t||!e?{error:"Wish not found"}:e.created_for_user_id===r?{error:"Cannot mark your own wish as bought"}:u(s,{is_bought:!e.is_bought})},toggleReceived:async(s,r)=>{const{data:e,error:t}=await c.from("wishes").select("*").eq("id",s).single();return t||!e?{error:"Wish not found"}:e.created_for_user_id!==r?{error:"Cannot mark someone else's wish as received"}:u(s,{is_received:!e.is_received})}}};export{T as u};
