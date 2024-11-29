import { revalidatePath } from "next/cache";

export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the weather api page")
    revalidatePath(process.env.WEATHER_API);
    const res2 = await fetch(process.env.WEATHER_API);
    const data = await res2.json()
    
    console.log(data.current.temp_c)
    let currentTemp = data.current.temp_c
    // at the end of the process we need to send something back.

    return Response.json({"temp": currentTemp})
  }