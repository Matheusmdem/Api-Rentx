import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImageUseCase } from "./UploadCarImageUseCase";


interface IFiles {
  filename: string;
}

class UploadCarImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const image = request.files as IFiles[];

    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);
  
    const image_name = image.map((file) => file.filename);

    await uploadCarImageUseCase.execute({
      car_id: id,
      image_name
    });
  
    return response.status(201).send()
  };
};

export { UploadCarImageController }