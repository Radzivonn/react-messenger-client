class BaseAPI {
  protected readonly BASE_API_URL: string;

  constructor() {
    this.BASE_API_URL = 'http://localhost:5000'; // * This address is only for the duration of development
  }
}

const baseAPI = new BaseAPI();

export { baseAPI, BaseAPI };
