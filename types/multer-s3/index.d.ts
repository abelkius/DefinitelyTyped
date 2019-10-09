// Type definitions for multer-s3 2.7
// Project: https://github.com/badunk/multer-s3
// Definitions by: KIM Jaesuck a.k.a. gim tcaesvk <https://github.com/tcaesvk>
//                 Gal Talmor <https://github.com/galtalmor>
//                 Matt Terski <https://github.com/terski>
//                 Agata Belkius <https://github.com/abelkius>
// Definitions: https://github.com/DefinitelyType/DefinitelyTyped
// TypeScript Version: 2.3

import * as AWS from "aws-sdk";
import { IncomingMessage } from 'http';
import { StorageEngine } from "multer";

type MulterRequest = Express.Request | IncomingMessage;
type MulterFile = Express.Multer.File | File;

interface Options {
    s3: AWS.S3;
    bucket: ((req: MulterRequest, file: MulterFile, callback: (error: any, bucket?: string) => void) => void) | string;
    key?(req: MulterRequest, file: MulterFile, callback: (error: any, key?: string) => void): void;
    acl?: ((req: MulterRequest, file: MulterFile, callback: (error: any, acl?: string) => void) => void) | string;
    contentType?(req: MulterRequest, file: MulterFile, callback: (error: any, mime?: string, stream?: NodeJS.ReadableStream) => void): void;
    metadata?(req: MulterRequest, file: MulterFile, callback: (error: any, metadata?: any) => void): void;
    cacheControl?: ((req: MulterRequest, file: MulterFile, callback: (error: any, cacheControl?: string) => void) => void) | string;
    serverSideEncryption?: ((req: MulterRequest, file: MulterFile, callback: (error: any, serverSideEncryption?: string) => void) => void) | string;
}

declare global {
    namespace Express {
        namespace MulterS3 {
            interface File extends Multer.File {
                bucket: string;
                key: string;
                acl: string;
                contentType: string;
                contentDisposition: null;
                storageClass: string;
                serverSideEncryption: null;
                metadata: any;
                location: string;
                etag: string;
            }
        }
    }
}

interface S3Storage {
    (options?: Options): StorageEngine;

    AUTO_CONTENT_TYPE(
        req: MulterRequest,
        file: MulterFile,
        callback: (error: any, mime?: string, stream?: NodeJS.ReadableStream) => void): void;
    DEFAULT_CONTENT_TYPE(
        req: MulterRequest,
        file: MulterFile,
        callback: (error: any, mime?: string) => void): void;
}

declare const s3Storage: S3Storage;
export = s3Storage;
