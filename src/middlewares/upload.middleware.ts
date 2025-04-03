import { Context, Next } from "koa";
import multer from "@koa/multer";
import Boom from "@hapi/boom";

const uploadMiddleware = async (ctx: Context, next: Next) => {
  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, "/tmp");
    },
    filename: (_req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const upload = multer({ storage });

  try {
    await upload.single("image")(ctx, next);
    
    if (!ctx.file) {
      throw Boom.badRequest("No file uploaded");
      return;
    }

    await next();
  } catch (err) {
    throw err
  }
};

export { uploadMiddleware };
