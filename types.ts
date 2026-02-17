
export interface FireworkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  decay: number;
  size: number;
}

export interface WishResponse {
  text: string;
  category: string;
}

export enum WishCategory {
  GENERAL = 'Chung',
  BUSINESS = 'Kinh doanh',
  FAMILY = 'Gia đình',
  STUDY = 'Học tập'
}
