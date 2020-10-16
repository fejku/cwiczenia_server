import express from "express";
import Controller from "../../interfaces/controller.interface";
import IPotrawa from "../../interfaces/food/IPotrawa";
import PotrawaModel from "../../models/food/PotrawaModel";
import TagModel from "../../models/food/TagModel";

class PotrawyController implements Controller {
  public path = "/food/potrawy";

  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllPotrawy);
    this.router.get(`${this.path}/:id`, this.getPotrawaById);
    // this.router.patch(`${this.path}/:id`, this.modifyWaga);
    this.router.delete(`${this.path}/:id`, this.deletePotrawa);
    this.router.post(this.path, this.createPotrawa);
  }

  private getAllPotrawy = async (request: express.Request, response: express.Response) => {
    try {
      const potrawy = await PotrawaModel.find().populate({ path: "tagi", Model: TagModel });
      response.send(potrawy);
    } catch (error) {
      console.log(error);
    }
  };

  private getPotrawaById = (request: express.Request, response: express.Response) => {
    const { id } = request.params;
    PotrawaModel.findById(id).then((potrawa) => {
      response.send(potrawa);
    });
  };

  // private modifyWaga = (request: express.Request, response: express.Response) => {
  //   const { id } = request.params;
  //   const wagaData: Waga = request.body;
  //   WagaModel.findByIdAndUpdate(id, wagaData, { new: true }).then((waga) => {
  //     response.send(waga);
  //   });
  // };

  private createPotrawa = async (request: express.Request, response: express.Response) => {
    const potrawaData: IPotrawa = request.body;

    const createdPotrawa = new PotrawaModel(potrawaData);
    try {
      await createdPotrawa.save();
    } catch (error) {
      console.log(error);
    }

    const potrawy = await PotrawaModel.find().populate({ path: "tagi", Model: TagModel });
    response.send(potrawy);
  };

  private deletePotrawa = async (request: express.Request, response: express.Response) => {
    const { id } = request.params;
    try {
      await PotrawaModel.findByIdAndDelete(id);

      const potrawy = await PotrawaModel.find().populate({ path: "tagi", Model: TagModel });
      response.send(potrawy);
    } catch (error) {
      response.sendStatus(404);
    }
  };
}

export default PotrawyController;
