export async function GET(req, res) {

    console.log("In Register api")

    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    const emailconfirm = searchParams.get('emailconfirm');
    const password = searchParams.get('password');
    const passwordConfirm = searchParams.get('passwordconfirm');
    const phonenum = searchParams.get('phonenum');
    console.log(email);
    console.log(emailconfirm);
    console.log(password);
    console.log(passwordConfirm);
    console.log(phonenum);
    return Response.json({ "data":"valid" })
}
