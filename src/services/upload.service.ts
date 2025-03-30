import fs from "fs";
import path from "path";
import { LOCAL_FILE_STORE_PATH } from "~/constants/variables";

class FileUploadService {
  private static instance: FileUploadService;
  private uploadLocation: string;

  private constructor(uploadLocation: string) {
    if (uploadLocation) {
      this.uploadLocation = uploadLocation;
      if (!fs.existsSync(this.uploadLocation)) {
        fs.mkdirSync(this.uploadLocation, { recursive: true });
      }
    } else {
      throw new Error("Invalid configuration for FileUploadService");
    }
  }

  public static getInstance(uploadLocation: string): FileUploadService {
    if (!FileUploadService.instance) {
      FileUploadService.instance = new FileUploadService(uploadLocation);
    }
    return FileUploadService.instance;
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileName = `${Date.now()}-${file.originalname}`;

    if (this.uploadLocation) {
      const localFilePath = path.join(this.uploadLocation, fileName);
      fs.renameSync(file.path, localFilePath);
      return localFilePath;
    } else {
      throw new Error("Invalid environment configuration for file upload");
    }
  }

  async deleteFile(filePath: string): Promise<void> {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  static async uploadFile(file: Express.Multer.File): Promise<string> {
    return await FileUploadService.getInstance(LOCAL_FILE_STORE_PATH).uploadFile(file);
  }

  static async deleteFile(filePath: string): Promise<void> {
    await FileUploadService.getInstance(LOCAL_FILE_STORE_PATH).deleteFile(filePath);
  }
}

export default FileUploadService;
