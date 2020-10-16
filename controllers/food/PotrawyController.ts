import express from "express";
import Controller from "../../interfaces/controller.interface";
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
    // this.router.get(`${this.path}/:id`, this.getWagaById);
    // this.router.patch(`${this.path}/:id`, this.modifyWaga);
    // this.router.delete(`${this.path}/:id`, this.deleteWaga);
    // this.router.post(this.path, this.createWaga);
  }

  private getAllPotrawy = async (request: express.Request, response: express.Response) => {
    try {
      const potrawy = await PotrawaModel.find().populate({ path: "tagi", Model: TagModel });
      console.log(potrawy);

      response.send(potrawy);
    } catch (error) {
      console.log(error);
    }
  };

  // private getWagaById = (request: express.Request, response: express.Response) => {
  //   const { id } = request.params;
  //   WagaModel.findById(id).then((waga) => {
  //     response.send(waga);
  //   });
  // };

  // private modifyWaga = (request: express.Request, response: express.Response) => {
  //   const { id } = request.params;
  //   const wagaData: Waga = request.body;
  //   WagaModel.findByIdAndUpdate(id, wagaData, { new: true }).then((waga) => {
  //     response.send(waga);
  //   });
  // };

  // private createWaga = async (request: express.Request, response: express.Response) => {
  //   const wagaData: Waga = request.body;

  //   let czyAktualizacja = false;
  //   if (wagaData.wagaRano || wagaData.wagaWieczor) {
  //     const foundWaga = await WagaModel.findOne({
  //       data: {
  //         $gte: moment(wagaData.data).startOf("day").toDate(),
  //         $lte: moment(wagaData.data).endOf("day").toDate(),
  //       },
  //     });

  //     if (foundWaga) {
  //       if (wagaData.wagaRano) {
  //         foundWaga.wagaRano = wagaData.wagaRano;
  //       }
  //       if (wagaData.wagaWieczor) {
  //         foundWaga.wagaWieczor = wagaData.wagaWieczor;
  //       }
  //       await foundWaga.save();
  //       czyAktualizacja = true;
  //     }
  //   }

  //   if (!czyAktualizacja) {
  //     const createdWaga = new WagaModel(wagaData);
  //     try {
  //       await createdWaga.save();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   const wagi = await WagaModel.find();
  //   response.send(wagi);
  // };

  // private deleteWaga = async (request: express.Request, response: express.Response) => {
  //   const { id } = request.params;
  //   try {
  //     await WagaModel.findByIdAndDelete(id);

  //     const wagi = await WagaModel.find();
  //     response.send(wagi);
  //   } catch (error) {
  //     response.sendStatus(404);
  //   }
  // };
}

export default PotrawyController;
