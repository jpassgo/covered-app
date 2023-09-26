class ReliefMission {
  title: string;
  description: string;
  image: string;
  neededItems: string[] = []; 

  constructor(title: string, description: string, image: string, neededItems: string[] = []) {
    this.title = title;
    this.description = description;
    this.image = image;
    this.neededItems = neededItems;
  }

}

export default ReliefMission;
