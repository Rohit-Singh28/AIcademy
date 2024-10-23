import { boolean, json,  numeric,  pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const CourseList = pgTable('courseList',{
    id:serial('id').primaryKey(),
    courseId:varchar('courseId').notNull(),
    name:varchar('name').notNull(),
    category:varchar('category').notNull(),
    description:varchar('description').notNull(),
    level:varchar('level').notNull(),
    courseOutput:json('courseOutput').notNull(),
    createdBy:varchar('createdBy').notNull(),
    userName:varchar('userName'),
    userProfileImage:varchar('userProfileImage'),
    videoIncluded:varchar('videoIncluded').notNull(),
    duration:varchar('duration').notNull(),
    bannerUrl:varchar('bannerUrl').default("https://miro.medium.com/max/10944/1*S81O15rjKfG-BFdnNC6-GQ.jpeg"),
    publish:boolean('publish').default(false)

})

export const CourseChapter = pgTable('CourseChapter',{
    id:serial('id').primaryKey(),
    courseId:varchar('courseId').notNull(),
    chapterNo:varchar('chapterNo').notNull(),
    chapterContent:json('chapterContent').notNull(),
    videoId:varchar('videoId').notNull()
})