import { createEffect, createSignal } from 'solid-js'
import { A } from '@solidjs/router'
import whiteLogo from "../assets/white.png"

function Login(){
    
    return <>
        <div class='flex'>
            <div class='flex h-screen w-1/2 flex-col items-center justify-center'>
                <div class='w-1/2'>
                    <A
                    href={'/'}
                    class="text-xl font-normal text-sky-400 hover:text-sky-300"
                    >
                    {'< '}Back to home
                    </A>
                    <div class="mt-2 p-10 shadow-lg shadow slate-200">
                        <h1 class='pb-10 text-center text-4xl font-semibold'>Login</h1>
                        <form class="flex flex-col gap-y-5" onSubmit={''}>
                            <label class="mb-1 text-gray-700 font-medium"> Email</label>
                            <input 
                            type="email"
                            value=""
                            onChange={''}
                            class='px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base'
                            placeholder='Enter your email'
                            />
                            <label class="mb-1 text-gray-700 font-medium"> Password</label>
                            <input 
                            type="password" //isVisible nya ntar ya
                            value=""
                            onChange={''}
                            class='px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base'
                            placeholder='Enter your password'
                            />
                            <button class="mt-5 bg-sky-400 font-medium text-white rounded-md" type='submit'>Login</button>
                            <h3 class='text-center'>
                                Don't have an account?
                                <A
                                href={'/register'}
                                class='font-medium text-sky-400 hover:text-sky-300'
                                > Register</A>

                            </h3>
                        </form>
                    </div>
                </div>
            </div>
            <div class="flex h-screen w-1/2 items-center justify-center rounded-bl-full bg-sky-400">
                <div class="mb-32 ml-32 flex items-center justify-center">
                    <img src={whiteLogo} width={150} height={150} alt="logo" />
                    <h1 class="cursor-default text-6xl text-white">E-Commerce</h1>
                </div>
            </div>
        
        </div>
        
    </>
}

export default Login