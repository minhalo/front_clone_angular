export interface badge {
  badges: number;
}

export interface badged {
  badge: badge;
}

export interface cart {
  ProductId: number;
  CartId: number;
  name: string;
  total: number;
  createdAt: Date;
}

export interface mes {
  mes: string;
  name: string;
  createdAt: string;
  GenderId: number;
  RoleId: number;
}
