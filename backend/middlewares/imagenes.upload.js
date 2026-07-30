import multer from "multer";
import sharp from "sharp";
import fs from "fs/promises";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const numeroAleatorio = Math.floor(Math.random() * 1000000);
    return cb(null, numeroAleatorio + "_" + file.originalname.trim().replace(/ /g, "_"));
  },
});

const upload = multer({ storage });

export async function resizeImage(req, res, next) {
  if (!req.file) return next();
  const numeroAleatorio = Math.floor(Math.random() * 1000000);
  const nuevoNombre = numeroAleatorio + ".webp";
  const imagenPath = "uploads/" + nuevoNombre;

  try {
    await sharp(req.file.path).resize(360, 571).webp().toFile(imagenPath);
    // await fs.unlink(req.file.path);

    req.file.filename = nuevoNombre;

    next();
  } catch (error) {
    console.error("Error al redimensionar imagen:", error);
    next();
  }
}

export default upload;
