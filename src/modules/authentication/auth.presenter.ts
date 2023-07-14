import { AuthRepository } from "./auth.repository";

export class AuthPresenter {
  constructor(private authRepository: AuthRepository) {}

  async getUser() {
    return await this.authRepository.getUser();
  }

  async isLoggedIn() {
    const user = await this.authRepository.getUser();
    return !!user && !user.expired;
  }
}
