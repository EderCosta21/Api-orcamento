import { IApp } from './../@types/IApp';
import AppRepository, { IAppRepository } from '../repositories/AppRepository';
import { AppError } from '../errors';

interface Request {
    id: string,
}

class ShowAppService {
    private appRepository: IAppRepository;

    constructor()
    {
        this.appRepository = new AppRepository();
    }

    public async execute  ({id}:Request): Promise<IApp>
    {
        try {
            const app = await this.appRepository.buscaById(id);

            if(!app)
            {
                throw new AppError('Não existe resultado com esse ID', 404)
            }
            return app; 
        } catch ( err)
        {
            throw new AppError(err.message,err.statusCode)
        }
    }

   

}

export default ShowAppService;