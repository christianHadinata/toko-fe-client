import { createResource, createSignal, createEffect } from "solid-js";
import districtSignal from "../stores/districtSignal.js";

const [init, setInit] = createSignal(false);
const [districtId, _] = districtSignal;
const [districtsOptions, setDistrictsOptions] = createSignal([]);
const [subDistrictsOptions, setSubDistrictsOptions] = createSignal([]);

export const [fetchDistrictsAndSubdistricts] = createResource(async () =>{


    const response = await fetch(`http://localhost:5000/api/v1/users/districtandsub`,{
    method : 'GET',
    headers: {
    'Content-Type': 'application/json',
    }
    });

    const data = await response.json();
    // console.log("data fetch : "+ data.subdistricts)
    setDistrictsOptions(data.districts || []);
    setSubDistrictsOptions(data.subdistricts || []);
    
    return data;
});

const fetchSpecificSubdistricts = async (district_id) =>{

    const response = await fetch(`http://localhost:5000/api/v1/users/districtandsub/${district_id}`,{
      method : 'get',
      headers: {
      'Content-Type': 'application/json',
      }
    });

    const data = await response.json();

    setSubDistrictsOptions(data.subdistricts);
  }

    // Buat ganti subdistrict pas dah milih district
    createEffect(() => {
        const id = districtId();
        if (init() && id !== 0) {
            fetchSpecificSubdistricts(id);
            
        }
        if (!init()) {
            setInit(true);
        }
    });

export { districtsOptions, setDistrictsOptions, subDistrictsOptions, setSubDistrictsOptions };