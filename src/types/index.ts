export interface Phone {
  id: string;
  name: string;
  fullName: string;
  colors: {
    name: string;
    value: string;
    hex: string;
    imagePath: string;
  }[];
  description: string;
  price: number;
  specs: PhoneSpecs;
  bestseller?: boolean;
}

export interface PhoneColor {
  name: string;
  value: string;
  hex: string;
}

export interface PhoneSpecs {
  display: string;
  processor: string;
  camera: string;
  battery: string;
  storage: string[];
}