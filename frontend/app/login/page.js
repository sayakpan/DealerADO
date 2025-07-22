import Image from "next/image";

export default function LoginPage() {
    return (
        <div className="w-[1440px] h-[1110px] relative bg-red-700 overflow-hidden">
            {/* Decorative ellipses */}
            <div className="w-60 h-60 left-[-105.46px] top-[-50px] absolute opacity-20 rounded-full border-[35px] border-white" />
            <div className="w-96 h-96 left-[-167.46px] top-[-114px] absolute opacity-20 rounded-full border-[35px] border-white" />
            
            {/* Decorative stripes */}
            <div className="w-[1551.53px] h-9 left-[-46px] top-[481.50px] absolute origin-top-left rotate-[-5.42deg] bg-white" />
            <div className="w-[1536.10px] h-3.5 left-[-46px] top-[537.36px] absolute origin-top-left rotate-[-5.42deg] bg-white" />
            <div className="w-[1536.10px] h-3.5 left-[-46px] top-[559.83px] absolute origin-top-left rotate-[-5.42deg] bg-slate-700" />
            
            {/* Car shadow */}
            <div className="w-6 h-4 left-[712.37px] top-[590.68px] absolute bg-black" />
            
            {/* Car image */}
            <Image 
                className="w-[579px] h-[579px] left-[376.62px] top-[159px] absolute" 
                src="/images/signin/white-car.png" 
                alt="White sedan car"
                width={579}
                height={579}
            />
            
            {/* Main logo */}
            <Image 
                className="w-36 h-16 left-[135px] top-[15px] absolute rounded-[50px]" 
                src="/images/core/logo.jpg" 
                alt="Dealer ADO Logo"
                width={137}
                height={70}
            />
            
            {/* Navigation */}
            <div className="left-[658px] top-[25px] absolute inline-flex justify-start items-center gap-9">
                <div className="text-right justify-start text-white text-lg font-medium font-['Plus_Jakarta_Sans']">
                    Home           About Us           Contact Us
                </div>
                <div className="flex justify-start items-start gap-3">
                    <div className="w-36 h-12 p-2.5 bg-slate-700 rounded-[10px] flex justify-center items-center gap-2.5">
                        <div className="justify-end text-white text-lg font-semibold font-['Plus_Jakarta_Sans'] capitalize">Sign in</div>
                    </div>
                    <div className="w-36 h-12 p-2.5 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-red-700 flex justify-center items-center gap-2.5">
                        <div className="justify-end text-slate-700 text-lg font-semibold font-['Plus_Jakarta_Sans'] capitalize">Sign up</div>
                    </div>
                </div>
            </div>
            
            {/* Welcome text */}
            <div className="w-[470px] left-[135px] top-[134px] absolute inline-flex flex-col justify-start items-start gap-1.5">
                <div className="self-stretch justify-start">
                    <span className="text-white text-7xl font-bold font-['Plus_Jakarta_Sans']">Welcome <br/></span>
                    <span className="text-white text-7xl font-normal font-['Plus_Jakarta_Sans']">Back!</span>
                </div>
                <div className="self-stretch justify-start text-white text-base font-normal font-['Plus_Jakarta_Sans']">
                    Sign in to access your Vehicle Services history and get real-time updates on all your Services
                </div>
            </div>
            
            {/* Login form */}
            <div className="w-[470px] p-10 left-[835px] top-[134px] absolute bg-gray-900 rounded-[30px] shadow-[0px_12px_40px_0px_rgba(0,0,0,0.30)] inline-flex flex-col justify-start items-center gap-10">
                <div className="self-stretch flex flex-col justify-center items-end gap-6">
                    <div className="self-stretch flex flex-col justify-start items-end gap-4">
                        <div className="self-stretch p-3 border-b border-stone-300 flex flex-col justify-start items-start gap-1.5">
                            <div className="justify-start text-zinc-500 text-xs font-normal font-['Plus_Jakarta_Sans']">Email or Phone Number</div>
                            <div className="justify-start text-white text-base font-medium font-['Plus_Jakarta_Sans']">johndoe@gmail.com</div>
                        </div>
                        <div className="self-stretch p-3 border-b border-stone-300 inline-flex justify-between items-end">
                            <div className="w-20 inline-flex flex-col justify-start items-start gap-1.5">
                                <div className="self-stretch justify-start text-zinc-500 text-xs font-normal font-['Plus_Jakarta_Sans']">Password</div>
                                <div className="self-stretch h-5 inline-flex justify-center items-center gap-1">
                                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                </div>
                            </div>
                            <div className="w-1.5 h-1.5 outline outline-[1.25px] outline-offset-[-0.62px] outline-white" />
                            <div className="w-4 h-3.5 outline outline-[1.25px] outline-offset-[-0.62px] outline-white" />
                            <div className="w-5 h-5 origin-top-left -rotate-180 opacity-0" />
                        </div>
                        <div className="self-stretch text-right justify-start text-white text-sm font-normal font-['Plus_Jakarta_Sans'] leading-none">Forgot password?</div>
                    </div>
                    <div className="self-stretch h-12 p-2.5 bg-red-700 rounded-2xl shadow-[0px_8px_16px_0px_rgba(0,0,0,0.12)] inline-flex justify-center items-center gap-2.5">
                        <div className="justify-end text-white text-base font-semibold font-['Plus_Jakarta_Sans'] capitalize">Sing in</div>
                    </div>
                </div>
                <div className="self-stretch text-center justify-start">
                    <span className="text-white text-sm font-medium font-['Plus_Jakarta_Sans']">Don't have an account ?  </span>
                    <span className="text-red-700 text-sm font-semibold font-['Plus_Jakarta_Sans'] underline">Sign Up</span>
                </div>
            </div>
            
            {/* Footer */}
            <div className="w-[1440px] h-[522px] left-0 top-[588px] absolute bg-gray-900 overflow-hidden">
                <Image 
                    className="w-[1387px] h-[650px] left-[122px] top-[50px] absolute opacity-20" 
                    src="/images/core/footer-smoke.png" 
                    alt="Footer smoke effect"
                    width={1387}
                    height={650}
                />
                <Image 
                    className="w-[1387px] h-[650px] left-[729px] top-[680px] absolute origin-top-left rotate-180 opacity-20" 
                    src="/images/core/footer-smoke.png" 
                    alt="Footer smoke effect"
                    width={1387}
                    height={650}
                />
                <Image 
                    className="w-[1197px] h-[568px] left-[122px] top-[355px] absolute" 
                    src="/images/core/footer-car.png" 
                    alt="Red sports car"
                    width={1197}
                    height={568}
                />
                <Image 
                    className="w-28 h-14 left-[662px] top-[50px] absolute rounded-[50px]" 
                    src="/images/core/logo.jpg" 
                    alt="Dealer ADO Logo"
                    width={117}
                    height={60}
                />
                <div className="left-[572px] top-[200px] absolute text-center justify-start text-white text-lg font-medium font-['Plus_Jakarta_Sans']">Home           About Us           Contact Us</div>
                <div className="left-[656px] top-[253px] absolute inline-flex justify-start items-start gap-3">
                    <div className="w-9 h-9 bg-white rounded-full" />
                    <div className="w-5 h-5 relative overflow-hidden">
                        <div className="w-4 h-4 left-[2px] top-[2px] absolute bg-slate-700" />
                    </div>
                    <div className="w-9 h-9 relative overflow-hidden">
                        <div className="w-8 h-8 left-[1px] top-[1px] absolute bg-white" />
                    </div>
                    <div className="w-9 h-9 relative overflow-hidden" />
                </div>
                <div className="left-[1033px] top-[358px] absolute justify-start">
                    <span className="text-white text-sm font-medium font-['Plus_Jakarta_Sans'] capitalize">© 2024  </span>
                    <span className="text-white text-sm font-medium font-['Plus_Jakarta_Sans']">Dealer ADO, </span>
                    <span className="text-white text-sm font-medium font-['Plus_Jakarta_Sans'] capitalize">All Rights Reserved.</span>
                </div>
                <div className="left-[135px] top-[358px] absolute justify-start text-white text-sm font-medium font-['Plus_Jakarta_Sans'] capitalize">Privacy Policy</div>
                <div className="left-[247px] top-[358px] absolute justify-start text-white text-sm font-medium font-['Plus_Jakarta_Sans'] capitalize">Terms & Condition</div>
                <div className="w-[1170px] h-0 left-[135px] top-[328px] absolute outline outline-1 outline-offset-[-0.50px] outline-white"></div>
                <div className="w-96 left-[520px] top-[130px] absolute opacity-80 text-center justify-start text-white text-xs font-normal font-['Plus_Jakarta_Sans'] leading-tight">Lorem ipsum dolor sit amet consectetur. Dolor a neque ut maecenas at. Quisque tincidunt varius fusce porttitor sed posuere</div>
            </div>
        </div>
    );
}