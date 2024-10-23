"use client";
import React, { useEffect, useState, useContext } from "react";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CourseDataContext } from "@/app/_context/CourseData";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { CourseChapter, CourseList } from "@/configs/schema";
import CourseInfo from "./_components/CourseInfo";
import CourseDetails from "./_components/CourseDetails";
import ChapterList from "./_components/ChapterList";
import Loading from "../_components/Loading";
import { GenerateCourseContentAI } from "@/configs/AiModel";

const page = ({ params }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false); 
  const { courseInfo, setCourseInfo } = useContext(CourseDataContext);
  const router = useRouter();
  const BASE_URL_YOUTUBE = "https://www.googleapis.com/youtube/v3/search?";

  // Fetch course data from the database
  const fetchCourseData = async () => {
    setLoading(true); 
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList.courseId, params?.courseId),
            eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        );
      setCourseInfo(result[0]);
      setLoading(false); 
    } catch (error) {
      console.error("Error fetching course data:", error);
      setLoading(false); 
    }
  };

  // Fallback JSON fixer function
  function tryFixInvalidJSON(jsonString) {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error("Initial JSON parsing failed. Trying to fix common issues.");

      let fixedJsonString = jsonString
        .replace(/\\n/g, " ") // Replace newlines with spaces
        .replace(/\\"/g, '"') // Replace escaped quotes
        .replace(/\\(?!["\\\/bfnrt])/g, "") // Remove bad backslashes
        .replace(/"([^"]*)$/g, '"$1"') // Fix unterminated strings
        .replace(/([{[])\s*([}\]])/g, "$1") // Fix empty objects/arrays
        .replace(/,\s*([}\]])/g, "$1"); // Remove commas before closing braces/brackets

      const openBraces = (fixedJsonString.match(/{/g) || []).length;
      const closeBraces = (fixedJsonString.match(/}/g) || []).length;
      const openBrackets = (fixedJsonString.match(/\[/g) || []).length;
      const closeBrackets = (fixedJsonString.match(/\]/g) || []).length;

      if (openBraces > closeBraces) {
        fixedJsonString += "}".repeat(openBraces - closeBraces);
      }
      if (openBrackets > closeBrackets) {
        fixedJsonString += "]".repeat(openBrackets - closeBrackets);
      }

      try {
        return JSON.parse(fixedJsonString);
      } catch (finalError) {
        console.error("Failed to fix JSON:", finalError.message);
        return null;
      }
    }
  }

  // Handle course generation
  const handleGenerateCourse = async () => {
    setLoading(true); 
    try {
      const courseOutput = courseInfo?.courseOutput;

      await Promise.all(
        courseOutput.map(async (chapter, indx) => {
          const PROMPT = `Provide a detailed explanation (min 600 words) on the topic "${chapter.chapter_name}" from Chapter: "${chapter.about}" in **valid JSON** format. The JSON should be structured as a list of objects with the following fields:
                          1. "title": A short, descriptive title
                          2. "explanation": A unique and concise explanation
                          3. "code_example": Provide a relevant code example in ${courseInfo?.name}, wrapped in "<precode>" tags. If code is not available, omit this field.`;

          const result = await GenerateCourseContentAI.sendMessage(PROMPT);
          const rawAIResponse = await result.response?.text();

          const content = tryFixInvalidJSON(rawAIResponse);

          if (content) {
            const res = await axios.get(BASE_URL_YOUTUBE, {
              params: {
                part: "snippet",
                q: `${chapter.chapter_name}`,
                maxResults: 1,
                key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
                type: "video",
              },
            });

            const vId = res.data.items[0].id.videoId;

            const CourseChapterData = {
              courseId: courseInfo?.courseId,
              chapterNo: indx,
              chapterContent: content,
              videoId: vId,
            };

            await db.insert(CourseChapter).values(CourseChapterData);
            router.replace(`/create-course/${params?.courseId}/finish`);
          } else {
            console.error("Failed to fix or parse AI response JSON.");
          }
        })
      );

      setLoading(false);
    } catch (error) {
      console.error("Error during course generation:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, [params, user]);

  return (
    <div className="py-8 px-4 md:px-28 w-full">
      <Loading loading={loading} /> 
      <h1 className="pb-6 mb-4 text-4xl font-semibold text-center">Course Layout</h1>
      <CourseInfo />
      <CourseDetails />
      <ChapterList />
      <Button onClick={handleGenerateCourse} disabled={loading}> 
        {loading ? "Generating..." : "Generate Course"}
      </Button>
    </div>
  );
};

export default page;
