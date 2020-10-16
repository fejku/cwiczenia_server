import express from "express";
import Controller from "../../interfaces/controller.interface";
import ITag from "../../interfaces/food/ITag";
import TagModel from "../../models/food/TagModel";

class TagiController implements Controller {
  public path = "/food/tagi";

  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllTagi);
    this.router.get(`${this.path}/:id`, this.getTagById);
    this.router.delete(`${this.path}/:id`, this.deleteTag);
    this.router.post(this.path, this.createTag);
  }

  private getAllTagi = async (request: express.Request, response: express.Response) => {
    try {
      const tagi = await TagModel.find();
      response.send(tagi);
    } catch (error) {
      console.log(error);
    }
  };

  private getTagById = (request: express.Request, response: express.Response) => {
    const { id } = request.params;
    TagModel.findById(id).then((tag) => {
      response.send(tag);
    });
  };

  private createTag = async (request: express.Request, response: express.Response) => {
    const tagData: ITag = request.body;

    const createdTag = new TagModel(tagData);
    try {
      await createdTag.save();
    } catch (error) {
      console.log(error);
    }

    const tagi = await TagModel.find();
    response.send(tagi);
  };

  private deleteTag = async (request: express.Request, response: express.Response) => {
    const { id } = request.params;
    try {
      await TagModel.findByIdAndDelete(id);

      const tagi = await TagModel.find();
      response.send(tagi);
    } catch (error) {
      response.sendStatus(404);
    }
  };
}

export default TagiController;
