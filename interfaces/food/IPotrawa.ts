import ITag from "./ITag";

interface IPotrawa {
  nazwa: String;
  zdjecie?: String;
  uwagi?: String;
  link?: String;
  tagi?: ITag[];
}

export default IPotrawa;
