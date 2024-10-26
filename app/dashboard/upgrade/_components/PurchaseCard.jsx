import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Book, Clock, Users } from "lucide-react"

export default function PurchaseCard({title,NoCourse,Feature,People,Price}) {
  return (
    <Card className="w-full max-w-sm bg-white shadow-lg">
      <CardHeader className="bg-violet-600 text-white">
        <div className="flex justify-between items-center mx-auto">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-sm">
            <Clock className="h-5 w-5 text-violet-500" />
            <span>Generate {NoCourse} AI COURSE</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <Book className="h-5 w-5 text-violet-500" />
            <span>{Feature}</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <Users className="h-5 w-5 text-violet-500" />
            <span>Already joined by {People}+ students</span>
          </div>
        </div>
        <div className="mt-6 bg-violet-50 p-4 rounded-lg">
          <div className="text-3xl font-bold text-violet-600"> &#8377; {Price}</div>
          <div className="text-sm text-violet-600">One-time purchase</div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white">
          Enroll Now
        </Button>
      </CardFooter>
    </Card>
  )
}