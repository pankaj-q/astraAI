import redis from "../../Shared/Redis/redis.js"

const protect = async (req, res, next) => {
  const sessionId = req.cookies?.session;
  if (!sessionId) {
    return res.status(400).json({
      message: "unauthorized access",
    });
  }
  const session = await redis.get(`session-${sessionId}`);
  if (!session) {
    return res.status(400).json({
      message: "sessionId expired",
    });
  }
  req.user = JSON.parse(session);
  next();
};

export default protect;
