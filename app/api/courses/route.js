import { connectToDB } from "@/utils/database";
import Courses from "@/models/courses";
import { NextResponse } from "next/server";

export async function POST ( req ) {
    await connectToDB();
    let { year, term, course } = await req.json();

    if (year === 'Year') year = '2025'
    if (term === 'Term') term = [1,2,3]

    let courseExist = null
    if (Array.isArray(term)) {
        courseExist = []
        for (const t of term) {
            const courseFetch = await Courses.findOne({ year: year, term: t, course: course })
            courseFetch && courseExist.push(courseFetch)
        }
    } else {
        courseExist = await Courses.findOne({ year: year, term: term, course: course })
    }

    if (!courseExist) {
        return NextResponse.json({ year: year, term: term, course: course })
    }
    

    return NextResponse.json({ courseExist });
}