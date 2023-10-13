class ReliefMission {
  title: string;
  description: string;
  image: string;
  neededItems: string[] = [];
  id: number = 0;

  constructor(
    title: string,
    description: string,
    image: string,
    neededItems: string[] = [],
    id: number = 0
  ) {
    this.title = title;
    this.description = description;
    this.image = image;
    this.neededItems = neededItems;
    this.id = id;
  }
}

export default ReliefMission;
