import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";

export default withIronSessionApiRoute(userget, sessionOptions);

async function userget(req, res) {
    if (req.session.user) {
        res.json({
            username: req.session.user.username,
            // ... other user data
        });
    } else {
        res.status(401).json({ message: "로그인이 필요합니다." });
    }
}