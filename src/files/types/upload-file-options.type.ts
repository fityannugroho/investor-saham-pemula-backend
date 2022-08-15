export type UploadFileOptions = {
  /**
   * The destination path to upload the file to.
   */
  destination?: string;

  /**
   * A function to rename the file.
   * @param oldName The old name of the file.
   * @returns The new name of the file.
   */
  rename?: (oldName: string) => string;

  /**
   * The allowed mimetypes.
   */
  allowedMimetypes?: string[];
};
