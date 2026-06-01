import { join } from "path";
import { Glob } from "bun";
import { Zip, ZipPassThrough } from "fflate";
import { IArchiveRepository } from "../../domain/repositories/i_archive_repository";
import { Failure, Result, Success } from "../../core/utils/result";
import { NotExistsFilesInDirError } from "../../core/exceptions/not_exists_files_in_dir_error";

export class FFlateArchiveRepositoryImpl implements IArchiveRepository {
  async archiveDirectory(dirPath: string): Promise<Result<ReadableStream>> {
    try {
      const glob = new Glob("**/*");
      const fileEntries: string[] = [];

      for await (const file of glob.scan({ cwd: dirPath })) {
        fileEntries.push(file);
      }

      if (fileEntries.length === 0) {
        return new Failure(new NotExistsFilesInDirError());
      }

      const { readable, writable } = new TransformStream();
      const writer = writable.getWriter();

      const zip = new Zip((err, data, final) => {
        if (err) {
          writer.abort(err);
          return;
        }
        writer.write(data);
        if (final) {
          writer.close();
        }
      });

      (async () => {
        try {
          for (const file of fileEntries) {
            const entryPath = join(dirPath, file);
            const fileContent = Bun.file(entryPath);
            const isDir = await fileContent.exists().then((exists) => !exists);

            if (isDir) {
              const zipCell = new ZipPassThrough(file.endsWith("/") ? file : `${file}/`);
              zip.add(zipCell);
              zipCell.push(new Uint8Array(0), true);
            } else {
              const zipCell = new ZipPassThrough(file);
              zip.add(zipCell);

              const stream = fileContent.stream();
              const reader = stream.getReader();

              let lastChunk: Uint8Array | null = null;

              while (true) {
                const { done, value } = await reader.read();
                if (done) {
                  if (lastChunk) {
                    zipCell.push(lastChunk, true);
                  } else {
                    zipCell.push(new Uint8Array(0), true);
                  }
                  break;
                }
                if (lastChunk) {
                  zipCell.push(lastChunk);
                }
                lastChunk = value;
              }
            }
          }
          zip.end();
        } catch (err) {
          writer.abort(err);
        }
      })();

      return new Success(readable);
    } catch (e: any) {
      return new Failure(e);
    }
  }
}
