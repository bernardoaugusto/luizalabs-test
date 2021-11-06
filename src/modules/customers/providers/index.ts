import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvidert';
import IHashProvider from './HashProvider/models/IHashProvider';
import { container } from 'tsyringe';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
