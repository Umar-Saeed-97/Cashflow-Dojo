import type { Metadata } from "next"
import localFont from 'next/font/local'
import { FaGoogle, FaGithub } from "react-icons/fa"
import { signInGoogle, signInGithub } from "@/lib/actions"

const local = localFont({
    src: '../fonts/handbuck/HandbuckRegular-R99xE.otf',
    display: 'swap',
})

const metadata: Metadata = {
    title: 'Welcome | Cashflow Dojo'
}

function LoginPage() {
    return (
        <div className="flex h-full items-center max-[550px]:justify-center">
            <div className="flex mx-24 gap-20 max-[1340px]:flex-col max-[1340px]:gap-10 max-[1340px]:mx-16 max-[mx-0]:">
                <div className="my-auto">
                    <h1 className={`${local.className} text-accent text-8xl font-bold max-[1340px]:text-center max-[700px]:text-7xl`}>Cashflow Dojo</h1>

                    <p className="text-3xl max-[700px]:text-2xl tracking-tight text-secondary font-normal mt-5 max-[1340px]:text-center max-[1340px]:mt-3 max-[550px]:hidden">Analyze your spending with comprehensive categorization and tracking for better financial control.</p>
                </div>

                <div className="max-w-md font-semibold bg-secondary text-primary border-secondary border-2 max-[550px]:bg-primary py-16 max-[1340px]:py-12 max-[700px]:py-8 px-8 max-[700px]:px-5 max-[550px]:px-4 rounded-xl flex flex-col items-center max-[550px]:border-primary max-[1340px]:self-center">
                    <h1 className="text-3xl max-[700px]:text-2xl text-center max-[550px]:hidden text-neutral">Enter your financial dojo & begin tracking</h1>    

                    <form action={signInGoogle}>
                        <button type="submit" className="flex items-center gap-2 mt-10 max-[550px]:mt-1 max-[700px]:mt-6 bg-accent text-primary rounded-lg py-2 px-20 max-[700px]:px-16 max-[440px]:px-11 border border-accent hover:bg-accent-shade outline-none focus-visible:outline-secondary transition-all ease-in-out duration-200 transform active:scale-90">
                            <span className="text-lg max-[700px]:text-base">Continue with</span>

                            <FaGoogle className="text-center text-lg max-[700px]:text-base"/>
                        </button>
                    </form>

                    <p className="mt-2 text-neutral max-[700px]:text-sm max-[550px]:text-primary">or</p>

                    <form action={signInGithub}>
                        <button type="submit" className="flex items-center gap-2 mt-2 bg-accent text-primary rounded-lg py-2 px-20 max-[700px]:px-16 max-[440px]:px-11 border border-accent hover:bg-accent-shade hover:border-accent-shade outline-none focus-visible:outline-secondary transition-all ease-in-out duration-200 transform active:scale-90">
                            <span className="text-lg max-[700px]:text-base">Continue with</span>
                            
                            <FaGithub className="text-center text-lg max-[700px]:text-base"/>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;

export { metadata }