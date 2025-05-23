import Modal from "./Modal";
import { createSignal } from "solid-js";
import { Dropdown } from "./Dropdown";



export default function AddressCard(props) {
    const [activeEditAdress, setActiveEditAdress] = createSignal(false);


    const districtsOptions = [
        {label : "Cidadap", value : "Cidadap"},
        {label : "Andir", value : "Andir"},
        {label : "Antapani", value : "Antapani"},
        
    ]
    const subdistrictsOptions = [
        {label : "Hegarmanah", value : "Hegarmanah"},
        {label : "Caringin", value : "Caringin"},
        {label : "Cijerah", value : "Cijerah"},
    ]

    return (
        <div class="flex p-4 justify-between items-center border-2 border-black my-4 rounded-xl">
            <div class="flex flex-col">
                <h2 class="font-bold">{props.address_label}</h2>
                <p>{props.address}</p>
                <div class="flex font-semibold">
                    <p>{props.districts}, </p>
                    <p>{props.subdistricts}</p>
                </div>
            </div>
            <button
            class="rounded-2xl border-1 px-2 py-1 hover:cursor-pointer hover:bg-slate-100"
            onClick={()=>{
                setActiveEditAdress(true);
            }}
            >
                Edit Address
            </button>
            <Modal open={activeEditAdress()} onClose={() => setActiveEditAdress(false)}>
                <div class="p-6">
                    <div class="flex justify-between">
                        <h1 class="font-bold text-xl">Edit Address </h1>
                        <button class="font-semibold text-3xl hover:font-bold hover:cursor-pointer"
                        onClick={()=>{
                            setActiveEditAdress(false);
                        }}
                        >X</button>
                    </div>
                    <div class="flex gap-4">
                        <div>
                        <p class="py-2">Address label </p>
                        <p class="py-2">Adress </p>
                        <p class="py-4">District</p>
                        <p class="py-4">Subdistrict</p>
                        </div>
        
                      
                        <div>
                            <p class="py-2"> {" : "} <input type="text" class="rounded-2xl border-black border-1 px-2" value={props.address_label} /> </p>
                            <p class="py-2"> {" : "} <input type="text" class="rounded-2xl border-black border-1 px-2" value={props.address} /> </p>
                            <p class="py-2"> {" : "} 
                                {/* <input type="text" class="rounded-xl border-black border-1 px-2" value={props.districts} />  */}
                                <Dropdown
                                    options={districtsOptions}
                                    // onSelect={handleDistrictSelect}
                                    defaultValue={districtsOptions[0].label}
                                    />
                            </p>
                            <p class="py-2"> {" : "} 
                                {/* <input type="text" class="rounded-xl border-black border-1 px-2" value={props.subdistricts} />  */}
                                <Dropdown
                                    options={subdistrictsOptions}
                                    // onSelect={handleSubdistrictSelect}
                                    defaultValue={subdistrictsOptions[0].label}
                                />
                                </p>
                            
                            
    
                        </div>

                
                    </div>
                    <div class="flex justify-between">
                        <p></p>
                        <button
                        class="rounded-2xl border-1 px-3 py-1 hover:cursor-pointer hover:bg-slate-100"
                        onClick={()=>{
                            setActiveEditAdress(false);
                        }}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </Modal>

        </div>
    );
}