import { Liberty } from '@/icons/core'
const Loading = () => {
       return  <div className="flex h-screen w-screen bg-[url('/images/landing-page/background-loading.jpg')] bg-no-repeat bg-cover bg-center items-center justify-center">
    <div className="flex h-screen w-screen  backdrop-blur-md bg-[#080D27]/90 items-center justify-center">
    <Liberty/>
    </div>
  </div>
}

export default Loading