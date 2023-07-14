import { AuthRepository } from "./auth.repository";

export class AuthPresenter {
  constructor(private authRepository: AuthRepository) {}

  async getUser() {
    return await this.authRepository.getUser();
  }
}
