export interface SeverFileRenameFiles {
    from: string;
    to: string;
}
export interface SeverFileRename {
    root: string;
    files: SeverFileRenameFiles[];
}
export interface ServerFileCompress {
    root: string;
    files: string[];
}
export interface ServerFileDelete extends ServerFileCompress {
}
export interface ServerFileDecompress {
    root: string;
    file: string;
}
export interface ServerFileCreateFolder {
    root: string;
    name: string;
}
export interface ServerFileAttributes {
    name: string;
    mode: string;
    mode_bits: string;
    size: number;
    is_file: boolean;
    is_symlink: boolean;
    mimetype: string;
    created_at: string;
    modified_at: string;
}
export default interface ServerFile {
    object: string;
    atributes: ServerFileAttributes;
}
