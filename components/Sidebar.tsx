'use client'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
const Sidebar = () => {
  const pathname=usePathname();
  return (   
    <section className='sticky h-screen left-0 top-0 flex  w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[270px] '> {/*yaha lg:w-[264px] ya tha  */}
      <div className='flex flex-1 flex-col gap-6 pe-1 overflow-y-auto'> {/*es div me addtional pe-1 and overflow-y-auto add kiya hai */}
        {sidebarLinks.map((link)=>{
          const isActive = pathname ===link.route || pathname.startsWith(`${link.route}/`);
          return(
            <Link
              href={link.route}
              key={link.label}
              target={link.target} // additional add
              className={cn('flex gap-4 items-center p-4 rounded-2xl justify-start',{
              'bg-blue-1':isActive
            })}
            >
              <Image 
              src={link.imgUrl}
              alt={link.label}
              width={24}
              height={24}
              />
              <p className='text-lg font-semibold max-lg:hidden'>
                {link.label}
              </p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default Sidebar







{/* <div className='sticky flex  w-fit flex-col justify-between bg-dark-1 p-4 pt-2 text-white max-sm:hidden lg:w-[264px]'>
          <a href="#" className='flex flex-1 flex-row gap-1'>
        <img src="/icons/logo.png" alt="" width={24}
              height={24} />
        <p className='text-lg font-semibold max-lg:hidden'>pankajkumar</p>
        </a>
        </div> */}