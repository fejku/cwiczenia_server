import express from "express";
import moment from "moment";
import Controller from "../interfaces/controller.interface";
import Waga from "../interfaces/IWaga";
import WagaModel from "../models/WagaModel";

class WagaController implements Controller {
  public path = "/waga";

  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllWagi);
    this.router.get(`${this.path}/:id`, this.getWagaById);
    this.router.patch(`${this.path}/:id`, this.modifyWaga);
    this.router.delete(`${this.path}/:id`, this.deleteWaga);
    this.router.post(this.path, this.createWaga);
  }

  private getAllWagi = async (request: express.Request, response: express.Response) => {
    try {
      const wagi = await WagaModel.find();
      response.send(wagi);
    } catch (error) {
      console.log(error);
    }
  };

  private getWagaById = (request: express.Request, response: express.Response) => {
    const { id } = request.params;
    WagaModel.findById(id).then((waga) => {
      response.send(waga);
    });
  };

  private modifyWaga = (request: express.Request, response: express.Response) => {
    const { id } = request.params;
    const zmodyfikowanaWaga: Waga = request.body;
    WagaModel.findByIdAndUpdate(id, zmodyfikowanaWaga, { new: true }).then((waga) => {
      response.send(waga);
    });
  };

  private createWaga = async (request: express.Request, response: express.Response) => {
    const wagaData: Waga = request.body;

    const createdWaga = new WagaModel(wagaData);
    try {
      const savedWaga = await createdWaga.save();
      response.send(savedWaga);
    } catch (error) {
      console.log(error);
    }
  };

  private deleteWaga = async (request: express.Request, response: express.Response) => {
    const { id } = request.params;
    try {
      const successResponse = await WagaModel.findByIdAndDelete(id);

      if (successResponse) {
        response.sendStatus(200);
      } else {
        response.sendStatus(500);
      }
    } catch (error) {
      response.sendStatus(500);
    }
  };
}

export default WagaController;
