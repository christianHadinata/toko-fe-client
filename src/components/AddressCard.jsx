export default function AddressCard(props) {
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
            >
                Edit Address
            </button>
            <Modal open={open()} onClose={() => setOpen(false)}>
                <div class="p-6">
                <h2 class="text-xl lg:text-2xl font-bold mb-4 py-2">Success!</h2>
                <p class="mb-4 text-lg lg:text-xl py-2">
                    Item has been added to cart.
                </p>
                <div class="flex justify-center gap-x-12 py-2">
                    <button
                    onClick={() => setOpen(false)}
                    class="px-4 py-2 bg-red-400 text-white rounded-lg text-base lg:text-lg cursor-pointer "
                    >
                    Close
                    </button>
                    <button
                    onClick={handleNavigate}
                    class="px-4 py-2 bg-sky-400 text-white rounded-lg text-base lg:text-lg cursor-pointer"
                    >
                    Go to cart
                    </button>
                </div>
                </div>
            </Modal>

        </div>
    );
}