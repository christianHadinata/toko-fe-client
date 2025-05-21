import { A } from '@solidjs/router'
import whiteLogo from "../assets/white.png"
import eyeOpen from "../assets/eyeOpen.png"
import eyeHidden from "../assets/eyeHidden.png"
import { createEffect, createSignal } from 'solid-js'


function Register(){
    const [isVisible, setIsVisible] = createSignal(false);
    const toggleVisibility = ()=> setIsVisible(!isVisible());

    return (
        <>
        <div class='flex'>
            <div class="flex h-screen w-1/2 items-center justify-center rounded-br-full bg-sky-400">
                <div class="mb-32 ml-32 flex items-center justify-center">
                    <img src={whiteLogo} width={150} height={150} alt="logo" />
                    <h1 class="cursor-default text-6xl text-white">E-Commerce</h1>
                </div>
            </div>
            <div class='flex h-screen w-1/2 flex-col items-center justify-center'>
                <div class='w-1/2'>
                    <A
                    href={'/'}
                    class="text-xl font-normal text-sky-400 hover:text-sky-300"
                    >
                    {'< '}Back to home
                    </A>
                    <div class="mt-2 p-10 shadow-lg shadow slate-200">
                        <h1 class='pb-10 text-center text-4xl font-semibold'>Register</h1>
                        <form class="flex flex-col gap-y-5" onSubmit={''}>
                            <label class="mb-1 text-gray-700 font-medium"> Username</label>
                            <input 
                            type="text"
                            value=""
                            onChange={''}
                            class='px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base'
                            placeholder='Enter username'
                            />
                            <label class="mb-1 text-gray-700 font-medium"> Email</label>
                            <input 
                            type="email"
                            value=""
                            onChange={''}
                            class='px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base'
                            placeholder='Enter email'
                            />
                            <label class="mb-1 text-gray-700 font-medium"> Password</label>
                            <div class="relative w-full max-w-md">
                                <input 
                                type={isVisible() ? "text" : "password"}
                                value=""
                                class='px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base w-full'
                                placeholder='Enter password'
                                />
                                
                                <button
                                type="button"
                                aria-label='Toggle password visibility'
                                class='absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-gray-600'
                                onClick={toggleVisibility}
                                >
                                    <img src={isVisible() ? eyeOpen : eyeHidden} width={24} height={24} class='mr-2' />
                                </button>
                            </div>

                            <button class="mt-5 bg-sky-400 font-medium text-white rounded-md py-2 cursor-pointer hover:bg-sky-300" type='submit'>Register</button>
                            <h3 class='text-center'>
                                Already have an account ?
                                <A
                                href={'/login'}
                                class='font-medium text-sky-400 hover:text-sky-300'
                                > Go back </A>

                            </h3>
                        </form>
                    </div>
                </div>
            </div>
            
        
        </div>
        </>
    );
}

export default Register;