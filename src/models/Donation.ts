interface Dimensions {
  length: string;
  width: string;
  height: string;
}

interface Donation {
  title: string;
  quantity: number | '';
  id: number;
  dimensions: Dimensions;
  imageSrc: string | null;
}
