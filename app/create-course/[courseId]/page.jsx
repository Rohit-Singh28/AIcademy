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
import { jsonrepair } from 'jsonrepair';

const Page = ({ params }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true); // Set initial loading to true
  const { courseInfo, setCourseInfo } = useContext(CourseDataContext);
  const router = useRouter();
  const BASE_URL_YOUTUBE = "https://www.googleapis.com/youtube/v3/search?";

  // Fetch course data from the database
  const fetchCourseData = async () => {
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
    } catch (error) {
      console.error("Error fetching course data:", error);
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
    setLoading(true); // Start loading indicator before generation begins
    try {
      const courseOutput = courseInfo?.courseOutput;
  
      await Promise.all(
        courseOutput.map(async (chapter, indx) => {
          let retryCount = 0;
          const generatePrompt = () => `
            Explain the topic "${chapter.chapter_name}" from Chapter "${chapter.about}" with a detailed explanation and code snippets (where applicable) in JSON format.
            The JSON should include these fields:
              - "title": A descriptive title
              - "explanation": A clear, brief explanation of the topic
              - "code_example": Include code relevant to ${courseInfo?.name} if available, wrapped in "<precode>" tags
            Follow the example:
            [
              {
                "title": "Intro to JavaScript",
                "explanation": "JavaScript is a versatile programming language for web development.",
                "code_example": "<precode>console.log('Hello, World!');</precode>"
              }
            ]
            Provide only valid JSON output.`;
  
          const fetchDataWithRetry = async () => {
            try {
              const result = await GenerateCourseContentAI.sendMessage(generatePrompt());
              const rawAIResponse = await result.response?.text();
  
              if (rawAIResponse.includes("RECITATION")) {
                console.warn("RECITATION block detected. Retrying with adjusted prompt...");
                if (++retryCount < 3) {
                  await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay before retry
                  return fetchDataWithRetry();
                } else {
                  throw new Error("Repeated RECITATION block; stopping retries.");
                }
              }
  
              let content;
              try {
                content = jsonrepair(rawAIResponse);
                content = JSON.parse(content);
              } catch (repairError) {
                console.error("JSON Repair failed, attempting manual fix.", repairError);
                content = tryFixInvalidJSON(rawAIResponse);
              }
  
              if (!content) throw new Error("Unable to parse AI response to JSON. Please try again.");
              return content;
  
            } catch (error) {
              console.error(`Error processing chapter ${indx}:`, error);
              throw error; // Propagate error for each chapter
            }
          };
  
          const content = await fetchDataWithRetry();
  
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
        })
      );
  
      // Move `router.replace` here after all content is generated
      router.replace(`/create-course/${params?.courseId}/finish`);
    } catch (error) {
      console.error("Error during course generation:", error);
    } finally {
      setLoading(false); // Stop loading only after completion of entire process
    }
  };
  

  useEffect(() => {
    const loadData = async () => {
      await fetchCourseData(); // Fetch course data
      setLoading(false); // Set loading to false only after fetchCourseData completes
    };
    loadData();
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

export default Page;
