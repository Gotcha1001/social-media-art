import AddPosts from "@/components/AddPosts"
import Feed from "@/components/feed/Feed"
import LeftMenu from "@/components/leftMenu/LeftMenu"
import RightMenu from "@/components/rightMenu/RightMenu"

import Stories from "@/components/Stories"

const Homepage = () => {
  return (
    <div className='flex gap-4 pt-2 px-2'>
      <div className="hidden xl:block w-[20%] gradient-background2 rounded-lg">
        <LeftMenu type="home" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%] gradient-background2 p-2 rounded-lg">
        <div className="flex flex-col gap-6">
          <Stories />
          <AddPosts />
          <Feed />
        </div>
      </div>
      <div className="hidden lg:block w-[30%] gradient-background2 rounded-lg">
        <RightMenu />
      </div>
    </div>
  )
}

export default Homepage