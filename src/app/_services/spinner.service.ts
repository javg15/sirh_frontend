
export class SpinnerService {

  public showSpinner: boolean = false;

  constructor() { }

  showLoadingSpinner() {
      this.showSpinner = true;
  }

  hideLoadingSpinner() {
      this.showSpinner = false;
  }
}
