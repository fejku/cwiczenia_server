import express from 'express';
import Controller from "../interfaces/controller.interface";
import Waga from "../interfaces/waga.interface";
import WagaModel from "../models/waga.model";

class WagaController implements Controller {
  public path = '/waga';
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

  private getAllWagi = (request: express.Request, response: express.Response) => {
    WagaModel.find()
      .then((wagi) => {
        response.send(wagi);
      });
  }  

  private getWagaById = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    WagaModel.findById(id)
      .then((waga) => {
        response.send(waga);
      });
  }

  private modifyWaga = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    const wagaData: Waga = request.body;
    WagaModel.findByIdAndUpdate(id, wagaData, { new: true })
      .then((waga) => {
        response.send(waga);
      });
  }
 
  private createWaga = (request: express.Request, response: express.Response) => {
    const wagaData: Waga = request.body;
    const createdWaga = new WagaModel(wagaData);
    createdWaga.save()
      .then((savedWaga) => {
        response.send(savedWaga);
      });
  }
 
  private deleteWaga = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    WagaModel.findByIdAndDelete(id)
      .then((successResponse) => {
        if (successResponse) {
          response.sendStatus(200);
        } else {
          response.sendStatus(404);
        }
      });
  }  
}

export default WagaController;