interface CommentsProps {
  user_id: string;
  message: string;
};

interface SalesProps {
  date: string;
  quantity: number;
};

interface FileProps {
  type: 'image' | 'video';
  file: string;
  width: number;
  height: number;
};

interface CreateProductsProps {
  id: string;
  user_id: string;
  title: string;
  description: string;
  material: Array<string>;
  price: number;
  gender: Array<string>;
  color: Array<string>;
  category: Array<string>;
  card: Array<string>;
  file_banner: string;
  files: Array<FileProps>;
  comments?: Array<CommentsProps>;
  sales?: Array<SalesProps>;
  create_at: string;
};

interface FileProps {
  files: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    key: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
  }[];

  file_banner: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    key: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
  }[];
};

interface CloudProps {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: 'image' | 'video';
  created_at: string;
  tags: any[],
  pages: 0,
  bytes: number;
  type: "upload";
  etag: string;
  placeholder: false,
  url: string;
  secure_url: string;
  playback_url: string;
  folder: string;
  access_mode: 'public' | 'private',
  audio: {
    codec: string;
    frequency: number;
    channels: number;
    channel_layout: string;
  },
  video: {
    pix_format: string;
    codec: string;
    level: number;
    profile: string;
    dar: string;
    time_base: string;
  },
  is_audio: boolean;
  frame_rate: number;
  bit_rate: number;
  duration: number;
  rotation: number;
  original_filename: string;
  api_key: string;
}

export {
  CreateProductsProps,
  FileProps,
  CloudProps
};
