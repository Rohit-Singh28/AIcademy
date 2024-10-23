"use client"
import { db } from '@/configs/db';
import { CourseChapter, CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { Clock } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube';
import { Menu } from 'lucide-react';
import { X } from 'lucide-react';

const page = ({ params }) => {

  const [courseData, setCourseData] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedChapterContent, setSelectedChapterContent] = useState([]);
  const [chapterContent, setChapterContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState(false);

  function sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  const fetchEachCourseData = async () => {
    setLoading(true);
    try {
      const data = await db.select().from(CourseList).where(eq(CourseList?.courseId, params.courseId));
      const res = await db.select().from(CourseChapter).where(eq(CourseChapter?.courseId, params.courseId));
      const sort = sortByKey(res, "chapterNo")

      setCourseData(data[0]); //course data
      setSelectedChapter(data[0].courseOutput[0]); //selected unit
      setSelectedChapterContent(sort[0]) // 1st chapter content of this course it is an array of object
      setChapterContent(sort);  // total course content of this course . It is an array of object . Each object is a chapter content
    }
    catch (err) {
      console.log(err);
    }
    setLoading(false)
  }

  const handleClick = (data, index) => {
    setSelectedChapter(data);
    setSelectedChapterContent(chapterContent[index]);
    setMenu(false);

    // Scroll the main content to the top
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.scrollTo(0, 0); // Scroll to top
    }
  };

  useEffect(() => {
    fetchEachCourseData();

  }, [])
 
  const SideBarMenuOption = () => {
    return (
      <div>
        <div className="flex text-white font-semibold p-3 bg-primary">
          <h1 className="text-lg">{courseData?.name}</h1>
          <span className=' md:hidden' onClick={() => {setMenu(false)}}><X /></span>
        </div>
        <div className="flex flex-col">
          {courseData?.courseOutput?.map((data, index) => (
            <div key={index}
              onClick={() => handleClick(data, index)}
              className="flex flex-col justify-center h-20 px-2 py-1 gap-2 font-semibold border cursor-pointer hover:bg-[#e0d3ff]"
              style={selectedChapter == data ? { backgroundColor: "#e0d3ff" } : {}}
            >
              <h1 className='line-clamp-2'>{data?.chapter_name}</h1>
              <div className='flex items-center gap-1 text-primary text-xs'>
                <Clock size={13} />
                <h1>{data?.duration}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }




  return (
    <div className='h-screen flex '>
      {/* sideMenu */}
      {
        loading ? <div className="flex-col hidden md:flex bg-gray-200 md:w-[18%] h-full border"></div>
          :
          menu ?
            <div className='h-screen w-[80vw] fixed top-0 right-0 bg-slate-100 border '>
              <SideBarMenuOption/>
            </div>
            :
            <div className="flex-col hidden md:flex md:w-[18%] h-full border">
              <SideBarMenuOption/>
            </div>
      }

      {/* Main  Content */}
      {
        loading ? <div className="flex-1 p-3 gap-4 flex-col h-screen overflow-y-scroll" id='main-content'>
          <h1 className="text-2xl font-semibold mb-8 h-8 w-[40%] bg-gray-200"></h1>
          <div className="flex gap-2 flex-col">
            <div className="w-full h-[400px] bg-gray-200 animate-pulse duration-1000 md:w-[70%] mx-auto">
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-semibold">Description</h1>
              <p className='md:h-8 h-16 w-full md:w-[90%] bg-gray-200'></p>
            </div>
          </div>

          <div className='flex flex-col gap-10 my-10 w-full h-[600px] bg-gray-200'>
          </div>
        </div>
          :
          <div className="flex-1 p-3 gap-4 flex-col h-screen overflow-y-scroll" id='main-content'>
            <div className="text-2xl font-semibold mb-8 flex gap-3  items-center">
              <p>{selectedChapter?.chapter_name}</p>
              <span className=' ml-auto cursor-pointer md:hidden ' onClick={() => { setMenu(true) }}><Menu /></span>
            </div>
            <div className="flex gap-2 flex-col">
              <div className="w-full md:w-[70%] mx-auto">
                {/* Force re-render by using the videoId as the key */}
                <YouTube opts={{
                  width: `100%`,
                }} key={selectedChapterContent?.videoId} videoId={selectedChapterContent?.videoId} />
              </div>
              <div className="flex-1">
                <h1 className="text-lg font-semibold">Description</h1>
                <p>{selectedChapter?.about}</p>
              </div>
            </div>

            <div className='flex flex-col gap-10 my-10'>
              {
                // showing all data to selectedChapterContent
                selectedChapterContent?.chapterContent?.map((data, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="w-full">
                      <h1 className="text-lg font-semibold">{data.title}</h1>
                      <p>{data.explanation}</p>
                    </div>
                    {
                      data?.code_example &&
                      <div className='text-white bg-black p-3 overflow-x-scroll'>
                        <pre>
                          <code>{data?.code_example}</code>
                        </pre>
                      </div>
                    }
                  </div>
                ))
              }
            </div>
          </div>
      }
    </div>
  )
}

export default page;
