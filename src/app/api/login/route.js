export async function GET(req, res) {

    console.log("In Login api")

    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    const password = searchParams.get('password');
    console.log(email);
    console.log(password);
    return Response.json({ "data":"valid" })
}
