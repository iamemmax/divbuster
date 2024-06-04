// 'use client'

// import { cn } from '@/utils/classNames'
// import React, { useEffect, useState } from 'react'

// const Page = () => {

//     const [repodata, setRepoData] = useState([] as any[])
//     const [data, setData] = useState([] as any[])
//     useEffect(() => {
//         async function fetchJobs() {
//             // const response = await fetch("https://scontent.cdninstagram.com/v/t51.2885-15/439392585_120210846028270007_7179433435661757679_n.jpg?stp=dst-jpg_e15&_nc_ht=scontent.cdninstagram.com&_nc_cat=1&_nc_ohc=k9aXUyfh1Z4Q7kNvgHba862&edm=APs17CUBAAAA&ccb=7-5&oh=00_AYBUpiF3sHFTZhw9ZvaVe52MHz2rSlfRdSnIq5TzEIk35Q&oe=66637B0E&_nc_sid=10d13b");
//             const response = await fetch("https://backend-dev.getlinked.ai/talent/non_talent_job_list/");
//             const jobs = await response.json();
//             setData(jobs.results)
//         }
//         async function fetchRepoData() {
//             const response = await fetch("https://api.github.com/users/omotoyosi25/repos");
//             const repos = await response.json();
//             setRepoData(repos)
//         }

//         fetchJobs()
//         fetchRepoData()
//     }, [])




//     return (
//         <div>
//             <section>
//                 {
//                     repodata.map((repo, index) => {
                        
//                         return(
//                             <div key={index}>
//                                 <div>
//                                     <h1>
//                                         {repo.name}
//                                     </h1>
//                                     <span>
//                                     {
//                                     repo.private === true ?
//                                     "PRIVATE"
//                                     :
//                                     "PUBLIC"
//                                     }
//                                     </span>
//                                 </div>
//                                 <div>{repo.description}</div>
//                                 <div>
//                                     <span className='rounded-full bg-yellow-400 '></span>
//                                     <div>{repo.language}</div>
//                                 </div>
//                             </div>
//                         )
//                     })
//                 }
//             </section>

//             <section className='grid grid-cols-2 px-[80px] gap-4'>
//                 {
//                     data.map((job, index) => (
//                         <div key={index} className=' bg-white text-black  py-4 border-[0.1px] border-slate-200 hover:border-black rounded-xl'>

//                             <div>

//                                 <div className='text-lg'>
//                                     {job?.job_title}
//                                 </div>
//                                 <div className='text-sm text-slate-500'>
//                                     {job?.location}
//                                 </div>
//                                 <div className='gap-3'>
//                                     {job?.salary_range} {job?.job_type}
//                                 </div>
//                                 <div className='flex gap-3'>
//                                     <button className={cn('rounded-lg !text-xxs p-2 font-semibold capitalize',
//                                         job?.job_status === "OPEN" ?
//                                             "bg-green-200 text-green-600"
//                                             :
//                                             "bg-red-100 text-red-400 "

//                                     )}>
//                                         {job?.job_status}
//                                     </button>
//                                     <button className='rounded-lg bg-red-100 text-red-400 text-xxs p-2 font-semibold capitalize'>
//                                         {job?.working_option}
//                                     </button>
//                                     <button>
//                                         {job?.job_type}
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))

//                 }
//             </section>
//         </div>
//     )
// }

// export default Page